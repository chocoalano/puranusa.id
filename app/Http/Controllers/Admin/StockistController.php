<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Manage\Customer;
use App\Services\RajaOngkirService;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class StockistController extends Controller
{
    public function __construct(
        protected RajaOngkirService $rajaOngkirService
    ) {}

    /**
     * Display a listing of stockists.
     */
    public function index(Request $request): Response
    {
        $query = Customer::query()
            ->where('is_stockist', true);

        // Search
        if ($search = $request->get('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%")
                    ->orWhere('ewallet_id', 'like', "%{$search}%")
                    ->orWhere('stockist_kabupaten_name', 'like', "%{$search}%");
            });
        }

        // Filter by kabupaten
        if ($kabupatenId = $request->get('kabupaten_id')) {
            $query->where('stockist_kabupaten_id', $kabupatenId);
        }

        // Sorting
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        $stockists = $query->paginate($request->integer('per_page', 10))
            ->through(function ($customer) {
                return [
                    'id' => $customer->id,
                    'name' => $customer->name,
                    'email' => $customer->email,
                    'phone' => $customer->phone,
                    'ewallet_id' => $customer->ewallet_id,
                    'stockist_kabupaten_id' => $customer->stockist_kabupaten_id,
                    'stockist_kabupaten_name' => $customer->stockist_kabupaten_name,
                    'stockist_province_id' => $customer->stockist_province_id,
                    'stockist_province_name' => $customer->stockist_province_name,
                    'status' => $customer->status,
                    'created_at' => $customer->created_at?->format('Y-m-d H:i:s'),
                ];
            });

        // Get provinces for filter dropdown
        $provinces = $this->rajaOngkirService->getProvinces();

        return Inertia::render('Admin/Stockists/Index', [
            'stockists' => $stockists,
            'filters' => $request->only(['search', 'kabupaten_id', 'province_id', 'sort_by', 'sort_order', 'per_page']),
            'provinces' => $provinces,
        ]);
    }

    /**
     * Show the form for creating a new stockist.
     */
    public function create(Request $request): Response
    {
        // Get all active customers that are NOT already stockists
        $customers = Customer::query()
            ->where('status', 1) // Only active customers
            ->where('is_stockist', false)
            ->select('id', 'name', 'ewallet_id', 'email', 'phone')
            ->orderBy('name')
            ->get()
            ->map(function ($customer) {
                return [
                    'id' => $customer->id,
                    'name' => $customer->name,
                    'ewallet_id' => $customer->ewallet_id,
                    'email' => $customer->email,
                    'phone' => $customer->phone,
                ];
            });

        // Get already assigned kabupaten IDs (for validation info)
        $assignedKabupaten = Customer::query()
            ->where('is_stockist', true)
            ->whereNotNull('stockist_kabupaten_id')
            ->pluck('stockist_kabupaten_id')
            ->map(fn ($id) => (int) $id)
            ->toArray();

        // Get provinces for dropdown
        $provinces = $this->rajaOngkirService->getProvinces();

        return Inertia::render('Admin/Stockists/Create', [
            'customers' => $customers,
            'provinces' => $provinces,
            'assignedKabupaten' => $assignedKabupaten,
        ]);
    }

    /**
     * Store a newly created stockist.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_id' => [
                'required',
                'exists:customers,id',
                Rule::unique('customers', 'id')
                    ->where(function ($query) {
                        return $query->where('is_stockist', true);
                    }),
            ],
            'stockist_kabupaten_id' => [
                'required',
                'integer',
                Rule::unique('customers', 'stockist_kabupaten_id')
                    ->where(function ($query) {
                        return $query->where('is_stockist', true);
                    }),
            ],
            'stockist_kabupaten_name' => ['required', 'string', 'max:255'],
            'stockist_province_id' => ['required', 'integer'],
            'stockist_province_name' => ['required', 'string', 'max:255'],
        ], [
            'customer_id.required' => 'Pilih pelanggan yang akan dijadikan stokist.',
            'customer_id.exists' => 'Pelanggan tidak ditemukan.',
            'customer_id.unique' => 'Pelanggan ini sudah menjadi stokist.',
            'stockist_kabupaten_id.required' => 'Pilih kota untuk stokist.',
            'stockist_kabupaten_id.unique' => 'Kota ini sudah memiliki stokist.',
            'stockist_kabupaten_name.required' => 'Nama kota diperlukan.',
            'stockist_province_id.required' => 'Pilih provinsi.',
            'stockist_province_name.required' => 'Nama provinsi diperlukan.',
        ]);

        try {
            $customer = Customer::findOrFail($validated['customer_id']);

            $customer->update([
                'is_stockist' => true,
                'stockist_kabupaten_id' => $validated['stockist_kabupaten_id'],
                'stockist_kabupaten_name' => $validated['stockist_kabupaten_name'],
                'stockist_province_id' => $validated['stockist_province_id'],
                'stockist_province_name' => $validated['stockist_province_name'],
            ]);

            return redirect()
                ->route('admin.stockists.index')
                ->with('success', "Pelanggan {$customer->name} berhasil dijadikan stokist untuk {$validated['stockist_kabupaten_name']}.");
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->withInput()
                ->with('error', 'Gagal menambahkan stokist: '.$e->getMessage());
        }
    }

    /**
     * Show the form for editing the stockist.
     */
    public function edit(Customer $stockist): Response
    {
        // Ensure this is a stockist
        if (! $stockist->is_stockist) {
            abort(404, 'Stokist tidak ditemukan.');
        }

        // Get already assigned kabupaten IDs except current stockist
        $assignedKabupaten = Customer::query()
            ->where('is_stockist', true)
            ->where('id', '!=', $stockist->id)
            ->whereNotNull('stockist_kabupaten_id')
            ->pluck('stockist_kabupaten_id')
            ->map(fn ($id) => (int) $id)
            ->toArray();

        // Get provinces for dropdown
        $provinces = $this->rajaOngkirService->getProvinces();

        return Inertia::render('Admin/Stockists/Edit', [
            'stockist' => [
                'id' => $stockist->id,
                'name' => $stockist->name,
                'email' => $stockist->email,
                'phone' => $stockist->phone,
                'ewallet_id' => $stockist->ewallet_id,
                'stockist_kabupaten_id' => $stockist->stockist_kabupaten_id,
                'stockist_kabupaten_name' => $stockist->stockist_kabupaten_name,
                'stockist_province_id' => $stockist->stockist_province_id,
                'stockist_province_name' => $stockist->stockist_province_name,
            ],
            'provinces' => $provinces,
            'assignedKabupaten' => $assignedKabupaten,
        ]);
    }

    /**
     * Update the specified stockist.
     */
    public function update(Request $request, Customer $stockist)
    {
        // Ensure this is a stockist
        if (! $stockist->is_stockist) {
            abort(404, 'Stokist tidak ditemukan.');
        }

        $validated = $request->validate([
            'stockist_kabupaten_id' => [
                'required',
                'integer',
                Rule::unique('customers', 'stockist_kabupaten_id')
                    ->where(function ($query) {
                        return $query->where('is_stockist', true);
                    })
                    ->ignore($stockist->id),
            ],
            'stockist_kabupaten_name' => ['required', 'string', 'max:255'],
            'stockist_province_id' => ['required', 'integer'],
            'stockist_province_name' => ['required', 'string', 'max:255'],
        ], [
            'stockist_kabupaten_id.required' => 'Pilih kota untuk stokist.',
            'stockist_kabupaten_id.unique' => 'Kota ini sudah memiliki stokist lain.',
            'stockist_kabupaten_name.required' => 'Nama kota diperlukan.',
            'stockist_province_id.required' => 'Pilih provinsi.',
            'stockist_province_name.required' => 'Nama provinsi diperlukan.',
        ]);

        try {
            $stockist->update([
                'stockist_kabupaten_id' => $validated['stockist_kabupaten_id'],
                'stockist_kabupaten_name' => $validated['stockist_kabupaten_name'],
                'stockist_province_id' => $validated['stockist_province_id'],
                'stockist_province_name' => $validated['stockist_province_name'],
            ]);

            return redirect()
                ->route('admin.stockists.index')
                ->with('success', "Kabupaten stokist {$stockist->name} berhasil diperbarui.");
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->withInput()
                ->with('error', 'Gagal memperbarui stokist: '.$e->getMessage());
        }
    }

    /**
     * Remove stockist status from the customer.
     */
    public function destroy(Customer $stockist)
    {
        // Ensure this is a stockist
        if (! $stockist->is_stockist) {
            abort(404, 'Stokist tidak ditemukan.');
        }

        try {
            $stockist->update([
                'is_stockist' => false,
                'stockist_kabupaten_id' => null,
                'stockist_kabupaten_name' => null,
                'stockist_province_id' => null,
                'stockist_province_name' => null,
            ]);

            return redirect()
                ->route('admin.stockists.index')
                ->with('success', "Status stokist {$stockist->name} berhasil dihapus.");
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->with('error', 'Gagal menghapus status stokist: '.$e->getMessage());
        }
    }

    /**
     * Get cities by province (API endpoint for frontend)
     */
    public function getCities(Request $request)
    {
        $provinceId = $request->get('province_id');

        if (! $provinceId) {
            return response()->json([]);
        }

        $cities = $this->rajaOngkirService->getCities((int) $provinceId);

        return response()->json($cities);
    }
}
