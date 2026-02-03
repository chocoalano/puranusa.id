<?php

namespace App\Repositories\Admin\Zenner;

use App\Models\Zenner\WelcomeVideo;

class WelcomeVideoRepository extends BaseZennerRepository
{
    public function __construct()
    {
        parent::__construct(new WelcomeVideo());
    }

    protected function getSearchableColumns(): array
    {
        return ['title', 'description'];
    }
}
