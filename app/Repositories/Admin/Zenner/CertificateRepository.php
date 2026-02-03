<?php

namespace App\Repositories\Admin\Zenner;

use App\Models\Zenner\Certificate;
use Illuminate\Database\Eloquent\Builder;

class CertificateRepository extends BaseZennerRepository
{
    public function __construct()
    {
        parent::__construct(new Certificate());
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
