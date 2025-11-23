<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $code
 * @property string $name
 * @property string $type
 * @property string|null $landing_slug
 * @property string|null $description
 * @property string|null $image
 * @property \Illuminate\Support\Carbon $start_at
 * @property \Illuminate\Support\Carbon $end_at
 * @property bool $is_active
 * @property int $priority
 * @property int|null $max_redemption
 * @property int|null $per_user_limit
 * @property array|null $conditions_json
 * @property string|null $show_on
 * @property string|null $custom_html
 * @property string|null $page
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, PromotionProduct> $products
 * @property-read int|null $products_count
 */
class Promotion extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'name',
        'type',
        'landing_slug',
        'description',
        'image',
        'start_at',
        'end_at',
        'is_active',
        'priority',
        'max_redemption',
        'per_user_limit',
        'conditions_json',
        'show_on',
        'custom_html',
        'page',
    ];

    protected function casts(): array
    {
        return [
            'start_at' => 'datetime',
            'end_at' => 'datetime',
            'is_active' => 'boolean',
            'priority' => 'integer',
            'max_redemption' => 'integer',
            'per_user_limit' => 'integer',
            'conditions_json' => 'array',
        ];
    }

    public function products()
    {
        return $this->hasMany(PromotionProduct::class);
    }
}
