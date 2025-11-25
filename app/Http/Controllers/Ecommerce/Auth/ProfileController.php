<?php

namespace App\Http\Controllers\Ecommerce\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Ecommerce\UpdatePasswordRequest;
use App\Http\Requests\Ecommerce\UpdateProfileRequest;
use App\Models\Manage\Customer;
use App\Models\Manage\CustomerNetwork;
use App\Models\Manage\CustomerNetworkMatrix;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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
            'addresses' => fn ($q) => $q->orderBy('is_default', 'desc')->orderBy('created_at', 'desc'),
            'bonuses' => fn ($q) => $q->latest()->limit(5),
            'bonusMatchings' => fn ($q) => $q->with('fromMember:id,name,email')->latest()->limit(50),
            'bonusPairings' => fn ($q) => $q->latest()->limit(50),
            'bonusSponsors' => fn ($q) => $q->with('fromMember:id,name,email')->latest()->limit(50),
            'bonusCashbacks' => fn ($q) => $q->latest()->limit(50),
            'bonusRewards' => fn ($q) => $q->latest()->limit(50),
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

        // Passive Members: sudah register dengan ref_code tapi belum masuk binary tree
        // Ini adalah member yang sponsor-nya adalah customer ini
        $passiveMembers = $allDownlines->filter(function ($member) {
            return $member->networkPosition === null;
        })
            ->map(fn ($member) => [
                'id' => $member->id,
                'name' => $member->name,
                'email' => $member->email,
                'phone' => $member->phone,
                'position' => null,
                'level' => null,
                'has_placement' => false,
                'has_purchase' => $member->orders->isNotEmpty(),
                'joined_at' => $member->created_at,
            ])
            ->values();

        // Prospect Members: baru mendaftar dalam 30 hari dan belum masuk binary tree
        $prospectMembers = $allDownlines->filter(function ($member) {
            $isNewMember = $member->created_at->diffInDays(now()) <= 30;

            return $isNewMember && $member->networkPosition === null;
        })
            ->map(fn ($member) => [
                'id' => $member->id,
                'name' => $member->name,
                'email' => $member->email,
                'phone' => $member->phone,
                'position' => null,
                'level' => null,
                'has_placement' => false,
                'has_purchase' => $member->orders->isNotEmpty(),
                'joined_at' => $member->created_at,
            ])
            ->values();

        // Build binary tree structure
        $binaryTree = $this->buildBinaryTree($customer);

        return Inertia::render('ecommerce/profile/Index', [
            'customer' => [
                'id' => $customer->id,
                'name' => $customer->name,
                'email' => $customer->email,
                'phone' => $customer->phone,
                'ref_code' => $customer->ref_code,
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
            'binaryTree' => $binaryTree['tree'],
            'totalDownlines' => $binaryTree['totalDownlines'],
            'totalLeft' => $binaryTree['totalLeft'],
            'totalRight' => $binaryTree['totalRight'],
            'bonusSponsors' => $customer->bonusSponsors->map(fn ($bonus) => [
                'id' => $bonus->id,
                'from_member_id' => $bonus->from_member_id,
                'amount' => $bonus->amount,
                'status' => $bonus->status,
                'description' => $bonus->description,
                'created_at' => $bonus->created_at,
                'from_member' => $bonus->fromMember ? [
                    'name' => $bonus->fromMember->name,
                    'email' => $bonus->fromMember->email,
                ] : null,
            ]),
            'bonusMatchings' => $customer->bonusMatchings->map(fn ($bonus) => [
                'id' => $bonus->id,
                'from_member_id' => $bonus->from_member_id,
                'level' => $bonus->level,
                'amount' => $bonus->amount,
                'status' => $bonus->status,
                'description' => $bonus->description,
                'created_at' => $bonus->created_at,
                'from_member' => $bonus->fromMember ? [
                    'name' => $bonus->fromMember->name,
                    'email' => $bonus->fromMember->email,
                ] : null,
            ]),
            'bonusPairings' => $customer->bonusPairings->map(fn ($bonus) => [
                'id' => $bonus->id,
                'pair' => $bonus->pair,
                'amount' => $bonus->amount,
                'status' => $bonus->status,
                'description' => $bonus->description,
                'created_at' => $bonus->created_at,
            ]),
            'bonusCashbacks' => $customer->bonusCashbacks->map(fn ($bonus) => [
                'id' => $bonus->id,
                'order_id' => $bonus->order_id,
                'amount' => $bonus->amount,
                'status' => $bonus->status,
                'description' => $bonus->description,
                'created_at' => $bonus->created_at,
            ]),
            'bonusRewards' => $customer->bonusRewards->map(fn ($bonus) => [
                'id' => $bonus->id,
                'reward_type' => $bonus->reward_type,
                'amount' => $bonus->amount,
                'status' => $bonus->status,
                'description' => $bonus->description,
                'created_at' => $bonus->created_at,
            ]),
            'addresses' => $customer->addresses,
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

        // Logout from both guards
        Auth::guard('client')->logout();
        Auth::guard('web')->logout();

        // Delete customer
        $customer->delete();

        // Clear session completely
        request()->session()->invalidate();
        request()->session()->regenerateToken();
        request()->session()->forget('auth');

        return redirect()->route('client.login')->with('success', 'Akun berhasil dihapus.');
    }

    /**
     * Place passive member to binary tree.
     */
    public function placeMember(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'member_id' => ['required', 'integer', 'exists:customers,id'],
            'position' => ['required', 'string', 'in:left,right'],
        ]);

        $sponsor = Auth::guard('client')->user();
        $memberId = $validated['member_id'];
        $position = $validated['position'];

        DB::beginTransaction();

        try {
            // Verify member is in sponsor's downline
            $member = Customer::find($memberId);
            if (! $member) {
                throw new \Exception('Member tidak ditemukan.');
            }

            // Check if member already placed
            if ($member->networkPosition !== null) {
                throw new \Exception('Member sudah ditempatkan di binary tree.');
            }

            // Verify member is in sponsor's matrix downlines
            $isInMatrix = CustomerNetworkMatrix::where('member_id', $memberId)
                ->where('sponsor_id', $sponsor->id)
                ->exists();

            if (! $isInMatrix) {
                throw new \Exception('Member bukan bagian dari jaringan Anda.');
            }

            // Validate position availability
            if (! CustomerNetwork::validatePlacement($sponsor->id, $position)) {
                throw new \Exception("Posisi {$position} sudah terisi. Silakan pilih posisi lain.");
            }

            // Place member to binary tree
            CustomerNetwork::create([
                'member_id' => $memberId,
                'upline_id' => $sponsor->id,
                'position' => $position,
                'level' => ($sponsor->networkPosition?->level ?? 0) + 1,
                'status' => true,
            ]);

            DB::commit();

            return redirect()->back()->with('success', "Member {$member->name} berhasil ditempatkan di posisi {$position}!");
        } catch (\Exception $e) {
            DB::rollBack();

            return redirect()->back()->withErrors([
                'error' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Build binary tree structure for visualization.
     */
    private function buildBinaryTree($customer, int $maxDepth = 15): array
    {
        // Get customer's network position
        $networkPosition = CustomerNetwork::where('member_id', $customer->id)
            ->with('member')
            ->first();

        if (! $networkPosition) {
            return [
                'tree' => null,
                'totalDownlines' => 0,
                'totalLeft' => 0,
                'totalRight' => 0,
            ];
        }

        // Calculate totals
        $totalLeft = $customer->countLeftNetwork();
        $totalRight = $customer->countRightNetwork();
        $totalDownlines = $totalLeft + $totalRight;

        // Build tree structure recursively
        $tree = $this->buildTreeNode($customer, 1, $maxDepth);

        return [
            'tree' => $tree,
            'totalDownlines' => $totalDownlines,
            'totalLeft' => $totalLeft,
            'totalRight' => $totalRight,
        ];
    }

    /**
     * Recursively build tree node.
     */
    private function buildTreeNode($customer, int $currentLevel, int $maxDepth): ?array
    {
        if ($currentLevel > $maxDepth || ! $customer) {
            return null;
        }

        // Get network position info
        $networkPosition = CustomerNetwork::where('member_id', $customer->id)->first();

        if (! $networkPosition) {
            return null;
        }

        // Get left and right downlines
        $leftNetwork = CustomerNetwork::where('upline_id', $customer->id)
            ->where('position', 'left')
            ->with('member')
            ->first();

        $rightNetwork = CustomerNetwork::where('upline_id', $customer->id)
            ->where('position', 'right')
            ->with('member')
            ->first();

        $leftChild = null;
        $rightChild = null;

        // Build left child
        if ($leftNetwork && $leftNetwork->member) {
            $leftChild = $this->buildTreeNode($leftNetwork->member, $currentLevel + 1, $maxDepth);
        }

        // Build right child
        if ($rightNetwork && $rightNetwork->member) {
            $rightChild = $this->buildTreeNode($rightNetwork->member, $currentLevel + 1, $maxDepth);
        }

        return [
            'id' => $networkPosition->id,
            'member_id' => $customer->id,
            'name' => $customer->name,
            'email' => $customer->email,
            'position' => $networkPosition->position,
            'level' => $networkPosition->level,
            'status' => $networkPosition->status,
            'left' => $leftChild,
            'right' => $rightChild,
        ];
    }

    /**
     * Store a new address.
     */
    public function storeAddress(Request $request): RedirectResponse
    {
        $customer = Auth::guard('client')->user();

        $validated = $request->validate([
            'label' => 'nullable|string|max:255',
            'is_default' => 'boolean',
            'recipient_name' => 'required|string|max:255',
            'recipient_phone' => 'required|string|max:20',
            'address_line1' => 'required|string',
            'address_line2' => 'nullable|string',
            'province_label' => 'required|string|max:100',
            'province_id' => 'required|integer',
            'city_label' => 'required|string|max:100',
            'city_id' => 'required|integer',
            'postal_code' => 'nullable|string|max:10',
            'country' => 'string|max:100',
            'description' => 'nullable|string',
        ]);

        // If this address is set as default, unset other default addresses
        if ($validated['is_default'] ?? false) {
            $customer->addresses()->update(['is_default' => false]);
        }

        $customer->addresses()->create($validated);

        return redirect()->back()->with('success', 'Alamat berhasil ditambahkan');
    }

    /**
     * Update an existing address.
     */
    public function updateAddress(Request $request, int $addressId): RedirectResponse
    {
        $customer = Auth::guard('client')->user();

        $address = $customer->addresses()->findOrFail($addressId);

        $validated = $request->validate([
            'label' => 'nullable|string|max:255',
            'is_default' => 'boolean',
            'recipient_name' => 'required|string|max:255',
            'recipient_phone' => 'required|string|max:20',
            'address_line1' => 'required|string',
            'address_line2' => 'nullable|string',
            'province_label' => 'required|string|max:100',
            'province_id' => 'required|integer',
            'city_label' => 'required|string|max:100',
            'city_id' => 'required|integer',
            'postal_code' => 'nullable|string|max:10',
            'country' => 'string|max:100',
            'description' => 'nullable|string',
        ]);

        // If this address is set as default, unset other default addresses
        if ($validated['is_default'] ?? false) {
            $customer->addresses()->where('id', '!=', $addressId)->update(['is_default' => false]);
        }

        $address->update($validated);

        return redirect()->back()->with('success', 'Alamat berhasil diperbarui');
    }

    /**
     * Delete an address.
     */
    public function deleteAddress(int $addressId): RedirectResponse
    {
        $customer = Auth::guard('client')->user();

        $address = $customer->addresses()->findOrFail($addressId);

        $address->delete();

        return redirect()->back()->with('success', 'Alamat berhasil dihapus');
    }

    /**
     * Set an address as default.
     */
    public function setDefaultAddress(int $addressId): RedirectResponse
    {
        $customer = Auth::guard('client')->user();

        $address = $customer->addresses()->findOrFail($addressId);

        // Unset all other default addresses
        $customer->addresses()->update(['is_default' => false]);

        // Set this address as default
        $address->update(['is_default' => true]);

        return redirect()->back()->with('success', 'Alamat utama berhasil diubah');
    }
}
