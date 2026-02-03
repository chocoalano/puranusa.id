<?php

namespace App\Repositories\Admin\Zenner;

use App\Models\Zenner\MarketingKit;
use Illuminate\Database\Eloquent\Builder;

class MarketingKitRepository extends BaseZennerRepository
{
    public function __construct()
    {
        parent::__construct(new MarketingKit());
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

        return $query;
    }
}
