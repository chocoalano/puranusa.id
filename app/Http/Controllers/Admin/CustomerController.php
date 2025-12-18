<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Manage\StoreCustomerRequest;
use App\Http\Requests\Manage\UpdateCustomerRequest;
use App\Models\Manage\Customer;
use App\Services\MLMService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class CustomerController extends Controller
{
    public function __construct(
        protected MLMService $mlmService
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $query = Customer::query()
            ->with(['networkPosition', 'matrixPosition']);

        // Search
        if ($search = $request->get('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
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
        if ($request->has('email_verified')) {
            if ($request->boolean('email_verified')) {
                $query->whereNotNull('email_verified_at');
            } else {
                $query->whereNull('email_verified_at');
            }
        }

        // Sorting
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        $customers = $query->paginate($request->integer('per_page', 10))
            ->through(function ($customer) {
                return [
                    'id' => $customer->id,
                    'name' => $customer->name,
                    'email' => $customer->email,
                    'phone' => $customer->phone,
                    'ewallet_id' => $customer->ewallet_id,
                    'ewallet_saldo' => $customer->ewallet_saldo,
                    'email_verified_at' => $customer->email_verified_at?->format('Y-m-d H:i:s'),
                    'created_at' => $customer->created_at->format('Y-m-d H:i:s'),
                    'sponsor_id' => $customer->matrixPosition?->sponsor_id,
                    'upline_id' => $customer->networkPosition?->upline_id,
                    'position' => $customer->networkPosition?->position,
                    'status' => $customer->status,
                ];
            });

        return Inertia::render('Admin/Customers/Index', [
            'customers' => $customers,
            'filters' => $request->only(['search', 'sponsor_id', 'upline_id', 'email_verified', 'sort_by', 'sort_order', 'per_page']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        // Get all customers for sponsor/upline selection
        $customers = Customer::select('id', 'name', 'ewallet_id')
            ->orderBy('name')
            ->get()
            ->map(function ($customer) {
                return [
                    'id' => $customer->id,
                    'name' => $customer->name,
                    'ewallet_id' => $customer->ewallet_id,
                ];
            });

        return Inertia::render('Admin/Customers/Create', [
            'customers' => $customers,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCustomerRequest $request)
    {
        try {
            // Generate ewallet_id
            $ewalletId = Customer::generateEwalletId();

            // Create customer with status only (no binary tree placement)
            $customer = Customer::create([
                'name' => $request->name,
                'username' => $request->username,
                'email' => $request->email,
                'phone' => $request->phone,
                'password' => bcrypt($request->password),
                'description' => $request->description,
                'sponsor_id' => $request->sponsor_id,
                'status' => $request->status,
                'ewallet_id' => $ewalletId,
                'ref_code' => strtoupper(substr(md5(uniqid()), 0, 8)),
            ]);

            return redirect()
                ->route('customers.show', $customer)
                ->with('success', 'Customer berhasil ditambahkan dengan Ewallet ID: '.$customer->ewallet_id);
        } catch (\Exception $e) {
            // dd($e->getMessage());
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
                    'created_at' => $bonus->created_at->format('Y-m-d H:i:s'),
                ];
            }),
            'matching' => $customer->bonusMatchings()->latest()->limit(5)->get()->map(function ($bonus) {
                return [
                    'id' => $bonus->id,
                    'amount' => $bonus->amount,
                    'description' => $bonus->description,
                    'status' => $bonus->status,
                    'released_at' => $bonus->released_at?->format('Y-m-d H:i:s'),
                    'created_at' => $bonus->created_at->format('Y-m-d H:i:s'),
                ];
            }),
            'pairing' => $customer->bonusPairings()->latest()->limit(5)->get()->map(function ($bonus) {
                return [
                    'id' => $bonus->id,
                    'amount' => $bonus->amount,
                    'description' => $bonus->description,
                    'status' => $bonus->status,
                    'released_at' => $bonus->released_at?->format('Y-m-d H:i:s'),
                    'created_at' => $bonus->created_at->format('Y-m-d H:i:s'),
                ];
            }),
            'sponsor' => $customer->bonusSponsors()->latest()->limit(5)->get()->map(function ($bonus) {
                return [
                    'id' => $bonus->id,
                    'amount' => $bonus->amount,
                    'description' => $bonus->description,
                    'status' => $bonus->status,
                    'released_at' => $bonus->released_at?->format('Y-m-d H:i:s'),
                    'created_at' => $bonus->created_at->format('Y-m-d H:i:s'),
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
                'created_at' => $customer->created_at->format('Y-m-d H:i:s'),
                'updated_at' => $customer->updated_at->format('Y-m-d H:i:s'),
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
        $customer->load(['networkPosition.upline', 'matrixPosition.sponsor']);

        return Inertia::render('Admin/Customers/Edit', [
            'customer' => [
                'id' => $customer->id,
                'name' => $customer->name,
                'username' => $customer->username,
                'email' => $customer->email,
                'phone' => $customer->phone,
                'ewallet_id' => $customer->ewallet_id,
                'ewallet_saldo' => $customer->ewallet_saldo,
                'email_verified_at' => $customer->email_verified_at?->format('Y-m-d H:i:s'),
                'description' => $customer->description,
                'sponsor_id' => $customer->matrixPosition?->sponsor_id,
                'sponsor_name' => $customer->matrixPosition?->sponsor?->name,
                'upline_id' => $customer->networkPosition?->upline_id,
                'upline_name' => $customer->networkPosition?->upline?->name,
                'position' => $customer->networkPosition?->position,
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCustomerRequest $request, Customer $customer)
    {
        try {
            $customer->update($request->only(['name', 'username', 'email', 'phone', 'description']));

            if ($request->filled('password')) {
                $customer->update(['password' => $request->password]);
            }

            return redirect()
                ->route('customers.show', $customer)
                ->with('success', 'Data customer berhasil diperbarui');
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->withInput()
                ->with('error', 'Gagal memperbarui customer: '.$e->getMessage());
        }
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
                $request->input('description', 'Deduct ewallet')
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

        // Get all customers for the form
        $customers = Customer::select('id', 'name', 'ewallet_id')
            ->orderBy('name')
            ->get()
            ->map(function ($customer) {
                return [
                    'id' => $customer->id,
                    'name' => $customer->name,
                    'ewallet_id' => $customer->ewallet_id,
                ];
            });

        $suggestedPosition = null;
        if ($position) {
            $suggestedPosition = [
                'sponsor_id' => $sponsorId,
                'upline_id' => $position['upline_id'],
                'position' => $position['position'],
            ];
        }

        return Inertia::render('Admin/Customers/Create', [
            'customers' => $customers,
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
    public function loginAsCustomer(Customer $customer)
    {
        try {
            // Store current admin session data
            $adminId = Auth::guard('web')->id();
            $adminName = Auth::guard('web')->user()->name;

            // Login to client guard without logging out from web guard
            Auth::guard('client')->login($customer);

            // Store flag that this is an impersonation session
            session()->put('impersonating', [
                'admin_id' => $adminId,
                'admin_name' => $adminName,
                'customer_id' => $customer->id,
                'customer_name' => $customer->name,
            ]);

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
                return redirect()->route('dashboard');
            }

            // Logout from client guard
            Auth::guard('client')->logout();

            // Clear impersonation flag
            session()->forget('impersonating');

            return redirect()
                ->route('customers.index')
                ->with('success', 'Kembali ke akun admin');
        } catch (\Exception $e) {
            \Log::error('Stop impersonating failed', [
                'error' => $e->getMessage(),
            ]);

            return redirect()
                ->route('dashboard')
                ->with('error', 'Gagal kembali ke akun admin: '.$e->getMessage());
        }
    }
}
