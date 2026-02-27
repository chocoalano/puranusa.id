<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Manage\StoreCustomerRequest;
use App\Http\Requests\Manage\UpdateCustomerRequest;
use App\Models\Manage\Customer;
use App\Services\MLMService;
use App\Services\RajaOngkirService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class CustomerController extends Controller
{
    public function __construct(
        protected MLMService $mlmService,
        protected RajaOngkirService $rajaOngkirService,
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $query = Customer::query()
            ->with(['networkPosition', 'matrixPosition', 'sponsor:id,name,username', 'upline:id,name,username']);

        // Search
        if ($search = $request->get('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('username', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%")
                    ->orWhere('ewallet_id', 'like', "%{$search}%");
            });
        }

        // Filter by sponsor
        if ($sponsorId = $request->get('sponsor_id')) {
            $query->whereHas('matrixPosition', function ($q) use ($sponsorId) {
                $q->where('sponsor_id', $sponsorId);
            });
        }

        // Filter by upline
        if ($uplineId = $request->get('upline_id')) {
            $query->whereHas('networkPosition', function ($q) use ($uplineId) {
                $q->where('upline_id', $uplineId);
            });
        }

        // Filter by email verified
        if ($request->has('email_verified') && $request->get('email_verified') !== '') {
            if ($request->boolean('email_verified')) {
                $query->whereNotNull('email_verified_at');
            } else {
                $query->whereNull('email_verified_at');
            }
        }

        // Filter by package
        if ($request->has('package_id') && $request->get('package_id') !== '') {
            $packageId = $request->get('package_id');
            if ($packageId === 'null') {
                $query->whereNull('package_id');
            } else {
                $query->where('package_id', $packageId);
            }
        }

        // Filter by position
        if ($request->has('position') && $request->get('position') !== '') {
            $query->whereHas('networkPosition', function ($q) use ($request) {
                $q->where('position', $request->get('position'));
            });
        }

        // Filter by status (customer status, not email verified)
        if ($request->has('status') && $request->get('status') !== '') {
            $query->where('status', $request->get('status'));
        }

        // Sorting
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);
        $customers = $query->paginate($request->integer('per_page', 10))
            ->through(function ($customer) {
                return [
                    'id' => $customer->id,
                    'username' => $customer->username,
                    'name' => $customer->name,
                    'email' => $customer->email,
                    'phone' => $customer->phone,
                    'ewallet_id' => $customer->ewallet_id,
                    'ewallet_saldo' => $customer->ewallet_saldo,
                    'email_verified_at' => $customer->email_verified_at?->format('Y-m-d H:i:s'),
                    'created_at' => $customer->created_at?->format('Y-m-d H:i:s'),
                    'sponsor_id' => $customer->matrixPosition?->sponsor_id,
                    'sponsor_name' => $customer->sponsor?->name,
                    'sponsor_username' => $customer->sponsor?->username,
                    'upline_id' => $customer->networkPosition?->upline_id,
                    'upline_name' => $customer->upline?->name,
                    'upline_username' => $customer->upline?->username,
                    'position' => $customer->networkPosition?->position,
                    'status' => $customer->status,
                    'level' => $customer->level,
                    'package_id' => $customer->package_id,
                    'package_name' => $customer->get_package_name(),
                ];
            });

        return Inertia::render('Admin/Customers/Index', [
            'customers' => $customers,
            'filters' => $request->only(['search', 'sponsor_id', 'upline_id', 'email_verified', 'package_id', 'position', 'status', 'sort_by', 'sort_order', 'per_page']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Customers/Create', [
            'sponsors' => $this->getSponsorOptions(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCustomerRequest $request)
    {
        $validated = $request->validated();

        DB::beginTransaction();

        try {
            $ewalletId = Customer::generateEwalletId();
            $status = (int) ($validated['status'] ?? 1);
            $rawPassword = trim((string) ($validated['password'] ?? ''));

            $customerData = [
                'name' => $validated['name'],
                'username' => $validated['username'],
                'nik' => $validated['nik'],
                'gender' => $validated['gender'] ?? null,
                'email' => $validated['email'],
                'phone' => $validated['phone'],
                'password' => $rawPassword !== '' ? bcrypt($rawPassword) : bcrypt(Str::password(16)),
                'description' => $validated['description'] ?? null,
                'alamat' => $validated['alamat'] ?? null,
                'bank_name' => $validated['bank_name'] ?? null,
                'bank_account' => $validated['bank_account'] ?? null,
                'sponsor_id' => $validated['sponsor_id'] ?? null,
                'status' => $status,
                'level' => $validated['level'] ?? null,
                'package_id' => $validated['package_id'] ?? null,
                'ewallet_id' => $ewalletId,
                'ref_code' => strtoupper(substr(md5(uniqid()), 0, 8)),
            ];

            $customer = Customer::create($customerData);
            if ($this->hasPrimaryAddressPayload($validated)) {
                $this->syncPrimaryAddress($customer, $validated);
            }
            if ($this->hasNpwpPayload($validated['npwp'] ?? null)) {
                $this->syncCustomerNpwp($customer, $validated['npwp']);
            }

            DB::commit();

            return redirect()
                ->route('customers.show', $customer)
                ->with('success', 'Customer berhasil ditambahkan dengan Ewallet ID: '.$customer->ewallet_id);
        } catch (\Throwable $e) {
            DB::rollBack();

            return redirect()
                ->back()
                ->withInput()
                ->with('error', 'Gagal menambahkan customer: '.$e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Customer $customer): Response
    {
        // Load all relationships
        $customer->load([
            'networkPosition.upline',
            'matrixPosition.sponsor',
            'addresses',
            'downlines.member',
            'leftDownline.member',
            'rightDownline.member',
        ]);

        // Get network statistics
        $stats = $this->mlmService->getNetworkStatistics($customer->id);

        // Get recent bonuses
        $recentBonuses = [
            'regular' => $customer->bonuses()->latest()->limit(5)->get()->map(function ($bonus) {
                return [
                    'id' => $bonus->id,
                    'amount' => $bonus->amount,
                    'description' => $bonus->description,
                    'status' => $bonus->status,
                    'released_at' => $bonus->released_at?->format('Y-m-d H:i:s'),
                    'created_at' => $bonus->created_at?->format('Y-m-d H:i:s'),
                ];
            }),
            'matching' => $customer->bonusMatchings()->latest()->limit(5)->get()->map(function ($bonus) {
                return [
                    'id' => $bonus->id,
                    'amount' => $bonus->amount,
                    'description' => $bonus->description,
                    'status' => $bonus->status,
                    'released_at' => $bonus->released_at?->format('Y-m-d H:i:s'),
                    'created_at' => $bonus->created_at?->format('Y-m-d H:i:s'),
                ];
            }),
            'pairing' => $customer->bonusPairings()->latest()->limit(5)->get()->map(function ($bonus) {
                return [
                    'id' => $bonus->id,
                    'amount' => $bonus->amount,
                    'description' => $bonus->description,
                    'status' => $bonus->status,
                    'released_at' => $bonus->released_at?->format('Y-m-d H:i:s'),
                    'created_at' => $bonus->created_at?->format('Y-m-d H:i:s'),
                ];
            }),
            'sponsor' => $customer->bonusSponsors()->latest()->limit(5)->get()->map(function ($bonus) {
                return [
                    'id' => $bonus->id,
                    'amount' => $bonus->amount,
                    'description' => $bonus->description,
                    'status' => $bonus->status,
                    'released_at' => $bonus->released_at?->format('Y-m-d H:i:s'),
                    'created_at' => $bonus->created_at?->format('Y-m-d H:i:s'),
                ];
            }),
        ];

        // Get downline tree (3 levels)
        $downlineTree = $this->mlmService->getDownlineTree($customer->id, maxLevel: 3);

        return Inertia::render('Admin/Customers/Show', [
            'customer' => [
                'id' => $customer->id,
                'name' => $customer->name,
                'email' => $customer->email,
                'phone' => $customer->phone,
                'ewallet_id' => $customer->ewallet_id,
                'ewallet_saldo' => $customer->ewallet_saldo,
                'email_verified_at' => $customer->email_verified_at?->format('Y-m-d H:i:s'),
                'description' => $customer->description,
                'created_at' => $customer->created_at?->format('Y-m-d H:i:s'),
                'updated_at' => $customer->updated_at?->format('Y-m-d H:i:s'),
                'upline' => $customer->networkPosition?->upline?->only(['id', 'name', 'email', 'ewallet_id']),
                'sponsor' => $customer->matrixPosition?->sponsor?->only(['id', 'name', 'email', 'ewallet_id']),
                'position' => $customer->networkPosition?->position,
                'level' => $customer->networkPosition?->level,
                'addresses' => $customer->addresses,
            ],
            'statistics' => $stats,
            'recentBonuses' => $recentBonuses,
            'downlineTree' => $downlineTree,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Customer $customer): Response
    {
        $customer->load(['defaultAddress', 'matrixPosition']);
        $customerNpwp = DB::table('customer_npwp')
            ->where('member_id', $customer->id)
            ->orderByDesc('id')
            ->first();

        $defaultAddress = $customer->defaultAddress;
        if (! $defaultAddress) {
            $defaultAddress = $customer->addresses()->orderByDesc('is_default')->latest('id')->first();
        }

        return Inertia::render('Admin/Customers/Edit', [
            'sponsors' => $this->getSponsorOptions($customer->id),
            'customer' => [
                'id' => $customer->id,
                'name' => $customer->name,
                'username' => $customer->username,
                'nik' => $customer->nik,
                'gender' => $customer->gender,
                'email' => $customer->email,
                'phone' => $customer->phone,
                'description' => $customer->description,
                'address' => $defaultAddress?->address_line1,
                'alamat' => $customer->alamat ?? $defaultAddress?->address_line2,
                'province_id' => $defaultAddress?->province_id,
                'city_id' => $defaultAddress?->city_id,
                'bank_name' => $customer->bank_name,
                'bank_account' => $customer->bank_account,
                'sponsor_id' => $customer->matrixPosition?->sponsor_id,
                'status' => (string) $customer->status,
                'package_id' => $customer->package_id,
                'level' => $customer->level,
                'npwp' => [
                    'nama' => $customerNpwp?->nama ?? $customer->name,
                    'npwp' => $customerNpwp?->npwp,
                    'jk' => $this->mapNpwpGenderToForm($customerNpwp?->jk, $customer->gender),
                    'npwp_date' => $customerNpwp?->npwp_date ?? now()->toDateString(),
                    'alamat' => $customerNpwp?->alamat ?? ($customer->alamat ?? ''),
                    'menikah' => $this->mapMarriageStatusToForm($customerNpwp?->menikah),
                    'anak' => $customerNpwp?->anak !== null ? (int) $customerNpwp->anak : 0,
                    'kerja' => $this->mapWorkStatusToForm($customerNpwp?->kerja),
                    'office' => $customerNpwp?->office && $customerNpwp?->office !== '-' ? $customerNpwp->office : '',
                ],
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCustomerRequest $request, Customer $customer)
    {
        $validated = $request->validated();

        DB::beginTransaction();

        try {
            $customer->update([
                'name' => $validated['name'],
                'username' => $validated['username'],
                'nik' => $validated['nik'],
                'gender' => $validated['gender'] ?? $customer->gender,
                'email' => $validated['email'],
                'phone' => $validated['phone'],
                'description' => $validated['description'] ?? $customer->description,
                'alamat' => $validated['alamat'] ?? $customer->alamat,
                'bank_name' => $validated['bank_name'] ?? $customer->bank_name,
                'bank_account' => $validated['bank_account'] ?? $customer->bank_account,
            ]);

            if (! empty($validated['password'])) {
                $customer->update(['password' => $validated['password']]);
            }

            if ($this->hasPrimaryAddressPayload($validated)) {
                $this->syncPrimaryAddress($customer, $validated);
            }
            if ($this->hasNpwpPayload($validated['npwp'] ?? null)) {
                $this->syncCustomerNpwp($customer, $validated['npwp']);
            }

            if (array_key_exists('package_id', $validated)) {
                $packageId = $validated['package_id'] !== null
                    ? (int) $validated['package_id']
                    : null;
                $customerDailyPairing = match ($packageId) {
                    1 => 15,
                    2 => 50,
                    3 => 100,
                    default => 0,
                };

                $customer->update([
                    'package_id' => $packageId,
                    'customer_daily_pairing' => $customerDailyPairing,
                ]);
            }

            if (array_key_exists('level', $validated)) {
                $customer->update(['level' => $validated['level']]);
            }

            // Update sponsor_id jika customer masih Prospek (status = 1)
            if ($request->exists('sponsor_id') && $customer->status === 1) {
                // Re-validate status from database to prevent race condition
                $freshCustomer = Customer::find($customer->id);
                if ($freshCustomer && $freshCustomer->status === 1) {
                    $newSponsorId = $request->integer('sponsor_id') ?: null;

                    // Update or create matrix position
                    if ($customer->matrixPosition) {
                        // Hitung level baru berdasarkan sponsor baru
                        $newLevel = 1;
                        if ($newSponsorId) {
                            $sponsorMatrix = \App\Models\Manage\CustomerNetworkMatrix::where('member_id', $newSponsorId)->first();
                            $newLevel = $sponsorMatrix ? $sponsorMatrix->level + 1 : 1;
                        }

                        $customer->matrixPosition->update([
                            'sponsor_id' => $newSponsorId,
                            'level' => $newLevel,
                        ]);
                    } elseif ($newSponsorId) {
                        // Create new matrix position if doesn't exist and sponsor is provided
                        \App\Models\Manage\CustomerNetworkMatrix::addToMatrix($customer->id, $newSponsorId);
                    }
                }
            }

            DB::commit();

            return redirect()
                ->route('customers.show', $customer)
                ->with('success', 'Data customer berhasil diperbarui');
        } catch (\Throwable $e) {
            DB::rollBack();

            return redirect()
                ->back()
                ->withInput()
                ->with('error', 'Gagal memperbarui customer: '.$e->getMessage());
        }
    }

    /**
     * Sinkronkan data NPWP customer dengan payload form admin.
     */
    private function syncCustomerNpwp(Customer $customer, array $npwp): void
    {
        $now = now();
        $actor = (string) (Auth::user()?->username ?? Auth::user()?->name ?? 'system');

        $payload = [
            'member_id' => $customer->id,
            'nama' => (string) ($npwp['nama'] ?? ''),
            'npwp' => (string) ($npwp['npwp'] ?? ''),
            'jk' => (int) ($npwp['jk'] ?? 0),
            'npwp_date' => (string) ($npwp['npwp_date'] ?? ''),
            'alamat' => (string) ($npwp['alamat'] ?? ''),
            'menikah' => (string) ($npwp['menikah'] ?? 'N'),
            'anak' => (string) ($npwp['anak'] ?? '0'),
            'kerja' => (string) ($npwp['kerja'] ?? 'N'),
            'office' => trim((string) ($npwp['office'] ?? '')) !== '' ? (string) $npwp['office'] : '-',
            'updated' => $now,
            'updatedby' => $actor,
        ];

        $existingId = DB::table('customer_npwp')
            ->where('member_id', $customer->id)
            ->orderByDesc('id')
            ->value('id');

        if ($existingId) {
            DB::table('customer_npwp')
                ->where('id', $existingId)
                ->update($payload);

            return;
        }

        DB::table('customer_npwp')->insert(array_merge($payload, [
            'created' => $now,
            'createdby' => $actor,
        ]));
    }

    private function mapNpwpGenderToForm(mixed $jk, ?string $fallbackGender): string
    {
        if ((int) $jk === 1) {
            return 'laki-laki';
        }

        if ((int) $jk === 2) {
            return 'perempuan';
        }

        $normalized = strtolower(trim((string) $fallbackGender));

        return match ($normalized) {
            'l', 'male', 'laki-laki' => 'laki-laki',
            'p', 'female', 'perempuan' => 'perempuan',
            default => '',
        };
    }

    private function mapMarriageStatusToForm(mixed $status): string
    {
        return strtoupper(trim((string) $status)) === 'Y' ? '1' : '0';
    }

    private function mapWorkStatusToForm(mixed $status): string
    {
        return strtoupper(trim((string) $status)) === 'Y' ? 'Karyawan' : 'Tidak Bekerja';
    }

    /**
     * Ambil daftar sponsor untuk field pencarian berdasarkan username.
     *
     * @return array<int, array{id:int,name:string,username:?string,email:?string,phone:?string,ewallet_id:?string}>
     */
    private function getSponsorOptions(?int $excludeCustomerId = null): array
    {
        return Customer::query()
            ->select(['id', 'name', 'username', 'email', 'phone', 'ewallet_id'])
            ->when($excludeCustomerId !== null, function ($query) use ($excludeCustomerId) {
                $query->where('id', '!=', $excludeCustomerId);
            })
            ->orderByRaw("CASE WHEN username IS NULL OR username = '' THEN 1 ELSE 0 END")
            ->orderBy('username')
            ->orderBy('name')
            ->get()
            ->map(function (Customer $customer) {
                return [
                    'id' => $customer->id,
                    'name' => $customer->name,
                    'username' => $customer->username,
                    'email' => $customer->email,
                    'phone' => $customer->phone,
                    'ewallet_id' => $customer->ewallet_id,
                ];
            })
            ->values()
            ->all();
    }

    /**
     * Cek apakah payload alamat utama cukup untuk disinkronkan.
     *
     * @param  array<string, mixed>  $validated
     */
    private function hasPrimaryAddressPayload(array $validated): bool
    {
        if (! array_key_exists('address', $validated) || ! array_key_exists('province_id', $validated) || ! array_key_exists('city_id', $validated)) {
            return false;
        }

        return trim((string) $validated['address']) !== ''
            && $validated['province_id'] !== null
            && $validated['city_id'] !== null;
    }

    /**
     * Cek apakah payload NPWP berisi data bermakna.
     */
    private function hasNpwpPayload(mixed $npwp): bool
    {
        if (! is_array($npwp)) {
            return false;
        }

        foreach (['nama', 'npwp', 'jk', 'npwp_date', 'alamat', 'office'] as $key) {
            if (! array_key_exists($key, $npwp)) {
                continue;
            }

            $value = $npwp[$key];
            if (is_string($value) && trim($value) !== '') {
                return true;
            }

            if (! is_string($value) && $value !== null && $value !== '') {
                return true;
            }
        }

        return false;
    }

    private function syncPrimaryAddress(Customer $customer, array $validated): void
    {
        $provinceId = (int) $validated['province_id'];
        $cityId = (int) $validated['city_id'];

        $addressPayload = [
            'label' => 'Utama',
            'recipient_name' => (string) $validated['name'],
            'recipient_phone' => (string) $validated['phone'],
            'address_line1' => (string) $validated['address'],
            'address_line2' => (string) $validated['alamat'],
            'province_label' => $this->resolveProvinceLabel($provinceId),
            'province_id' => $provinceId,
            'city_label' => $this->resolveCityLabel($provinceId, $cityId),
            'city_id' => $cityId,
            'postal_code' => null,
            'country' => 'Indonesia',
            'description' => (string) $validated['description'],
        ];

        $defaultAddress = $customer->addresses()->where('is_default', true)->first();
        if (! $defaultAddress) {
            $defaultAddress = $customer->addresses()->latest('id')->first();
        }

        if ($defaultAddress) {
            $defaultAddress->update(array_merge($addressPayload, ['is_default' => true]));
        } else {
            $defaultAddress = $customer->addresses()->create(array_merge($addressPayload, ['is_default' => true]));
        }

        $customer->addresses()
            ->where('id', '!=', $defaultAddress->id)
            ->update(['is_default' => false]);
    }

    private function resolveProvinceLabel(int $provinceId): string
    {
        try {
            $provinces = $this->rajaOngkirService->getProvinces();

            foreach ($provinces as $province) {
                if ((int) data_get($province, 'id') === $provinceId) {
                    return (string) data_get($province, 'name', "Provinsi {$provinceId}");
                }
            }
        } catch (\Throwable) {
            // Fallback ke label berbasis ID jika API tidak tersedia.
        }

        return "Provinsi {$provinceId}";
    }

    private function resolveCityLabel(int $provinceId, int $cityId): string
    {
        try {
            $cities = $this->rajaOngkirService->getCities($provinceId);

            foreach ($cities as $city) {
                if ((int) data_get($city, 'id') === $cityId) {
                    return (string) data_get($city, 'name', "Kota {$cityId}");
                }
            }
        } catch (\Throwable) {
            // Fallback ke label berbasis ID jika API tidak tersedia.
        }

        return "Kota {$cityId}";
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customer $customer)
    {
        try {
            $name = $customer->name;
            $customer->delete();

            return redirect()
                ->route('customers.index')
                ->with('success', "Customer {$name} berhasil dihapus");
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->with('error', 'Gagal menghapus customer: '.$e->getMessage());
        }
    }

    /**
     * Release all pending bonuses for customer
     */
    public function releaseBonuses(Customer $customer)
    {
        try {
            $results = $this->mlmService->releaseAllPendingBonuses($customer->id);

            return redirect()
                ->back()
                ->with('success', 'Bonus berhasil dirilis: Rp '.number_format($results['total_amount'], 0, ',', '.'));
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->with('error', 'Gagal release bonus: '.$e->getMessage());
        }
    }

    /**
     * Top up ewallet balance
     */
    public function topUp(Request $request, Customer $customer)
    {
        $request->validate([
            'amount' => ['required', 'numeric', 'min:10000'],
            'description' => ['nullable', 'string'],
        ]);

        try {
            $customer->addBalance(
                $request->amount,
                $request->input('description', 'Top up ewallet')
            );

            return redirect()
                ->back()
                ->with('success', 'Saldo berhasil ditambahkan: Rp '.number_format($request->amount, 0, ',', '.'));
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->with('error', 'Gagal top up: '.$e->getMessage());
        }
    }

    /**
     * Deduct ewallet balance
     */
    public function deduct(Request $request, Customer $customer)
    {
        $request->validate([
            'amount' => ['required', 'numeric', 'min:1000'],
            'description' => ['nullable', 'string'],
        ]);

        try {
            $customer->deductBalance(
                $request->amount,
                $request->input('description', 'Potongan saldo oleh admin'),
                'withdrawal'
            );

            return redirect()
                ->back()
                ->with('success', 'Saldo berhasil dikurangi: Rp '.number_format($request->amount, 0, ',', '.'));
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->with('error', 'Gagal deduct: '.$e->getMessage());
        }
    }

    /**
     * Get available position for placement
     */
    public function findPosition(Request $request): Response
    {
        $sponsorId = $request->integer('sponsor_id');

        // Find available position under this sponsor
        $position = $this->mlmService->findAvailablePosition($sponsorId);

        $suggestedPosition = null;
        if ($position) {
            $suggestedPosition = [
                'sponsor_id' => $sponsorId,
                'upline_id' => $position['upline_id'],
                'position' => $position['position'],
            ];
        }

        return Inertia::render('Admin/Customers/Create', [
            'sponsors' => $this->getSponsorOptions(),
            'suggestedPosition' => $suggestedPosition,
        ]);
    }

    /**
     * Validate placement position
     */
    public function validatePosition(Request $request)
    {
        $request->validate([
            'upline_id' => ['required', 'exists:customers,id'],
            'position' => ['required', 'in:left,right'],
        ]);

        $isValid = $this->mlmService->validatePlacement(
            $request->upline_id,
            $request->position
        );

        return response()->json([
            'success' => true,
            'valid' => $isValid,
            'message' => $isValid ? 'Posisi tersedia' : 'Posisi sudah terisi',
        ]);
    }

    /**
     * Login as customer without logging out from admin
     */
    public function loginAsCustomer(Request $request, Customer $customer)
    {
        try {
            // Store current admin session data
            $adminId = Auth::guard('web')->id();
            $adminName = Auth::guard('web')->user()->name;
            $adminRedirect = $request->headers->get('referer') ?? route('dashboard');

            // Login to client guard without logging out from web guard
            Auth::guard('client')->login($customer);

            // Store flag that this is an impersonation session
            session()->put('impersonating', [
                'admin_id' => $adminId,
                'admin_name' => $adminName,
                'admin_redirect' => $adminRedirect,
                'customer_id' => $customer->id,
                'customer_name' => $customer->name,
            ]);

            // Regenerate session to prevent CSRF issues
            session()->regenerate();

            return redirect('/beranda')->with('success', "Login sebagai {$customer->name}");
        } catch (\Exception $e) {
            \Log::error('Login as customer failed', [
                'customer_id' => $customer->id,
                'admin_id' => Auth::guard('web')->id(),
                'error' => $e->getMessage(),
            ]);

            return redirect()
                ->back()
                ->with('error', 'Gagal login sebagai customer: '.$e->getMessage());
        }
    }

    /**
     * Stop impersonating and return to admin
     */
    public function stopImpersonating()
    {
        try {
            // Get impersonation data
            $impersonating = session()->get('impersonating');
            if (! $impersonating) {
                return response()->json([
                    'success' => false,
                    'message' => 'Tidak ada sesi impersonating',
                ], 400);
            }

            $redirectTo = $impersonating['admin_redirect'] ?? route('dashboard');

            // Logout from client guard
            Auth::guard('client')->logout();

            // Clear impersonation flag
            session()->forget('impersonating');

            return response()->json([
                'success' => true,
                'message' => 'Kembali ke akun admin',
                'redirect' => $redirectTo,
            ]);
        } catch (\Exception $e) {
            \Log::error('Stop impersonating failed', [
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Gagal kembali ke akun admin: ' . $e->getMessage(),
            ], 500);
        }
    }
}
