<?php

namespace App\Models\Manage;

use App\Models\CustomerAddress;
use App\Notifications\CustomerResetPasswordNotification;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;

/**
 * @property int $id
 * @property string $ref_code
 * @property string $name
 * @property string $email
 * @property string|null $phone
 * @property string $password
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string|null $ewallet_id
 * @property float $ewallet_saldo
 * @property string|null $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read CustomerNetwork|null $networkPosition
 * @property-read CustomerNetwork|null $leftDownline
 * @property-read CustomerNetwork|null $rightDownline
 * @property-read CustomerNetworkMatrix|null $matrixPosition
 * @property-read \Illuminate\Database\Eloquent\Collection<int, CustomerNetworkMatrix> $matrixDownlines
 * @property-read \Illuminate\Database\Eloquent\Collection<int, CustomerBonus> $bonuses
 * @property-read \Illuminate\Database\Eloquent\Collection<int, CustomerBonusMatching> $bonusMatchings
 * @property-read \Illuminate\Database\Eloquent\Collection<int, CustomerBonusPairing> $bonusPairings
 * @property-read \Illuminate\Database\Eloquent\Collection<int, CustomerBonusSponsor> $bonusSponsors
 */
class Customer extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\Manage\CustomerFactory> */
    use CanResetPassword, HasFactory, Notifiable;

    /**
     * The table associated with the model.
     */
    protected $table = 'customers';

    protected $fillable = [
        'ref_code',
        'name',
        'email',
        'phone',
        'password',
        'email_verified_at',
        'ewallet_id',
        'ewallet_saldo',
        'description',
    ];

    /**
     * Get the e-mail address where password reset links are sent.
     */
    public function getEmailForPasswordReset(): string
    {
        return $this->email;
    }

    /**
     * Send the password reset notification.
     */
    public function sendPasswordResetNotification($token): void
    {
        $this->notify(new CustomerResetPasswordNotification($token));
    }

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'ewallet_saldo' => 'float',
            'password' => 'hashed',
        ];
    }

    /**
     * Boot model events
     */
    protected static function booted(): void
    {
        static::creating(function (Customer $customer) {
            if (empty($customer->ewallet_id)) {
                $customer->ewallet_id = self::generateEwalletId();
            }
            if (empty($customer->ref_code)) {
                $customer->ref_code = self::generateRefCode();
            }
        });
    }

    /**
     * Generate unique ewallet ID with format: EW-YYYYMMDD-XXXXX
     */
    public static function generateEwalletId(): string
    {
        $prefix = 'EW-'.date('Ymd').'-';
        $attempts = 0;
        $maxAttempts = 100;

        do {
            $randomPart = strtoupper(Str::random(5));
            $ewalletId = $prefix.$randomPart;
            $exists = self::where('ewallet_id', $ewalletId)->exists();
            $attempts++;
        } while ($exists && $attempts < $maxAttempts);

        if ($exists) {
            throw new \RuntimeException('Unable to generate unique ewallet ID after '.$maxAttempts.' attempts');
        }

        return $ewalletId;
    }

    /**
     * ✅ Generate unique ref_code with format: REF-XXXXXXXX
     */
    public static function generateRefCode(): string
    {
        $prefix = 'REF-';
        $attempts = 0;
        $maxAttempts = 100;

        do {
            $randomPart = strtoupper(Str::random(8)); // 8 char random
            $refCode = $prefix.$randomPart;
            $exists = self::where('ref_code', $refCode)->exists();
            $attempts++;
        } while ($exists && $attempts < $maxAttempts);

        if ($exists) {
            throw new \RuntimeException('Unable to generate unique ref code after '.$maxAttempts.' attempts');
        }

        return $refCode;
    }

    /**
     * Relasi ke alamat customer
     */
    public function addresses(): HasMany
    {
        return $this->hasMany(CustomerAddress::class, 'customer_id');
    }

    /**
     * Relasi ke alamat default
     */
    public function defaultAddress(): HasOne
    {
        return $this->hasOne(CustomerAddress::class, 'customer_id')->where('is_default', true);
    }

    /**
     * Relasi ke orders customer
     */
    public function orders(): HasMany
    {
        return $this->hasMany(\App\Models\Order::class, 'customer_id');
    }

    /**
     * Relasi ke wallet transactions
     */
    public function walletTransactions(): HasMany
    {
        return $this->hasMany(\App\Models\CustomerWalletTransaction::class, 'customer_id');
    }

    /**
     * Relasi ke posisi jaringan binary tree (sebagai member)
     */
    public function networkPosition(): HasOne
    {
        return $this->hasOne(CustomerNetwork::class, 'member_id');
    }

    /**
     * Relasi ke downline kiri dan kanan (sebagai upline)
     */
    public function downlines(): HasMany
    {
        return $this->hasMany(CustomerNetwork::class, 'upline_id');
    }

    /**
     * Relasi ke downline kiri
     */
    public function leftDownline(): HasOne
    {
        return $this->hasOne(CustomerNetwork::class, 'upline_id')->where('position', 'left');
    }

    /**
     * Relasi ke downline kanan
     */
    public function rightDownline(): HasOne
    {
        return $this->hasOne(CustomerNetwork::class, 'upline_id')->where('position', 'right');
    }

    /**
     * Relasi ke sponsor matrix (sebagai member)
     */
    public function matrixPosition(): HasOne
    {
        return $this->hasOne(CustomerNetworkMatrix::class, 'member_id');
    }

    /**
     * Relasi ke semua downline matrix (sebagai sponsor)
     */
    public function matrixDownlines(): HasMany
    {
        return $this->hasMany(CustomerNetworkMatrix::class, 'sponsor_id');
    }

    /**
     * Relasi ke bonus umum
     */
    public function bonuses(): HasMany
    {
        return $this->hasMany(CustomerBonus::class, 'member_id');
    }

    /**
     * Relasi ke bonus matching
     */
    public function bonusMatchings(): HasMany
    {
        return $this->hasMany(CustomerBonusMatching::class, 'member_id');
    }

    /**
     * Relasi ke bonus pairing
     */
    public function bonusPairings(): HasMany
    {
        return $this->hasMany(CustomerBonusPairing::class, 'member_id');
    }

    /**
     * Relasi ke bonus sponsor
     */
    public function bonusSponsors(): HasMany
    {
        return $this->hasMany(CustomerBonusSponsor::class, 'member_id');
    }

    /**
     * Dapatkan upline dari member ini
     */
    public function getUpline(): ?self
    {
        return $this->networkPosition?->upline;
    }

    /**
     * Dapatkan sponsor dari member ini
     */
    public function getSponsor(): ?self
    {
        return $this->matrixPosition?->sponsor;
    }

    /**
     * Cek apakah posisi kiri tersedia
     */
    public function hasLeftPosition(): bool
    {
        return $this->leftDownline()->exists();
    }

    /**
     * Cek apakah posisi kanan tersedia
     */
    public function hasRightPosition(): bool
    {
        return $this->rightDownline()->exists();
    }

    /**
     * Cek apakah kedua posisi sudah terisi
     */
    public function isBothPositionsFilled(): bool
    {
        return $this->hasLeftPosition() && $this->hasRightPosition();
    }

    /**
     * Tambah saldo ewallet
     */
    public function addBalance(float $amount, ?string $description = null): bool
    {
        $newBalance = bcadd((string) $this->ewallet_saldo, (string) $amount, 2);
        $this->ewallet_saldo = (float) $newBalance;

        return $this->save();
    }

    /**
     * Kurangi saldo ewallet
     */
    public function deductBalance(float $amount, ?string $description = null): bool
    {
        if ((float) $this->ewallet_saldo < $amount) {
            throw new \Exception('Insufficient balance');
        }

        $newBalance = bcsub((string) $this->ewallet_saldo, (string) $amount, 2);
        $this->ewallet_saldo = (float) $newBalance;

        return $this->save();
    }

    /**
     * Hitung total semua bonus yang sudah dirilis
     */
    public function getTotalReleasedBonus(): float
    {
        $regular = $this->bonuses()->where('status', 1)->sum('tax_netto');
        $matching = $this->bonusMatchings()->where('status', 1)->sum('amount');
        $pairing = $this->bonusPairings()->where('status', 1)->sum('amount');
        $sponsor = $this->bonusSponsors()->where('status', 1)->sum('amount');

        return $regular + $matching + $pairing + $sponsor;
    }

    /**
     * Hitung total bonus pending
     */
    public function getTotalPendingBonus(): float
    {
        $regular = $this->bonuses()->where('status', 0)->sum('tax_netto');
        $matching = $this->bonusMatchings()->where('status', 0)->sum('amount');
        $pairing = $this->bonusPairings()->where('status', 0)->sum('amount');
        $sponsor = $this->bonusSponsors()->where('status', 0)->sum('amount');

        return $regular + $matching + $pairing + $sponsor;
    }

    /**
     * Dapatkan semua downline (recursive untuk binary tree)
     */
    public function getAllDownlines(?int $maxLevel = null): array
    {
        $downlines = [];
        $this->collectDownlines($this, $downlines, 1, $maxLevel);

        return $downlines;
    }

    /**
     * Helper method untuk collect downlines secara rekursif
     */
    private function collectDownlines(self $member, array &$downlines, int $currentLevel, ?int $maxLevel): void
    {
        if ($maxLevel !== null && $currentLevel > $maxLevel) {
            return;
        }

        foreach ($member->downlines as $downline) {
            if ($downline->member) {
                $downlines[] = [
                    'member' => $downline->member,
                    'level' => $currentLevel,
                    'position' => $downline->position,
                ];
                $this->collectDownlines($downline->member, $downlines, $currentLevel + 1, $maxLevel);
            }
        }
    }

    /**
     * Hitung total member di jaringan kiri
     */
    public function countLeftNetwork(): int
    {
        $left = $this->leftDownline?->member;
        if (! $left) {
            return 0;
        }

        return 1 + $left->countLeftNetwork() + $left->countRightNetwork();
    }

    /**
     * Hitung total member di jaringan kanan
     */
    public function countRightNetwork(): int
    {
        $right = $this->rightDownline?->member;
        if (! $right) {
            return 0;
        }

        return 1 + $right->countLeftNetwork() + $right->countRightNetwork();
    }
}
