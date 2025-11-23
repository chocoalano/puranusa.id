<?php

namespace App\Models\Manage;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $member_id
 * @property int $pair
 * @property float $amount
 * @property float|null $index_value
 * @property int $status
 * @property string|null $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read Customer $member
 */
class CustomerBonusPairing extends Model
{
    use HasFactory;

    protected $table = 'customer_bonus_pairings';

    protected $fillable = [
        'member_id',
        'pair',
        'amount',
        'index_value',
        'status',
        'description',
    ];

    protected function casts(): array
    {
        return [
            'pair' => 'integer',
            'amount' => 'float',
            'index_value' => 'float',
            'status' => 'integer',
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
     * Hitung jumlah pair yang terbentuk dari binary tree
     */
    public static function calculatePairs(int $memberId): int
    {
        $member = Customer::find($memberId);
        if (! $member) {
            return 0;
        }

        $leftCount = $member->countLeftNetwork();
        $rightCount = $member->countRightNetwork();

        // Pair adalah minimum dari kiri dan kanan
        return min($leftCount, $rightCount);
    }

    /**
     * Buat bonus pairing berdasarkan jumlah pair
     */
    public static function createPairingBonus(int $memberId, float $bonusPerPair = 100000, ?int $maxPairs = null): ?self
    {
        $pairs = self::calculatePairs($memberId);

        if ($pairs <= 0) {
            return null;
        }

        // Batasi jumlah pair jika ada max
        if ($maxPairs !== null && $pairs > $maxPairs) {
            $pairs = $maxPairs;
        }

        $amount = $pairs * $bonusPerPair;

        return self::create([
            'member_id' => $memberId,
            'pair' => $pairs,
            'amount' => $amount,
            'index_value' => $amount,
            'status' => 0,
            'description' => "Bonus pairing untuk {$pairs} pasangan",
        ]);
    }

    /**
     * Flush bonus pairing (proses rutin untuk hitung bonus per periode)
     */
    public static function flushPairingBonus(array $memberIds = [], float $bonusPerPair = 100000, ?int $maxPairs = null): array
    {
        $results = [
            'processed' => 0,
            'total_pairs' => 0,
            'total_amount' => 0,
            'bonuses' => [],
        ];

        // Jika tidak ada member IDs, proses semua member aktif
        if (empty($memberIds)) {
            $memberIds = Customer::whereHas('networkPosition', function ($query) {
                $query->where('status', true);
            })->pluck('id')->toArray();
        }

        foreach ($memberIds as $memberId) {
            $bonus = self::createPairingBonus($memberId, $bonusPerPair, $maxPairs);

            if ($bonus) {
                $results['processed']++;
                $results['total_pairs'] += $bonus->pair;
                $results['total_amount'] += $bonus->amount;
                $results['bonuses'][] = $bonus;
            }
        }

        return $results;
    }

    /**
     * Release bonus ke ewallet
     */
    public function release(): bool
    {
        if ($this->status === 1) {
            throw new \Exception('Bonus pairing sudah dirilis sebelumnya');
        }

        $member = $this->member;
        if (! $member) {
            throw new \Exception('Member tidak ditemukan');
        }

        $member->addBalance($this->amount, "Bonus Pairing: {$this->description}");

        $this->status = 1;

        return $this->save();
    }

    /**
     * Scope untuk bonus yang belum dirilis
     */
    public function scopePending($query)
    {
        return $query->where('status', 0);
    }

    /**
     * Scope untuk bonus yang sudah dirilis
     */
    public function scopeReleased($query)
    {
        return $query->where('status', 1);
    }
}
