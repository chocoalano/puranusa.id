<?php

namespace App\Repositories\Admin\Zenner;

use App\Models\Zenner\ProductKnowledge;
use Illuminate\Database\Eloquent\Builder;

class ProductKnowledgeRepository extends BaseZennerRepository
{
    public function __construct()
    {
        parent::__construct(new ProductKnowledge());
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
