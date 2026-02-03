<?php

namespace App\Repositories\Admin\Zenner;

use App\Models\Zenner\HallOfFame;

class HallOfFameRepository extends BaseZennerRepository
{
    public function __construct()
    {
        parent::__construct(new HallOfFame());
    }

    protected function getSearchableColumns(): array
    {
        return ['customer_name', 'title', 'achievement'];
    }
}
