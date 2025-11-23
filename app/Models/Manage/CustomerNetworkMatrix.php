<?php

namespace App\Models\Manage;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $member_id
 * @property int|null $sponsor_id
 * @property int $level
 * @property string|null $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read Customer $member
 * @property-read Customer|null $sponsor
 */
class CustomerNetworkMatrix extends Model
{
    use HasFactory;

    protected $table = 'customer_network_matrixes';

    protected $fillable = [
        'member_id',
        'sponsor_id',
        'level',
        'description',
    ];

    protected function casts(): array
    {
        return [
            'level' => 'integer',
        ];
    }

    /**
     * Relasi ke member
     */
    public function member(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'member_id');
    }

    /**
     * Relasi ke sponsor
     */
    public function sponsor(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'sponsor_id');
    }

    /**
     * Tambahkan member baru ke matrix dengan sponsor tertentu
     */
    public static function addToMatrix(int $memberId, ?int $sponsorId = null): self
    {
        $level = 1;

        if ($sponsorId) {
            $sponsorMatrix = self::where('member_id', $sponsorId)->first();
            $level = $sponsorMatrix ? $sponsorMatrix->level + 1 : 1;
        }

        return self::create([
            'member_id' => $memberId,
            'sponsor_id' => $sponsorId,
            'level' => $level,
        ]);
    }

    /**
     * Dapatkan semua upline sponsor sampai level tertentu
     */
    public function getUplineSponsors(?int $maxLevel = null): array
    {
        $uplines = [];
        $current = $this->sponsor?->matrixPosition;
        $currentLevel = 1;

        while ($current && ($maxLevel === null || $currentLevel <= $maxLevel)) {
            $uplines[] = [
                'member' => $current->member,
                'level' => $currentLevel,
            ];

            $current = $current->sponsor?->matrixPosition;
            $currentLevel++;
        }

        return $uplines;
    }

    /**
     * Hitung total downline di matrix
     */
    public function countTotalDownlines(?int $maxLevel = null): int
    {
        $count = 0;
        $this->countDownlinesRecursive($this->member, $count, 1, $maxLevel);

        return $count;
    }

    /**
     * Helper untuk hitung downline secara rekursif
     */
    private function countDownlinesRecursive(?Customer $member, int &$count, int $currentLevel, ?int $maxLevel): void
    {
        if (! $member || ($maxLevel !== null && $currentLevel > $maxLevel)) {
            return;
        }

        foreach ($member->matrixDownlines as $downline) {
            if ($downline->member) {
                $count++;
                $this->countDownlinesRecursive($downline->member, $count, $currentLevel + 1, $maxLevel);
            }
        }
    }
}
