<?php

namespace App\Repositories\Admin\Zenner;

use App\Models\Zenner\Lesson;
use Illuminate\Database\Eloquent\Builder;

class LessonRepository extends BaseZennerRepository
{
    public function __construct()
    {
        parent::__construct(new Lesson());
    }

    protected function getSearchableColumns(): array
    {
        return ['title', 'content'];
    }

    protected function applyCustomFilters(Builder $query, array $filters): Builder
    {
        $query->with('course');

        if (!empty($filters['course_id'])) {
            $query->where('course_id', $filters['course_id']);
        }

        return $query;
    }
}
