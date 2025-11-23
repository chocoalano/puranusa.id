<?php

namespace App\Models;

use App\Models\Manage\Customer;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $customer_id
 * @property string $label
 * @property bool $is_default
 * @property string $recipient_name
 * @property string $recipient_phone
 * @property string $address_line1
 * @property string|null $address_line2
 * @property string $province_label
 * @property int $province_id
 * @property string $city_label
 * @property int $city_id
 * @property string $postal_code
 * @property string $country
 * @property string|null $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read Customer $customer
 */
class CustomerAddress extends Model
{
    use HasFactory;

    protected $table = 'customer_addresses';

    protected $fillable = [
        'customer_id',
        'label',
        'is_default',
        'recipient_name',
        'recipient_phone',
        'address_line1',
        'address_line2',
        'province_label',
        'province_id',
        'city_label',
        'city_id',
        'postal_code',
        'country',
        'description',
    ];

    protected function casts(): array
    {
        return [
            'is_default' => 'boolean',
            'province_id' => 'integer',
            'city_id' => 'integer',
        ];
    }

    /**
     * Relasi ke customer
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'customer_id');
    }

    /**
     * Set alamat ini sebagai default dan unset yang lain
     */
    public function setAsDefault(): bool
    {
        // Unset semua alamat default untuk customer ini
        self::where('customer_id', $this->customer_id)
            ->where('id', '!=', $this->id)
            ->update(['is_default' => false]);

        // Set alamat ini sebagai default
        $this->is_default = true;

        return $this->save();
    }

    /**
     * Format alamat lengkap
     */
    public function getFullAddress(): string
    {
        $parts = array_filter([
            $this->address_line1,
            $this->address_line2,
            $this->city_label,
            $this->province_label,
            $this->postal_code,
            $this->country,
        ]);

        return implode(', ', $parts);
    }

    /**
     * Format untuk label pengiriman
     */
    public function getShippingLabel(): string
    {
        $label = $this->label ? "({$this->label}) " : '';

        return $label.$this->recipient_name.' - '.$this->recipient_phone;
    }
}
