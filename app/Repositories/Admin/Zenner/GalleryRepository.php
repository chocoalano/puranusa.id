<?php

namespace App\Repositories\Admin\Zenner;

use App\Models\Zenner\Gallery;
use Illuminate\Database\Eloquent\Builder;

class GalleryRepository extends BaseZennerRepository
{
    public function __construct()
    {
        parent::__construct(new Gallery());
    }

    protected function getSearchableColumns(): array
    {
        return ['title', 'description', 'category'];
    }

    protected function applyCustomFilters(Builder $query, array $filters): Builder
    {
        if (!empty($filters['category'])) {
            $query->where('category', $filters['category']);
        }

        if (!empty($filters['file_type'])) {
            $query->where('file_type', $filters['file_type']);
        }

        return $query;
    }
}
