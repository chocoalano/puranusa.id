<?php

namespace App\Repositories\Admin\Zenner;

use App\Models\Zenner\LeaderboardConfig;
use Illuminate\Database\Eloquent\Builder;

class LeaderboardConfigRepository extends BaseZennerRepository
{
    public function __construct()
    {
        parent::__construct(new LeaderboardConfig());
    }

    protected function getSearchableColumns(): array
    {
        return ['title'];
    }

    protected function applyCustomFilters(Builder $query, array $filters): Builder
    {
        $query->withCount('entries');

        if (!empty($filters['type'])) {
            $query->where('type', $filters['type']);
        }

        return $query;
    }

    public function findWithEntries(int $id)
    {
        return $this->model->with('entries')->findOrFail($id);
    }
}
