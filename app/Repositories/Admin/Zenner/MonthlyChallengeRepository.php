<?php

namespace App\Repositories\Admin\Zenner;

use App\Models\Zenner\MonthlyChallenge;

class MonthlyChallengeRepository extends BaseZennerRepository
{
    public function __construct()
    {
        parent::__construct(new MonthlyChallenge());
    }

    protected function getSearchableColumns(): array
    {
        return ['title', 'description'];
    }
}
