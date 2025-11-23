<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PaymentMethod;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentMethodManagementController extends Controller
{
    public function index()
    {
        $paymentMethods = PaymentMethod::all();

        $statistics = [
            'total_methods' => PaymentMethod::count(),
            'total_active' => PaymentMethod::where('is_active', true)->count(),
            'total_inactive' => PaymentMethod::where('is_active', false)->count(),
        ];

        return Inertia::render('Admin/PaymentMethods/Index', [
            'paymentMethods' => $paymentMethods,
            'statistics' => $statistics,
        ]);
    }

    public function update(Request $request, PaymentMethod $paymentMethod)
    {
        $validated = $request->validate([
            'name' => 'required|max:255',
            'is_active' => 'boolean',
        ]);

        $paymentMethod->update($validated);

        return back()->with('success', 'Metode pembayaran berhasil diperbarui');
    }
}
