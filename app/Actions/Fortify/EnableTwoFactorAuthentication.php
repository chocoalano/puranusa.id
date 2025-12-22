<?php

namespace App\Actions\Fortify;

use Illuminate\Support\Collection;
use Laravel\Fortify\Contracts\TwoFactorAuthenticationProvider;
use Laravel\Fortify\RecoveryCode;

class EnableTwoFactorAuthentication
{
    /**
     * Create a new action instance.
     */
    public function __construct(
        protected TwoFactorAuthenticationProvider $provider
    ) {}

    /**
     * Enable two factor authentication for the user (without encryption).
     */
    public function __invoke(mixed $user, bool $force = false): void
    {
        // Get secret length from provider
        $secretLength = 16;

        if (empty($user->two_factor_secret) || $force === true) {
            $user->forceFill([
                'two_factor_secret' => $this->provider->generateSecretKey($secretLength),
                'two_factor_recovery_codes' => json_encode(Collection::times(8, function () {
                    return RecoveryCode::generate();
                })->all()),
                'two_factor_confirmed_at' => null,
            ])->save();
        }
    }
}
