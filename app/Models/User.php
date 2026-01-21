<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Policies\UserPolicy;
use Illuminate\Database\Eloquent\Attributes\UsePolicy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\Contracts\TwoFactorAuthenticationProvider;
use Laravel\Fortify\Events\RecoveryCodeReplaced;
use Laravel\Fortify\Fortify;
use Laravel\Fortify\RecoveryCode;
use Laravel\Fortify\TwoFactorAuthenticatable;

#[UsePolicy(UserPolicy::class)]
class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }

    /**
     * Get the user's two factor authentication secret key (without decryption).
     */
    public function twoFactorSecret(): ?string
    {
        return $this->two_factor_secret;
    }

    /**
     * Get the user's two factor authentication recovery codes (without decryption).
     *
     * @return array<int, string>
     */
    public function recoveryCodes(): array
    {
        $codes = $this->two_factor_recovery_codes;

        if (is_null($codes)) {
            return [];
        }

        // If it's already an array (from JSON), return it
        if (is_array($codes)) {
            return $codes;
        }

        // Try to decode as JSON (stored without encryption)
        $decoded = json_decode($codes, true);

        return is_array($decoded) ? $decoded : [];
    }

    /**
     * Replace the given recovery code with a new one (without encryption).
     */
    public function replaceRecoveryCode(string $code): void
    {
        $codes = $this->recoveryCodes();
        $newCodes = str_replace($code, RecoveryCode::generate(), json_encode($codes));

        $this->forceFill([
            'two_factor_recovery_codes' => $newCodes,
        ])->save();

        RecoveryCodeReplaced::dispatch($this, $code);
    }

    /**
     * Get the two factor authentication QR code URL (without encryption).
     */
    public function twoFactorQrCodeUrl(): string
    {
        return app(TwoFactorAuthenticationProvider::class)->qrCodeUrl(
            config('app.name'),
            $this->{Fortify::username()},
            $this->two_factor_secret
        );
    }
}
