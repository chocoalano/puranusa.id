<?php

namespace App\Http\Controllers\Ecommerce\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Ecommerce\UpdatePasswordRequest;
use App\Http\Requests\Ecommerce\UpdateProfileRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display customer profile page.
     */
    public function index(): Response
    {
        $customer = Auth::guard('client')->user();

        $customer->load([
            'networkPosition.upline',
            'matrixPosition.sponsor',
            'bonuses' => fn ($q) => $q->latest()->limit(5),
            'bonusMatchings' => fn ($q) => $q->latest()->limit(5),
            'bonusPairings' => fn ($q) => $q->latest()->limit(5),
            'bonusSponsors' => fn ($q) => $q->latest()->limit(5),
        ]);

        // Load recent orders
        $orders = $customer->orders()
            ->latest('placed_at')
            ->limit(10)
            ->get()
            ->map(fn ($order) => [
                'id' => $order->id,
                'order_no' => $order->order_no,
                'status' => $order->status,
                'subtotal_amount' => $order->subtotal_amount,
                'grand_total' => $order->grand_total,
                'placed_at' => $order->placed_at,
                'paid_at' => $order->paid_at,
            ]);

        // Load recent wallet transactions
        $walletTransactions = $customer->walletTransactions()
            ->latest()
            ->limit(10)
            ->get()
            ->map(fn ($transaction) => [
                'id' => $transaction->id,
                'type' => $transaction->type,
                'amount' => $transaction->amount,
                'status' => $transaction->status,
                'transaction_ref' => $transaction->transaction_ref,
                'midtrans_transaction_id' => $transaction->midtrans_transaction_id,
                'created_at' => $transaction->created_at,
            ]);

        // Get all downlines from matrix (sponsored members)
        $allDownlines = $customer->matrixDownlines()
            ->with(['member.orders', 'member.networkPosition'])
            ->get()
            ->pluck('member')
            ->filter(); // Remove null values

        // Active Members: sudah ditempatkan di binary tree
        $activeMembers = $allDownlines->filter(fn ($member) => $member->networkPosition !== null)
            ->map(fn ($member) => [
                'id' => $member->id,
                'name' => $member->name,
                'email' => $member->email,
                'phone' => $member->phone,
                'position' => $member->networkPosition?->position,
                'level' => $member->networkPosition?->level,
                'has_placement' => true,
                'has_purchase' => $member->orders->isNotEmpty(),
                'joined_at' => $member->created_at,
            ])
            ->values();

        // Passive Members: sudah ada pembelian tapi belum masuk binary tree
        $passiveMembers = $allDownlines->filter(function ($member) {
            return $member->networkPosition === null && $member->orders->isNotEmpty();
        })
            ->map(fn ($member) => [
                'id' => $member->id,
                'name' => $member->name,
                'email' => $member->email,
                'phone' => $member->phone,
                'position' => null,
                'level' => null,
                'has_placement' => false,
                'has_purchase' => true,
                'joined_at' => $member->created_at,
            ])
            ->values();

        // Prospect Members: baru mendaftar dan sudah ada pembelian
        $prospectMembers = $allDownlines->filter(function ($member) {
            $isNewMember = $member->created_at->diffInDays(now()) <= 30;
            $hasPurchase = $member->orders->isNotEmpty();

            return $isNewMember && $hasPurchase && $member->networkPosition === null;
        })
            ->map(fn ($member) => [
                'id' => $member->id,
                'name' => $member->name,
                'email' => $member->email,
                'phone' => $member->phone,
                'position' => null,
                'level' => null,
                'has_placement' => false,
                'has_purchase' => true,
                'joined_at' => $member->created_at,
            ])
            ->values();

        return Inertia::render('ecommerce/profile/Index', [
            'customer' => [
                'id' => $customer->id,
                'name' => $customer->name,
                'email' => $customer->email,
                'phone' => $customer->phone,
                'ewallet_id' => $customer->ewallet_id,
                'ewallet_saldo' => $customer->ewallet_saldo,
                'description' => $customer->description,
                'email_verified_at' => $customer->email_verified_at,
                'created_at' => $customer->created_at,
                'upline' => $customer->networkPosition?->upline ? [
                    'id' => $customer->networkPosition->upline->id,
                    'name' => $customer->networkPosition->upline->name,
                    'email' => $customer->networkPosition->upline->email,
                ] : null,
                'sponsor' => $customer->matrixPosition?->sponsor ? [
                    'id' => $customer->matrixPosition->sponsor->id,
                    'name' => $customer->matrixPosition->sponsor->name,
                    'email' => $customer->matrixPosition->sponsor->email,
                ] : null,
                'network_stats' => [
                    'left_count' => $customer->countLeftNetwork(),
                    'right_count' => $customer->countRightNetwork(),
                    'total_downlines' => count($customer->getAllDownlines()),
                ],
                'bonus_stats' => [
                    'total_released' => $customer->getTotalReleasedBonus(),
                    'total_pending' => $customer->getTotalPendingBonus(),
                ],
            ],
            'orders' => $orders,
            'walletTransactions' => $walletTransactions,
            'activeMembers' => $activeMembers,
            'passiveMembers' => $passiveMembers,
            'prospectMembers' => $prospectMembers,
        ]);
    }

    /**
     * Update customer profile information.
     */
    public function update(UpdateProfileRequest $request): RedirectResponse
    {
        $customer = Auth::guard('client')->user();

        $customer->update($request->validated());

        return redirect()->back()->with('success', 'Profile berhasil diperbarui!');
    }

    /**
     * Update customer password.
     */
    public function updatePassword(UpdatePasswordRequest $request): RedirectResponse
    {
        $customer = Auth::guard('client')->user();

        // Verify current password
        if (! Hash::check($request->current_password, $customer->password)) {
            throw ValidationException::withMessages([
                'current_password' => 'Password saat ini tidak sesuai.',
            ]);
        }

        $customer->update([
            'password' => Hash::make($request->password),
        ]);

        return redirect()->back()->with('success', 'Password berhasil diperbarui!');
    }

    /**
     * Delete customer account.
     */
    public function destroy(): RedirectResponse
    {
        $customer = Auth::guard('client')->user();

        Auth::guard('client')->logout();

        $customer->delete();

        request()->session()->invalidate();
        request()->session()->regenerateToken();

        return redirect()->route('client.login')->with('success', 'Akun berhasil dihapus.');
    }
}
