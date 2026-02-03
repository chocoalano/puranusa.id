<?php

namespace App\Repositories\Admin\Zenner;

use App\Models\Zenner\TopAffiliate;
use Illuminate\Database\Eloquent\Builder;

class TopAffiliateRepository extends BaseZennerRepository
{
    public function __construct()
    {
        parent::__construct(new TopAffiliate());
    }

    protected function getSearchableColumns(): array
    {
        return ['customer_name', 'period'];
    }

    protected function applyStatusFilter(Builder $query, ?string $status): Builder
    {
        return $query;
    }
}
