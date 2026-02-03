<?php

namespace App\Repositories\Admin\Zenner;

use App\Models\Zenner\AdsGuide;
use Illuminate\Database\Eloquent\Builder;

class AdsGuideRepository extends BaseZennerRepository
{
    public function __construct()
    {
        parent::__construct(new AdsGuide());
    }

    protected function getSearchableColumns(): array
    {
        return ['title', 'content', 'platform'];
    }

    protected function applyCustomFilters(Builder $query, array $filters): Builder
    {
        if (!empty($filters['platform'])) {
            $query->where('platform', $filters['platform']);
        }

        return $query;
    }
}
