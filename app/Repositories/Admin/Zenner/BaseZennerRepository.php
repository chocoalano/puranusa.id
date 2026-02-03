<?php

namespace App\Repositories\Admin\Zenner;

use App\Repositories\Admin\Zenner\Contracts\ZennerRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

abstract class BaseZennerRepository implements ZennerRepositoryInterface
{
    public function __construct(protected Model $model) {}

    public function paginate(array $filters = [], int $perPage = 25): LengthAwarePaginator
    {
        $query = $this->model->newQuery();

        $query = $this->applySearch($query, $filters['search'] ?? null);
        $query = $this->applyStatusFilter($query, $filters['status'] ?? null);
        $query = $this->applyCustomFilters($query, $filters);

        $sortBy = $filters['sort_by'] ?? 'created_at';
        $sortOrder = $filters['sort_order'] ?? 'desc';
        $query->orderBy($sortBy, $sortOrder);

        return $query->paginate($perPage)->withQueryString();
    }

    public function findOrFail(int $id): Model
    {
        return $this->model->newQuery()->findOrFail($id);
    }

    public function create(array $data): Model
    {
        return $this->model->newQuery()->create($data);
    }

    public function update(int $id, array $data): Model
    {
        $record = $this->findOrFail($id);
        $record->update($data);
        return $record;
    }

    public function delete(int $id): bool
    {
        return $this->findOrFail($id)->delete();
    }

    protected function applySearch(Builder $query, ?string $search): Builder
    {
        if (!$search) {
            return $query;
        }

        $searchable = $this->getSearchableColumns();

        return $query->where(function (Builder $q) use ($search, $searchable) {
            foreach ($searchable as $column) {
                $q->orWhere($column, 'like', "%{$search}%");
            }
        });
    }

    protected function applyStatusFilter(Builder $query, ?string $status): Builder
    {
        if ($status === null || $status === 'all') {
            return $query;
        }

        return $query->where('is_active', $status === 'active');
    }

    protected function applyCustomFilters(Builder $query, array $filters): Builder
    {
        return $query;
    }

    abstract protected function getSearchableColumns(): array;
}
