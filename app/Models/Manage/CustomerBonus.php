<?php

namespace App\Models\Manage;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $member_id
 * @property float $amount
 * @property float|null $index_value
 * @property float $tax_netto
 * @property int|null $tax_percent
 * @property float|null $tax_amount
 * @property float|null $tax_value
 * @property int $status
 * @property \Illuminate\Support\Carbon|null $approved_at
 * @property string|null $notes
 * @property string|null $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read Customer $member
 */
class CustomerBonus extends Model
{
    use HasFactory;

    protected $table = 'customer_bonuses';

    protected $fillable = [
        'member_id',
        'amount',
        'index_value',
        'tax_netto',
        'tax_percent',
        'tax_value',
        'status',
        'description',
        'date',
    ];

    protected function casts(): array
    {
        return [
            'amount' => 'float',
            'index_value' => 'float',
            'tax_netto' => 'float',
            'tax_percent' => 'integer',
            'tax_value' => 'float',
            'status' => 'integer',
            'date' => 'date',
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
     * Buat bonus baru dengan kalkulasi pajak otomatis
     */
    public static function createBonus(int $memberId, float $amount, float $indexValue = 0, int $taxPercent = 10, ?string $description = null): self
    {
        $taxValue = ($amount * $taxPercent) / 100;
        $taxNetto = $amount - $taxValue;

        return self::create([
            'member_id' => $memberId,
            'amount' => $amount,
            'index_value' => $indexValue,
            'tax_percent' => $taxPercent,
            'tax_value' => $taxValue,
            'tax_netto' => $taxNetto,
            'status' => 0,
            'description' => $description,
        ]);
    }

    /**
     * Release/bayarkan bonus ke ewallet member
     */
    public function release(): bool
    {
        if ($this->status === 1) {
            throw new \Exception('Bonus sudah dirilis sebelumnya');
        }

        $member = $this->member;
        if (! $member) {
            throw new \Exception('Member tidak ditemukan');
        }

        // Tambahkan ke ewallet
        $member->addBalance($this->tax_netto, "Bonus: {$this->description}");

        // Update status
        $this->status = 1;

        return $this->save();
    }

    /**
     * Release multiple bonuses sekaligus
     */
    public static function releaseBulk(array $bonusIds): array
    {
        $results = [
            'success' => 0,
            'failed' => 0,
            'errors' => [],
        ];

        $bonuses = self::whereIn('id', $bonusIds)->where('status', 0)->get();

        foreach ($bonuses as $bonus) {
            try {
                $bonus->release();
                $results['success']++;
            } catch (\Exception $e) {
                $results['failed']++;
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
