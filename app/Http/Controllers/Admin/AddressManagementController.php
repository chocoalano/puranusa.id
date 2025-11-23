<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CustomerAddress;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AddressManagementController extends Controller
{
    public function index(Request $request)
    {
        $addresses = CustomerAddress::query()
            ->with('customer')
            ->when($request->search, function ($query, $search) {
                $query->whereHas('customer', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                })->orWhere('recipient_name', 'like', "%{$search}%")
                    ->orWhere('city_label', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(15)
            ->withQueryString();

        $statistics = [
            'total_addresses' => CustomerAddress::count(),
            'total_default' => CustomerAddress::where('is_default', true)->count(),
            'total_customers' => CustomerAddress::distinct('customer_id')->count('customer_id'),
        ];

        return Inertia::render('Admin/Addresses/Index', [
            'addresses' => $addresses,
            'statistics' => $statistics,
            'filters' => $request->only(['search']),
        ]);
    }

    public function destroy(CustomerAddress $address)
    {
        $address->delete();

        return back()->with('success', 'Alamat berhasil dihapus');
    }
}
