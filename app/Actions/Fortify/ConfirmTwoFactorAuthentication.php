<?php

namespace App\Actions\Fortify;

use Laravel\Fortify\Contracts\TwoFactorAuthenticationProvider;

class ConfirmTwoFactorAuthentication
{
    /**
     * Create a new action instance.
     */
    public function __construct(
        protected TwoFactorAuthenticationProvider $provider
    ) {}

    /**
     * Confirm the two factor authentication configuration for the user (without encryption).
     */
    public function __invoke(mixed $user, string $code): void
    {
        if (empty($user->two_factor_secret) ||
            empty($code) ||
            ! $this->provider->verify($user->two_factor_secret, $code)) {
            throw new \InvalidArgumentException(__('The provided two factor authentication code was invalid.'));
        }

        $user->forceFill([
            'two_factor_confirmed_at' => now(),
        ])->save();
    }
}
