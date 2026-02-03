<?php

namespace App\Repositories\Admin\Zenner;

use App\Models\Zenner\IncentiveRule;
use Illuminate\Database\Eloquent\Builder;

class IncentiveRuleRepository extends BaseZennerRepository
{
    public function __construct()
    {
        parent::__construct(new IncentiveRule());
    }

    protected function getSearchableColumns(): array
    {
        return ['title', 'description'];
    }

    protected function applyCustomFilters(Builder $query, array $filters): Builder
    {
        if (!empty($filters['type'])) {
            $query->where('type', $filters['type']);
        }

        return $query;
    }
}
