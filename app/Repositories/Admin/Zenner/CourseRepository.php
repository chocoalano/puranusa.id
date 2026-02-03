<?php

namespace App\Repositories\Admin\Zenner;

use App\Models\Zenner\Course;
use Illuminate\Database\Eloquent\Builder;

class CourseRepository extends BaseZennerRepository
{
    public function __construct()
    {
        parent::__construct(new Course());
    }

    protected function getSearchableColumns(): array
    {
        return ['title', 'description'];
    }

    protected function applyCustomFilters(Builder $query, array $filters): Builder
    {
        $query->withCount('lessons');

        if (!empty($filters['level'])) {
            $query->where('level', $filters['level']);
        }

        return $query;
    }
}
