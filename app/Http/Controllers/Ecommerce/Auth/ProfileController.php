<?php

namespace App\Http\Controllers\Ecommerce\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Ecommerce\UpdatePasswordRequest;
use App\Http\Requests\Ecommerce\UpdateProfileRequest;
use App\Models\Manage\Customer;
use App\Models\Order;
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
            'bonusRetails' => fn ($q) => $q->with('fromMember:id,name,email')->latest()->limit(50),
            'bonusLifetimeCashRewards' => fn ($q) => $q->latest()->limit(50),
        ]);

        // Load recent orders with error handling
        try {
            $orders = $customer->orders()
                ->with(['items.product.media'])
                ->latest('placed_at')
                ->limit(10)
                ->get()
                ->map(function ($order) use ($customer) {
                    // Check if order is completed and has items that haven't been reviewed
                    $hasUnreviewedItems = false;
                    $items = [];

                    if (strtoupper($order->status) === 'COMPLETED') {
                        $items = $order->items->map(function ($item) use ($customer) {
                            $hasReview = \App\Models\ProductReview::where('order_item_id', $item->id)
                                ->where('customer_id', $customer->id)
                                ->exists();

                            $imageUrl = null;
                            if ($item->product && $item->product->primaryImage) {
                                $imageUrl = '/storage/'.$item->product->primaryImage->url;
                            }

                            return [
                                'id' => $item->id,
                                'product_id' => $item->product_id,
                                'product_name' => $item->name,
                                'product_image' => $imageUrl,
                                'has_review' => $hasReview,
                            ];
                        })->toArray();

                        $hasUnreviewedItems = collect($items)->contains('has_review', false);
                    }

                    return [
                        'id' => $order->id,
                        'order_no' => $order->order_no,
                        'status' => $order->status,
                        'subtotal_amount' => $order->subtotal_amount,
                        'grand_total' => $order->grand_total,
                        'placed_at' => $order->placed_at,
                        'paid_at' => $order->paid_at,
                        'items' => $items,
                        'has_unreviewed_items' => $hasUnreviewedItems,
                    ];
                });
        } catch (\Exception $e) {
            \Log::error('Failed to load orders in profile', [
                'customer_id' => $customer->id,
                'error' => $e->getMessage(),
            ]);
            $orders = collect();
        }

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

        // Get all members where current customer is the sponsor (based on sponsor_id)
        // Logic based on upline_id and omzet:
        // - Aktif: sponsor_id = [current] AND upline_id IS NOT NULL AND omzet > 0
        // - Pasif: sponsor_id = [current] AND upline_id IS NULL AND omzet > 0
        // - Prospek: sponsor_id = [current] AND upline_id IS NULL AND omzet = 0

        try {
            // Active Members: sudah ditempatkan (upline_id not null) dan sudah ada omzet
            $activeMembers = Customer::where('sponsor_id', $customer->id)
                ->whereNotNull('upline_id')
                ->where('omzet', '>', 0)
                ->with(['orders' => fn ($q) => $q->limit(1), 'networkPosition'])
                ->limit(50)
                ->get()
                ->map(fn ($member) => [
                    'id' => $member->id,
                    'name' => $member->name,
                    'email' => $member->email,
                    'phone' => $member->phone,
                    'position' => $member->networkPosition?->position,
                    'level' => $member->networkPosition?->level,
                    'has_placement' => $member->networkPosition !== null,
                    'has_purchase' => $member->orders->isNotEmpty(),
                    'omzet' => $member->omzet,
                    'status' => 3,
                    'status_label' => 'Aktif',
                    'joined_at' => $member->created_at,
                ])
                ->values();

            // Passive Members: belum ditempatkan (upline_id null) tapi sudah ada omzet
            $passiveMembers = Customer::where('sponsor_id', $customer->id)
                ->whereNull('upline_id')
                ->where('omzet', '>', 0)
                ->with(['orders' => fn ($q) => $q->limit(1), 'networkPosition'])
                ->limit(50)
                ->get()
                ->map(fn ($member) => [
                    'id' => $member->id,
                    'name' => $member->name,
                    'email' => $member->email,
                    'phone' => $member->phone,
                    'position' => $member->networkPosition?->position,
                    'level' => $member->networkPosition?->level,
                    'has_placement' => $member->networkPosition !== null,
                    'has_purchase' => $member->orders->isNotEmpty(),
                    'omzet' => $member->omzet,
                    'status' => 2,
                    'status_label' => 'Pasif',
                    'joined_at' => $member->created_at,
                ])
                ->values();

            // Prospect Members: belum ditempatkan (upline_id null) dan belum ada omzet
            $prospectMembers = Customer::where('sponsor_id', $customer->id)
                ->whereNull('upline_id')
                ->where('omzet', '=', 0)
                ->with(['orders' => fn ($q) => $q->limit(1), 'networkPosition'])
                ->limit(50)
                ->get()
                ->map(fn ($member) => [
                    'id' => $member->id,
                    'name' => $member->name,
                    'email' => $member->email,
                    'phone' => $member->phone,
                    'position' => $member->networkPosition?->position,
                    'level' => $member->networkPosition?->level,
                    'has_placement' => $member->networkPosition !== null,
                    'has_purchase' => $member->orders->isNotEmpty(),
                    'omzet' => $member->omzet,
                    'status' => 1,
                    'status_label' => 'Prospek',
                    'joined_at' => $member->created_at,
                ])
                ->values();
        } catch (\Exception $e) {
            \Log::error('Failed to load network members in profile', [
                'customer_id' => $customer->id,
                'error' => $e->getMessage(),
            ]);
            $activeMembers = collect();
            $passiveMembers = collect();
            $prospectMembers = collect();
        }

        // Build binary tree structure with error handling
        try {
            $binaryTree = $this->buildBinaryTree($customer);
        } catch (\Exception $e) {
            \Log::error('Failed to build binary tree in profile', [
                'customer_id' => $customer->id,
                'error' => $e->getMessage(),
            ]);
            $binaryTree = [
                'tree' => null,
                'totalDownlines' => 0,
                'totalLeft' => 0,
                'totalRight' => 0,
            ];
        }

        // Calculate network stats with error handling
        try {
            $networkStats = [
                'left_count' => $customer->countLeftNetwork(),
                'right_count' => $customer->countRightNetwork(),
                'total_downlines' => count($customer->getAllDownlines()),
            ];
        } catch (\Exception $e) {
            \Log::error('Failed to calculate network stats in profile', [
                'customer_id' => $customer->id,
                'error' => $e->getMessage(),
            ]);
            $networkStats = [
                'left_count' => 0,
                'right_count' => 0,
                'total_downlines' => 0,
            ];
        }

        // Calculate bonus stats with error handling
        try {
            $bonusStats = [
                'total_released' => $customer->getTotalReleasedBonus(),
                'total_pending' => $customer->getTotalPendingBonus(),
            ];
        } catch (\Exception $e) {
            \Log::error('Failed to calculate bonus stats in profile', [
                'customer_id' => $customer->id,
                'error' => $e->getMessage(),
            ]);
            $bonusStats = [
                'total_released' => 0,
                'total_pending' => 0,
            ];
        }

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
                'network_stats' => $networkStats,
                'bonus_stats' => $bonusStats,
            ],
            'orders' => $orders,
            'walletTransactions' => $walletTransactions,
            'activeMembers' => $activeMembers, // Status 3: Member aktif yang sudah ditempatkan
            'passiveMembers' => $passiveMembers, // Status 2: Member pasif
            'prospectMembers' => $prospectMembers, // Status 1: Member prospek - siap untuk placement
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
            'bonusRetails' => $customer->bonusRetails->map(fn ($bonus) => [
                'id' => $bonus->id,
                'from_member_id' => $bonus->from_member_id,
                'amount' => $bonus->amount,
                'index_value' => $bonus->index_value,
                'status' => $bonus->status,
                'description' => $bonus->description,
                'created_at' => $bonus->created_at,
                'from_member' => $bonus->fromMember ? [
                    'name' => $bonus->fromMember->name,
                    'email' => $bonus->fromMember->email,
                ] : null,
            ]),
            'bonusLifetimeCashRewards' => $customer->bonusLifetimeCashRewards->map(fn ($bonus) => [
                'id' => $bonus->id,
                'reward_name' => $bonus->reward_name,
                'reward' => $bonus->reward,
                'amount' => $bonus->amount,
                'bv' => $bonus->bv,
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

        $currentCustomer = Auth::guard('client')->user();
        $memberId = $validated['member_id'];
        $position = $validated['position'];

        DB::beginTransaction();

        try {
            // Get member to be placed
            $member = Customer::find($memberId);
            if (! $member) {
                throw new \Exception('Member tidak ditemukan.');
            }

            // Check if member already has placement
            if ($member->upline_id !== null) {
                throw new \Exception('Member sudah ditempatkan di binary tree.');
            }

            // Verify member is sponsored by current customer (sponsor_id = current customer's id)
            // and has status = 1 (prospek) - ready to be placed
            if ($member->sponsor_id !== $currentCustomer->id) {
                throw new \Exception('Member bukan bagian dari jaringan sponsor Anda.');
            }

            if ($member->status !== 1) {
                throw new \Exception('Hanya member dengan status Prospek (belum ditempatkan) yang dapat diposisikan.');
            }

            // Check if member has purchase/order (passive member requirement)
            // Status 'paid' or 'completed' indicates successful purchase
            $hasPurchase = Order::where('customer_id', $memberId)
                ->whereIn('status', ['paid', 'completed'])
                ->exists();

            if (! $hasPurchase) {
                throw new \Exception('Member harus melakukan pembelian terlebih dahulu sebelum ditempatkan.');
            }

            // Validate position availability at current customer's position
            $positionField = $position === 'left' ? 'foot_left' : 'foot_right';
            if ($currentCustomer->$positionField !== null) {
                throw new \Exception("Posisi {$position} Anda sudah terisi. Silakan pilih posisi lain.");
            }

            // Step 1: Update member's upline_id and position
            $member->update([
                'upline_id' => $currentCustomer->id,
                'position' => $position,
                'status' => 3,
            ]);

            // Step 2: Update current customer's foot_left or foot_right
            $currentCustomer->update([
                $positionField => $memberId,
            ]);

            // Step 3: Call stored procedure to update networks and matrix
            DB::statement('CALL sp_register(?)', [$memberId]);

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
        // Check if customer has foot_left or foot_right
        if (! $customer->foot_left && ! $customer->foot_right) {
            return [
                'tree' => null,
                'totalDownlines' => 0,
                'totalLeft' => 0,
                'totalRight' => 0,
            ];
        }

        // Calculate totals by traversing the tree
        $totalLeft = $this->countTreeNodes($customer->foot_left, $maxDepth);
        $totalRight = $this->countTreeNodes($customer->foot_right, $maxDepth);
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
     * Count total nodes in a subtree.
     */
    private function countTreeNodes(?int $customerId, int $maxDepth, int $currentLevel = 1): int
    {
        if (! $customerId || $currentLevel > $maxDepth) {
            return 0;
        }

        $customer = Customer::find($customerId);
        if (! $customer) {
            return 0;
        }

        $count = 1; // Count current node
        $count += $this->countTreeNodes($customer->foot_left, $maxDepth, $currentLevel + 1);
        $count += $this->countTreeNodes($customer->foot_right, $maxDepth, $currentLevel + 1);

        return $count;
    }

    /**
     * Recursively build tree node using foot_left and foot_right.
     */
    private function buildTreeNode($customer, int $currentLevel, int $maxDepth): ?array
    {
        if ($currentLevel > $maxDepth || ! $customer) {
            return null;
        }

        $leftChild = null;
        $rightChild = null;

        // Build left child (foot_left)
        if ($customer->foot_left) {
            $leftCustomer = Customer::find($customer->foot_left);
            if ($leftCustomer) {
                $leftChild = $this->buildTreeNode($leftCustomer, $currentLevel + 1, $maxDepth);
            }
        }

        // Build right child (foot_right)
        if ($customer->foot_right) {
            $rightCustomer = Customer::find($customer->foot_right);
            if ($rightCustomer) {
                $rightChild = $this->buildTreeNode($rightCustomer, $currentLevel + 1, $maxDepth);
            }
        }

        // Determine position based on relationship with parent
        $position = null;
        if ($currentLevel > 1) {
            // Try to determine position by checking upline
            if ($customer->upline_id) {
                $upline = Customer::find($customer->upline_id);
                if ($upline) {
                    if ($upline->foot_left == $customer->id) {
                        $position = 'left';
                    } elseif ($upline->foot_right == $customer->id) {
                        $position = 'right';
                    }
                }
            }
        }

        return [
            'id' => $customer->id,
            'member_id' => $customer->id,
            'name' => $customer->name,
            'email' => $customer->email,
            'position' => $position,
            'level' => $currentLevel,
            'status' => $customer->upline_id !== null, // true if placed in tree
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
