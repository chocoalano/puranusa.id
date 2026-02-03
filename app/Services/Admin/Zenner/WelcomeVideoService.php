<?php

namespace App\Services\Admin\Zenner;

use App\Repositories\Admin\Zenner\WelcomeVideoRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Model;

class WelcomeVideoService
{
    public function __construct(protected WelcomeVideoRepository $repository) {}

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
