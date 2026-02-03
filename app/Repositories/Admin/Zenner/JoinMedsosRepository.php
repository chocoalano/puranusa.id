<?php

namespace App\Repositories\Admin\Zenner;

use App\Models\Zenner\JoinMedsos;

class JoinMedsosRepository extends BaseZennerRepository
{
    public function __construct()
    {
        parent::__construct(new JoinMedsos());
    }

    protected function getSearchableColumns(): array
    {
        return ['platform', 'url', 'description'];
    }
}
