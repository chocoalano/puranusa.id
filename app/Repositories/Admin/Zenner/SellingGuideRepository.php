<?php

namespace App\Repositories\Admin\Zenner;

use App\Models\Zenner\SellingGuide;
use Illuminate\Database\Eloquent\Builder;

class SellingGuideRepository extends BaseZennerRepository
{
    public function __construct()
    {
        parent::__construct(new SellingGuide());
    }

    protected function getSearchableColumns(): array
    {
        return ['title', 'content', 'category'];
    }

    protected function applyCustomFilters(Builder $query, array $filters): Builder
    {
        if (!empty($filters['category'])) {
            $query->where('category', $filters['category']);
        }

        return $query;
    }
}
