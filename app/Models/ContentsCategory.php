<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ContentsCategory extends Model
{
    use HasFactory;

    protected $table = "contents_category";

    protected $fillable = [
        'parent_id',
        'name',
        'slug'
    ];

    /**
     * Relasi ke Parent Category (Self-relationship)
     * Digunakan jika kategori ini adalah sub-kategori
     */
    public function parent(): BelongsTo
    {
        return $this->belongsTo(ContentsCategory::class, 'parent_id');
    }

    /**
     * Relasi ke Child Categories
     * Digunakan untuk mengambil semua sub-kategori di bawah kategori ini
     */
    public function children(): HasMany
    {
        return $this->hasMany(ContentsCategory::class, 'parent_id');
    }

    /**
     * Relasi ke Model Content
     * Satu kategori bisa memiliki banyak konten
     */
    public function contents(): HasMany
    {
        // Gunakan hasMany karena satu kategori punya banyak post/content
        return $this->hasMany(Content::class, 'category_id');
    }
}
