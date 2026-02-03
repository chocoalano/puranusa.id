<?php

namespace App\Repositories\Admin\Zenner;

use App\Models\Zenner\LeaderboardEntry;
use Illuminate\Database\Eloquent\Builder;

class LeaderboardEntryRepository extends BaseZennerRepository
{
    public function __construct()
    {
        parent::__construct(new LeaderboardEntry());
    }

    protected function getSearchableColumns(): array
    {
        return ['customer_name', 'period_label'];
    }

    protected function applyCustomFilters(Builder $query, array $filters): Builder
    {
        if (!empty($filters['config_id'])) {
            $query->where('config_id', $filters['config_id']);
        }

        return $query;
    }
}
