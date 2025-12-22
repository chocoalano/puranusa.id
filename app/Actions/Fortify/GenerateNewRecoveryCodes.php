<?php

namespace App\Actions\Fortify;

use Illuminate\Support\Collection;
use Laravel\Fortify\RecoveryCode;

class GenerateNewRecoveryCodes
{
    /**
     * Generate new recovery codes for the user (without encryption).
     */
    public function __invoke(mixed $user): void
    {
        $user->forceFill([
            'two_factor_recovery_codes' => json_encode(Collection::times(8, function () {
                return RecoveryCode::generate();
            })->all()),
        ])->save();
    }
}
