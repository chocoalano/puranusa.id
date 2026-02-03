<?php

namespace App\Services\Admin\Zenner;

use App\Repositories\Admin\Zenner\TopAffiliateRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Model;

class TopAffiliateService
{
    public function __construct(protected TopAffiliateRepository $repository) {}

    public function paginate(array $filters = [], int $perPage = 25): LengthAwarePaginator
    {
        return $this->repository->paginate($filters, $perPage);
    }

    public function findOrFail(int $id): Model
    {
        return $this->repository->findOrFail($id);
    }
}
