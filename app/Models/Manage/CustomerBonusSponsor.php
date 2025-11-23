<?php

namespace App\Models\Manage;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $member_id
 * @property int $from_member_id
 * @property float $amount
 * @property float|null $index_value
 * @property string|null $type
 * @property int $status
 * @property \Illuminate\Support\Carbon|null $approved_at
 * @property string|null $notes
 * @property string|null $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read Customer $member
 * @property-read Customer $fromMember
 */
class CustomerBonusSponsor extends Model
{
    use HasFactory;

    protected $table = 'customer_bonus_sponsors';

    protected $fillable = [
        'member_id',
        'from_member_id',
        'amount',
        'index_value',
        'status',
        'description',
    ];

    protected function casts(): array
    {
        return [
            'amount' => 'float',
            'index_value' => 'float',
            'status' => 'integer',
        ];
    }

    /**
     * Relasi ke sponsor (penerima bonus)
     */
    public function member(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'member_id');
    }

    /**
     * Relasi ke member yang direkrut (downline)
     */
    public function fromMember(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'from_member_id');
    }

    /**
     * Buat bonus sponsor ketika ada member baru atau transaksi dari downline
     */
    public static function createSponsorBonus(int $sponsorId, int $fromMemberId, float $amount, ?string $description = null): self
    {
        return self::create([
            'member_id' => $sponsorId,
            'from_member_id' => $fromMemberId,
            'amount' => $amount,
            'index_value' => $amount,
            'status' => 0,
            'description' => $description ?? 'Bonus sponsor',
        ]);
    }

    /**
     * Distribusi bonus sponsor dari transaksi member baru
     */
    public static function distributeSponsorBonusFromRegistration(int $newMemberId, float $registrationAmount, float $sponsorPercentage = 10): ?self
    {
        $newMember = Customer::find($newMemberId);
        if (! $newMember || ! $newMember->matrixPosition) {
            return null;
        }

        $sponsor = $newMember->getSponsor();
        if (! $sponsor) {
            return null;
        }

        $bonusAmount = ($registrationAmount * $sponsorPercentage) / 100;

        return self::createSponsorBonus(
            $sponsor->id,
            $newMemberId,
            $bonusAmount,
            "Bonus sponsor dari registrasi {$newMember->name}"
        );
    }

    /**
     * Distribusi bonus sponsor dari transaksi/pembelian downline
     */
    public static function distributeSponsorBonusFromTransaction(int $buyerId, float $transactionAmount, float $sponsorPercentage = 5): ?self
    {
        $buyer = Customer::find($buyerId);
        if (! $buyer || ! $buyer->matrixPosition) {
            return null;
        }

        $sponsor = $buyer->getSponsor();
        if (! $sponsor) {
            return null;
        }

        $bonusAmount = ($transactionAmount * $sponsorPercentage) / 100;

        return self::createSponsorBonus(
            $sponsor->id,
            $buyerId,
            $bonusAmount,
            "Bonus sponsor dari transaksi {$buyer->name}"
        );
    }

    /**
     * Release bonus ke ewallet
     */
    public function release(): bool
    {
        if ($this->status === 1) {
            throw new \Exception('Bonus sponsor sudah dirilis sebelumnya');
        }

        $member = $this->member;
        if (! $member) {
            throw new \Exception('Member tidak ditemukan');
        }

        $member->addBalance($this->amount, "Bonus Sponsor: {$this->description}");

        $this->status = 1;

        return $this->save();
    }

    /**
     * Release semua bonus sponsor pending untuk member tertentu
     */
    public static function releasePendingForMember(int $memberId): array
    {
        $results = [
            'success' => 0,
            'total_amount' => 0,
            'errors' => [],
        ];

        $bonuses = self::where('member_id', $memberId)->where('status', 0)->get();

        foreach ($bonuses as $bonus) {
            try {
                $bonus->release();
                $results['success']++;
                $results['total_amount'] += $bonus->amount;
            } catch (\Exception $e) {
                $results['errors'][] = [
                    'bonus_id' => $bonus->id,
                    'error' => $e->getMessage(),
                ];
            }
        }

        return $results;
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
