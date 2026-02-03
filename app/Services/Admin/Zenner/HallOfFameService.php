<?php

namespace App\Services\Admin\Zenner;

use App\Repositories\Admin\Zenner\HallOfFameRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Model;

class HallOfFameService
{
    public function __construct(protected HallOfFameRepository $repository) {}

    public function paginate(array $filters = [], int $perPage = 25): LengthAwarePaginator
    {
        return $this->repository->paginate($filters, $perPage);
    }

    public function findOrFail(int $id): Model
    {
        return $this->repository->findOrFail($id);
    }

    public function create(array $data): Model
    {
        return $this->repository->create($data);
    }

    public function update(int $id, array $data): Model
    {
        return $this->repository->update($id, $data);
    }

    public function delete(int $id): bool
    {
        return $this->repository->delete($id);
    }
}
