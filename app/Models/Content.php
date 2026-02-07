<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Content extends Model
{
    use HasFactory;

    protected $table = "contents";

    protected $fillable = [
        'category_id',
        'title',
        'slug',
        'content',
        'file',
        'vlink',
        'status',
        'created_by',
    ];

    /**
     * Relasi ke kategori konten
     */
    public function category(): BelongsTo
    {
        // Perbaikan: Gunakan $this->belongsTo()
        return $this->belongsTo(ContentsCategory::class, 'category_id');
    }

    /**
     * Relasi ke user yang membuat konten
     */
    public function creator(): BelongsTo
    {
        // Perbaikan: Nama method diganti ke 'creator' agar lebih intuitif
        // Perbaikan: Sertakan foreign key 'created_by' secara eksplisit
        return $this->belongsTo(User::class, 'created_by');
    }
}
