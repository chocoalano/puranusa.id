<?php

namespace App\Repositories\Admin\Zenner;

use App\Models\Zenner\Webinar;
use Illuminate\Database\Eloquent\Builder;

class WebinarRepository extends BaseZennerRepository
{
    public function __construct()
    {
        parent::__construct(new Webinar());
    }

    protected function getSearchableColumns(): array
    {
        return ['title', 'description', 'speaker'];
    }

    protected function applyCustomFilters(Builder $query, array $filters): Builder
    {
        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        return $query;
    }
}
