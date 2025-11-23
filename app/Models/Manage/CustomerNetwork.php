<?php

namespace App\Models\Manage;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $member_id
 * @property int|null $upline_id
 * @property string|null $position
 * @property bool $status
 * @property int $level
 * @property string|null $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read Customer $member
 * @property-read Customer|null $upline
 */
class CustomerNetwork extends Model
{
    use HasFactory;

    protected $table = 'customer_networks';

    protected $fillable = [
        'member_id',
        'upline_id',
        'position',
        'status',
        'level',
        'description',
    ];

    protected function casts(): array
    {
        return [
            'status' => 'boolean',
            'level' => 'integer',
        ];
    }

    /**
     * Relasi ke member (downline)
     */
    public function member(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'member_id');
    }

    /**
     * Relasi ke upline
     */
    public function upline(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'upline_id');
    }

    /**
     * Temukan posisi kosong terdekat dari upline tertentu (breadth-first search)
     */
    public static function findAvailablePosition(?int $uplineId = null): ?array
    {
        // Jika tidak ada upline, ini adalah root member
        if ($uplineId === null) {
            return null;
        }

        $upline = Customer::find($uplineId);
        if (! $upline) {
            return null;
        }

        // Cek apakah upline punya posisi kiri kosong
        if (! $upline->hasLeftPosition()) {
            return [
                'upline_id' => $uplineId,
                'position' => 'left',
                'level' => ($upline->networkPosition?->level ?? 0) + 1,
            ];
        }

        // Cek apakah upline punya posisi kanan kosong
        if (! $upline->hasRightPosition()) {
            return [
                'upline_id' => $uplineId,
                'position' => 'right',
                'level' => ($upline->networkPosition?->level ?? 0) + 1,
            ];
        }

        // Kedua posisi terisi, cari di level berikutnya (BFS)
        $queue = [$upline->leftDownline->member, $upline->rightDownline->member];
        $visited = [];

        while (! empty($queue)) {
            $current = array_shift($queue);

            if (! $current || in_array($current->id, $visited)) {
                continue;
            }

            $visited[] = $current->id;

            // Cek posisi kiri
            if (! $current->hasLeftPosition()) {
                return [
                    'upline_id' => $current->id,
                    'position' => 'left',
                    'level' => ($current->networkPosition?->level ?? 0) + 1,
                ];
            }

            // Cek posisi kanan
            if (! $current->hasRightPosition()) {
                return [
                    'upline_id' => $current->id,
                    'position' => 'right',
                    'level' => ($current->networkPosition?->level ?? 0) + 1,
                ];
            }

            // Tambahkan anak-anak ke queue
            if ($current->leftDownline?->member) {
                $queue[] = $current->leftDownline->member;
            }
            if ($current->rightDownline?->member) {
                $queue[] = $current->rightDownline->member;
            }
        }

        return null;
    }

    /**
     * Placement otomatis member baru ke jaringan binary tree
     */
    public static function placeNewMember(int $memberId, ?int $uplineId = null, ?string $preferredPosition = null): self
    {
        // Cari posisi yang tersedia
        $placement = self::findAvailablePosition($uplineId);

        if ($placement === null && $uplineId !== null) {
            throw new \Exception('No available position found for upline ID: '.$uplineId);
        }

        // Jika ini root member (tidak ada upline)
        if ($placement === null) {
            return self::create([
                'member_id' => $memberId,
                'upline_id' => null,
                'position' => 'left', // Default position untuk root
                'level' => 1,
                'status' => true,
            ]);
        }

        // Gunakan preferred position jika tersedia
        if ($preferredPosition && in_array($preferredPosition, ['left', 'right'])) {
            $upline = Customer::find($placement['upline_id']);
            $method = $preferredPosition === 'left' ? 'hasLeftPosition' : 'hasRightPosition';

            if (! $upline->$method()) {
                $placement['position'] = $preferredPosition;
            }
        }

        return self::create([
            'member_id' => $memberId,
            'upline_id' => $placement['upline_id'],
            'position' => $placement['position'],
            'level' => $placement['level'],
            'status' => true,
        ]);
    }

    /**
     * Validasi posisi sebelum placement
     */
    public static function validatePlacement(int $uplineId, string $position): bool
    {
        $upline = Customer::find($uplineId);
        if (! $upline) {
            return false;
        }

        $method = $position === 'left' ? 'hasLeftPosition' : 'hasRightPosition';

        return ! $upline->$method();
    }

    /**
     * Hitung total omzet dari jaringan (untuk bonus calculation)
     */
    public function calculateNetworkTurnover(?int $maxLevel = null): float
    {
        // Implementasi sesuai kebutuhan business logic
        // Contoh: sum dari transaksi semua downline
        return 0.0;
    }

    /**
     * Get path dari root ke member ini
     */
    public function getPathFromRoot(): array
    {
        $path = [];
        $current = $this;

        while ($current) {
            array_unshift($path, [
                'member_id' => $current->member_id,
                'position' => $current->position,
                'level' => $current->level,
            ]);

            $current = $current->upline?->networkPosition;
        }

        return $path;
    }
}
