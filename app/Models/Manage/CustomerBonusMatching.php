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
 * @property int $level
 * @property int $status
 * @property \Illuminate\Support\Carbon|null $approved_at
 * @property string|null $notes
 * @property string|null $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read Customer $member
 * @property-read Customer $fromMember
 */
class CustomerBonusMatching extends Model
{
    use HasFactory;

    protected $table = 'customer_bonus_matchings';

    protected $fillable = [
        'member_id',
        'from_member_id',
        'level',
        'amount',
        'index_value',
        'status',
        'description',
    ];

    protected function casts(): array
    {
        return [
            'level' => 'integer',
            'amount' => 'float',
            'index_value' => 'float',
            'status' => 'integer',
        ];
    }

    /**
     * Relasi ke member penerima bonus
     */
    public function member(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'member_id');
    }

    /**
     * Relasi ke member sumber omset
     */
    public function fromMember(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'from_member_id');
    }

    /**
     * Distribusi bonus matching ke upline berdasarkan level
     */
    public static function distributeMatchingBonus(int $fromMemberId, float $amount, int $maxLevel = 5, array $levelPercentages = []): array
    {
        $results = [];
        $fromMember = Customer::find($fromMemberId);

        if (! $fromMember || ! $fromMember->matrixPosition) {
            return $results;
        }

        // Default persentase per level jika tidak disediakan
        if (empty($levelPercentages)) {
            $levelPercentages = [
                1 => 10, // 10% untuk level 1
                2 => 5,  // 5% untuk level 2
                3 => 3,  // 3% untuk level 3
                4 => 2,  // 2% untuk level 4
                5 => 1,  // 1% untuk level 5
            ];
        }

        $uplines = $fromMember->matrixPosition->getUplineSponsors($maxLevel);

        foreach ($uplines as $uplineData) {
            $level = $uplineData['level'];
            $percentage = $levelPercentages[$level] ?? 0;

            if ($percentage > 0) {
                $bonusAmount = ($amount * $percentage) / 100;

                $bonus = self::create([
                    'member_id' => $uplineData['member']->id,
                    'from_member_id' => $fromMemberId,
                    'level' => $level,
                    'amount' => $bonusAmount,
                    'index_value' => $amount,
                    'status' => 0,
                    'description' => "Bonus matching level {$level} dari {$fromMember->name}",
                ]);

                $results[] = $bonus;
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
            throw new \Exception('Bonus matching sudah dirilis sebelumnya');
        }

        $member = $this->member;
        if (! $member) {
            throw new \Exception('Member tidak ditemukan');
        }

        $member->addBalance($this->amount, "Bonus Matching: {$this->description}");

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
