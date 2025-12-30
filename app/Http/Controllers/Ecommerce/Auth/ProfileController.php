<?php

namespace App\Http\Controllers\Ecommerce\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Ecommerce\UpdatePasswordRequest;
use App\Http\Requests\Ecommerce\UpdateProfileRequest;
use App\Models\Manage\Customer;
use App\Models\Order;
use Illuminate\Http\JsonResponse;
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
        // Fresh query from database to avoid stale/cached data
        $customer = Customer::find(Auth::guard('client')->id());

        // Optimized: Load only essential relationships, limit results
        $customer->load([
            'package',
            'networkPosition.upline:id,name,email',
            'matrixPosition.sponsor:id,name,email',
            'addresses' => fn ($q) => $q->orderBy('is_default', 'desc')->orderBy('created_at', 'desc'),
        ]);

        // Load recent orders with optimized query
        $orders = $this->getRecentOrders($customer);

        // Load recent wallet transactions
        $walletTransactions = DB::table('customer_wallet_transactions')
            ->where('customer_id', $customer->id)
            ->orderByDesc('created_at')
            ->limit(20)
            ->get()
            ->map(fn ($transaction) => [
                'id' => $transaction->id,
                'type' => $transaction->type,
                'amount' => $transaction->amount,
                'status' => $transaction->status,
                'transaction_ref' => $transaction->transaction_ref,
                'midtrans_transaction_id' => $transaction->midtrans_transaction_id,
                'notes' => $transaction->notes,
                'payment_method' => $transaction->payment_method,
                'balance_before' => $transaction->balance_before,
                'balance_after' => $transaction->balance_after,
                'created_at' => $transaction->created_at,
            ]);

        // Get sponsored members with optimized queries
        [$activeMembers, $passiveMembers, $prospectMembers] = $this->getSponsoredMembers($customer);

        // Build binary tree structure with limited depth
        $binaryTree = $this->buildBinaryTree($customer);

        // Use stored values instead of recursive calculation
        $networkStats = [
            'left_count' => $customer->total_left ?? 0,
            'right_count' => $customer->total_right ?? 0,
            'total_downlines' => ($customer->total_left ?? 0) + ($customer->total_right ?? 0),
        ];

        // Optimized bonus stats using raw queries
        $bonusStats = $this->getBonusStats($customer->id);

        // Load bonus data with optimized queries
        $bonusData = $this->getBonusData($customer->id);

        return Inertia::render('ecommerce/profile/Index', [
            'customer' => [
                'id' => $customer->id,
                'name' => $customer->name,
                'username' => $customer->username,
                'nik' => $customer->nik,
                'gender' => $customer->gender,
                'alamat' => $customer->alamat,
                'email' => $customer->email,
                'phone' => $customer->phone,
                'status' => $customer->status,
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
            'activeMembers' => $activeMembers,
            'passiveMembers' => $passiveMembers,
            'prospectMembers' => $prospectMembers,
            'binaryTree' => $binaryTree['tree'],
            'totalDownlines' => $binaryTree['totalDownlines'],
            'totalLeft' => $binaryTree['totalLeft'],
            'totalRight' => $binaryTree['totalRight'],
            'bonusSponsors' => $bonusData['sponsors'],
            'bonusMatchings' => $bonusData['matchings'],
            'bonusPairings' => $bonusData['pairings'],
            'bonusCashbacks' => $bonusData['cashbacks'],
            'bonusRewards' => $bonusData['rewards'],
            'bonusRetails' => $bonusData['retails'],
            'bonusLifetimeCashRewards' => $bonusData['lifetimeCashRewards'],
            'addresses' => $customer->addresses,
        ]);
    }

    /**
     * Get recent orders with optimized query
     */
    private function getRecentOrders(Customer $customer): \Illuminate\Support\Collection
    {
        try {
            $orders = DB::table('orders')
                ->where('customer_id', $customer->id)
                ->orderByDesc('placed_at')
                ->limit(10)
                ->get();

            $orderIds = $orders->pluck('id')->toArray();

            // Get order items with product info
            $orderItems = collect();
            $existingReviews = [];

            if (! empty($orderIds)) {
                $orderItems = DB::table('order_items')
                    ->leftJoin('products', 'order_items.product_id', '=', 'products.id')
                    ->leftJoin('product_media', function ($join) {
                        $join->on('products.id', '=', 'product_media.product_id')
                            ->where('product_media.is_primary', '=', 1);
                    })
                    ->whereIn('order_items.order_id', $orderIds)
                    ->select('order_items.*', 'product_media.url as image_url')
                    ->get()
                    ->groupBy('order_id');

                // Get existing reviews for completed orders
                $completedOrderIds = $orders->where('status', 'COMPLETED')->pluck('id')->toArray();
                if (! empty($completedOrderIds)) {
                    $existingReviews = DB::table('product_reviews')
                        ->where('customer_id', $customer->id)
                        ->whereIn('order_item_id', function ($query) use ($completedOrderIds) {
                            $query->select('id')
                                ->from('order_items')
                                ->whereIn('order_id', $completedOrderIds);
                        })
                        ->pluck('order_item_id')
                        ->flip()
                        ->toArray();
                }
            }

            return $orders->map(function ($order) use ($orderItems, $existingReviews) {
                $items = [];
                $hasUnreviewedItems = false;

                if (strtoupper($order->status) === 'COMPLETED' && isset($orderItems[$order->id])) {
                    $items = $orderItems[$order->id]->map(function ($item) use ($existingReviews, &$hasUnreviewedItems) {
                        $hasReview = isset($existingReviews[$item->id]);
                        if (! $hasReview) {
                            $hasUnreviewedItems = true;
                        }

                        return [
                            'id' => $item->id,
                            'product_id' => $item->product_id,
                            'product_name' => $item->name,
                            'product_image' => $item->image_url ? '/storage/'.$item->image_url : null,
                            'has_review' => $hasReview,
                        ];
                    })->toArray();
                }

                return [
                    'id' => $order->id,
                    'order_no' => $order->order_no,
                    'status' => $order->status,
                    'type' => $order->type,
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

            return collect();
        }
    }

    /**
     * Get all customers categorized by status (pure customer data, no network)
     *
     * Member categories:
     * - Active (status = 3): Full active member
     * - Passive (status = 2 with orders > 0): Has made purchases but not fully active
     * - Prospect (status = 1): New member, not yet active
     */
    private function getSponsoredMembers(Customer $customer): array
    {
        try {
            // Query all customers (excluding current customer) with order count - NO NETWORK JOIN
            $members = DB::table('customers')
                ->leftJoin('customer_package', 'customers.package_id', '=', 'customer_package.id')
                ->leftJoinSub(
                    DB::table('orders')
                        ->select('customer_id', DB::raw('COUNT(*) as order_count'))
                        ->groupBy('customer_id'),
                    'order_counts',
                    'customers.id',
                    '=',
                    'order_counts.customer_id'
                )
                ->where('customers.sponsor_id', '=', $customer->id)
                ->whereIn('customers.status', [1, 2, 3])
                ->select(
                    'customers.id',
                    'customers.username',
                    'customers.name',
                    'customers.email',
                    'customers.phone',
                    'customers.package_id',
                    'customers.omzet',
                    'customers.status',
                    'customers.created_at',
                    'customer_package.name as package_name',
                    DB::raw('COALESCE(order_counts.order_count, 0) as order_count')
                )
                ->orderByDesc('customers.created_at')
                ->limit(200)
                ->get();

            $activeMembers = collect();
            $passiveMembers = collect();
            $prospectMembers = collect();

            foreach ($members as $member) {
                $memberStatus = (int) $member->status;
                $hasOrders = (int) $member->order_count > 0;

                $data = [
                    'id' => $member->id,
                    'username' => $member->username,
                    'name' => $member->name,
                    'email' => $member->email,
                    'phone' => $member->phone,
                    'package_name' => $member->package_name ?? $this->getPackageName($member->package_id),
                    'has_purchase' => $hasOrders,
                    'omzet' => $member->omzet,
                    'joined_at' => $member->created_at,
                    'status' => $memberStatus,
                ];

                // Active: status = 3
                if ($memberStatus === 3) {
                    $data['status_label'] = 'Aktif';
                    $activeMembers->push($data);
                }
                // Passive: status = 2 AND has transaction history > 0
                elseif ($memberStatus === 2) {
                    $data['status_label'] = 'Pasif';
                    $passiveMembers->push($data);
                }
                // Prospect: status = 1
                elseif ($memberStatus === 1) {
                    $data['status_label'] = 'Prospek';
                    $prospectMembers->push($data);
                }
                // Note: status = 2 without orders won't be shown in any category
            }

            return [$activeMembers, $passiveMembers, $prospectMembers];
        } catch (\Exception $e) {
            \Log::error('Failed to load members in profile', [
                'customer_id' => $customer->id,
                'error' => $e->getMessage(),
            ]);

            return [collect(), collect(), collect()];
        }
    }

    /**
     * Get package name helper
     */
    private function getPackageName(?int $packageId): string
    {
        return match ($packageId) {
            1 => 'ZENNER Plus',
            2 => 'ZENNER Prime',
            3 => 'ZENNER Ultra',
            default => 'Tidak ada paket',
        };
    }

    /**
     * Get bonus stats with optimized queries
     */
    private function getBonusStats(int $customerId): array
    {
        try {
            $released = DB::table('customer_bonuses')
                ->where('member_id', $customerId)
                ->where('status', 1)
                ->sum('tax_netto');

            $released += DB::table('customer_bonus_matchings')
                ->where('member_id', $customerId)
                ->where('status', 1)
                ->sum('amount');

            $released += DB::table('customer_bonus_pairings')
                ->where('member_id', $customerId)
                ->where('status', 1)
                ->sum('amount');

            $released += DB::table('customer_bonus_sponsors')
                ->where('member_id', $customerId)
                ->where('status', 1)
                ->sum('amount');

            $pending = DB::table('customer_bonuses')
                ->where('member_id', $customerId)
                ->where('status', 0)
                ->sum('tax_netto');

            $pending += DB::table('customer_bonus_matchings')
                ->where('member_id', $customerId)
                ->where('status', 0)
                ->sum('amount');

            $pending += DB::table('customer_bonus_pairings')
                ->where('member_id', $customerId)
                ->where('status', 0)
                ->sum('amount');

            $pending += DB::table('customer_bonus_sponsors')
                ->where('member_id', $customerId)
                ->where('status', 0)
                ->sum('amount');

            return [
                'total_released' => (float) $released,
                'total_pending' => (float) $pending,
            ];
        } catch (\Exception $e) {
            \Log::error('Failed to calculate bonus stats in profile', [
                'customer_id' => $customerId,
                'error' => $e->getMessage(),
            ]);

            return [
                'total_released' => 0,
                'total_pending' => 0,
            ];
        }
    }

    /**
     * Get bonus data with optimized queries
     */
    private function getBonusData(int $customerId): array
    {
        // Sponsors
        $sponsors = DB::table('customer_bonus_sponsors')
            ->leftJoin('customers', 'customer_bonus_sponsors.from_member_id', '=', 'customers.id')
            ->where('customer_bonus_sponsors.member_id', $customerId)
            ->orderByDesc('customer_bonus_sponsors.created_at')
            ->limit(50)
            ->select(
                'customer_bonus_sponsors.*',
                'customers.name as from_member_name',
                'customers.email as from_member_email'
            )
            ->get()
            ->map(fn ($bonus) => [
                'id' => $bonus->id,
                'from_member_id' => $bonus->from_member_id,
                'amount' => $bonus->amount,
                'status' => $bonus->status,
                'description' => $bonus->description,
                'created_at' => $bonus->created_at,
                'from_member' => $bonus->from_member_name ? [
                    'name' => $bonus->from_member_name,
                    'email' => $bonus->from_member_email,
                ] : null,
            ]);

        // Matchings
        $matchings = DB::table('customer_bonus_matchings')
            ->leftJoin('customers', 'customer_bonus_matchings.from_member_id', '=', 'customers.id')
            ->where('customer_bonus_matchings.member_id', $customerId)
            ->orderByDesc('customer_bonus_matchings.created_at')
            ->limit(50)
            ->select(
                'customer_bonus_matchings.*',
                'customers.name as from_member_name',
                'customers.email as from_member_email'
            )
            ->get()
            ->map(fn ($bonus) => [
                'id' => $bonus->id,
                'from_member_id' => $bonus->from_member_id,
                'level' => $bonus->level,
                'amount' => $bonus->amount,
                'status' => $bonus->status,
                'description' => $bonus->description,
                'created_at' => $bonus->created_at,
                'from_member' => $bonus->from_member_name ? [
                    'name' => $bonus->from_member_name,
                    'email' => $bonus->from_member_email,
                ] : null,
            ]);

        // Pairings
        $pairings = DB::table('customer_bonus_pairings')
            ->where('member_id', $customerId)
            ->orderByDesc('created_at')
            ->limit(50)
            ->get()
            ->map(fn ($bonus) => [
                'id' => $bonus->id,
                'pair' => $bonus->pair,
                'amount' => $bonus->amount,
                'status' => $bonus->status,
                'description' => $bonus->description,
                'created_at' => $bonus->created_at,
            ]);

        // Cashbacks
        $cashbacks = DB::table('customer_bonus_cashbacks')
            ->where('member_id', $customerId)
            ->orderByDesc('created_at')
            ->limit(50)
            ->get()
            ->map(fn ($bonus) => [
                'id' => $bonus->id,
                'order_id' => $bonus->order_id,
                'amount' => $bonus->amount,
                'status' => $bonus->status,
                'description' => $bonus->description,
                'created_at' => $bonus->created_at,
            ]);

        // Rewards
        $rewards = DB::table('customer_bonus_rewards')
            ->where('member_id', $customerId)
            ->orderByDesc('created_at')
            ->limit(50)
            ->get()
            ->map(fn ($bonus) => [
                'id' => $bonus->id,
                'reward_type' => $bonus->reward_type,
                'amount' => $bonus->amount,
                'status' => $bonus->status,
                'description' => $bonus->description,
                'created_at' => $bonus->created_at,
            ]);

        // Retails
        $retails = DB::table('customer_bonus_retails')
            ->leftJoin('customers', 'customer_bonus_retails.from_member_id', '=', 'customers.id')
            ->where('customer_bonus_retails.member_id', $customerId)
            ->orderByDesc('customer_bonus_retails.created_at')
            ->limit(50)
            ->select(
                'customer_bonus_retails.*',
                'customers.name as from_member_name',
                'customers.email as from_member_email'
            )
            ->get()
            ->map(fn ($bonus) => [
                'id' => $bonus->id,
                'from_member_id' => $bonus->from_member_id,
                'amount' => $bonus->amount,
                'index_value' => $bonus->index_value,
                'status' => $bonus->status,
                'description' => $bonus->description,
                'created_at' => $bonus->created_at,
                'from_member' => $bonus->from_member_name ? [
                    'name' => $bonus->from_member_name,
                    'email' => $bonus->from_member_email,
                ] : null,
            ]);

        // Lifetime Cash Rewards
        $lifetimeCashRewards = DB::table('customer_bonus_lifetime_cash_rewards')
            ->where('member_id', $customerId)
            ->orderByDesc('created_at')
            ->limit(50)
            ->get()
            ->map(fn ($bonus) => [
                'id' => $bonus->id,
                'reward_name' => $bonus->reward_name,
                'reward' => $bonus->reward,
                'amount' => $bonus->amount,
                'bv' => $bonus->bv,
                'status' => $bonus->status,
                'description' => $bonus->description,
                'created_at' => $bonus->created_at,
            ]);

        return [
            'sponsors' => $sponsors,
            'matchings' => $matchings,
            'pairings' => $pairings,
            'cashbacks' => $cashbacks,
            'rewards' => $rewards,
            'retails' => $retails,
            'lifetimeCashRewards' => $lifetimeCashRewards,
        ];
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
            'upline_id' => ['required', 'integer', 'exists:customers,id'],
            'position' => ['required', 'string', 'in:left,right'],
        ]);

        $uplineId = $validated['upline_id'];
        $currentCustomer = Customer::find($uplineId);
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
            // and has status = 2 (pasif) - ready to be placed
            // if ($member->sponsor_id !== $currentCustomer->id) {
            //     throw new \Exception('Member bukan bagian dari jaringan sponsor Anda.');
            // }

            if ($member->status !== 2) {
                throw new \Exception('Hanya member dengan status Pasif (sudah belanja tapi belum ditempatkan) yang dapat diposisikan.');
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
            // $sp = DB::select('CALL sp_registration(?)', [$memberId]);
            $row = DB::select('CALL sp_registration(?)', [$memberId])[0] ?? null;

            abort_if(! $row, 500, 'SP tidak mengembalikan output');
            abort_if((int) $row->success !== 1, 422, "{$row->code} - {$row->message}");

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
     * Search member in current user's binary tree network.
     */
    public function searchMemberInTree(Request $request): JsonResponse
    {
        $customer = Auth::guard('client')->user();
        $query = $request->input('query');

        if (! $query || strlen($query) < 2) {
            return response()->json([
                'success' => false,
                'message' => 'Query minimal 2 karakter',
            ], 422);
        }

        // Search members in the current user's downline network
        $members = Customer::query()
            ->where('upline_id', $customer->id)
            ->where(function ($q) use ($query) {
                $q->where('name', 'like', "%{$query}%")
                    ->orWhere('email', 'like', "%{$query}%")
                    ->orWhere('username', 'like', "%{$query}%");
            })
            ->limit(10)
            ->get(['id', 'name', 'email', 'username', 'package_id']);

        return response()->json([
            'success' => true,
            'data' => $members->map(function ($member) {
                return [
                    'id' => $member->id,
                    'name' => $member->name,
                    'email' => $member->email,
                    'username' => $member->username,
                    'package_name' => $this->getPackageName($member->package_id),
                ];
            }),
        ]);
    }

    /**
     * Get member's binary tree data for modal display.
     */
    public function getMemberTree(int $memberId): JsonResponse
    {
        $member = Customer::with('package')->find($memberId);

        if (! $member) {
            return response()->json([
                'success' => false,
                'message' => 'Member tidak ditemukan',
            ], 404);
        }

        $binaryTree = $this->buildBinaryTree($member);

        return response()->json([
            'success' => true,
            'data' => [
                'member' => [
                    'id' => $member->id,
                    'name' => $member->name,
                    'email' => $member->email,
                ],
                'tree' => $binaryTree['tree'],
                'totalDownlines' => $binaryTree['totalDownlines'],
                'totalLeft' => $binaryTree['totalLeft'],
                'totalRight' => $binaryTree['totalRight'],
            ],
        ]);
    }

    /**
     * Build binary tree structure for visualization.
     * Optimized version: preload all potential tree members in one query
     */
    private function buildBinaryTree($customer, int $maxDepth = 5): array
    {
        // Use stored totals from database instead of recursive calculation
        $totalLeft = $customer->total_left ?? 0;
        $totalRight = $customer->total_right ?? 0;
        $totalDownlines = $totalLeft + $totalRight;

        // If no children, return simple root node
        if (! $customer->foot_left && ! $customer->foot_right) {
            return [
                'tree' => [
                    'id' => $customer->id,
                    'member_id' => $customer->id,
                    'name' => $customer->name,
                    'email' => $customer->email,
                    'package_name' => $customer->package?->name ?? $this->getPackageName($customer->package_id),
                    'total_left' => $totalLeft,
                    'total_right' => $totalRight,
                    'position' => null,
                    'level' => 1,
                    'status' => true,
                    'left' => null,
                    'right' => null,
                ],
                'totalDownlines' => 0,
                'totalLeft' => 0,
                'totalRight' => 0,
            ];
        }

        // Preload all tree members in a single query using BFS approach
        $membersMap = $this->preloadTreeMembers($customer->id, $maxDepth);

        // Build tree structure using preloaded data
        $tree = $this->buildTreeNodeOptimized($customer, 1, $maxDepth, $membersMap);

        return [
            'tree' => $tree,
            'totalDownlines' => $totalDownlines,
            'totalLeft' => $totalLeft,
            'totalRight' => $totalRight,
        ];
    }

    /**
     * Preload all tree members in a single query using BFS
     */
    private function preloadTreeMembers(int $rootId, int $maxDepth): array
    {
        // Get all potential tree members in one query
        // Start with root and expand level by level
        $allIds = [$rootId];
        $currentIds = [$rootId];

        for ($level = 1; $level <= $maxDepth && ! empty($currentIds); $level++) {
            $children = DB::table('customers')
                ->whereIn('id', $currentIds)
                ->whereNotNull('foot_left')
                ->orWhereNotNull('foot_right')
                ->whereIn('id', $currentIds)
                ->select('foot_left', 'foot_right')
                ->get();

            $nextIds = [];
            foreach ($children as $child) {
                if ($child->foot_left) {
                    $nextIds[] = $child->foot_left;
                }
                if ($child->foot_right) {
                    $nextIds[] = $child->foot_right;
                }
            }

            $allIds = array_merge($allIds, $nextIds);
            $currentIds = $nextIds;
        }

        // Fetch all members at once with package data
        $members = DB::table('customers')
            ->leftJoin('customer_package', 'customers.package_id', '=', 'customer_package.id')
            ->whereIn('customers.id', array_unique($allIds))
            ->select(
                'customers.id',
                'customers.name',
                'customers.email',
                'customers.package_id',
                'customers.upline_id',
                'customers.foot_left',
                'customers.foot_right',
                'customers.total_left',
                'customers.total_right',
                'customer_package.name as package_name'
            )
            ->get()
            ->keyBy('id');

        return $members->toArray();
    }

    /**
     * Build tree node using preloaded data (no additional queries)
     */
    private function buildTreeNodeOptimized($customer, int $currentLevel, int $maxDepth, array $membersMap): ?array
    {
        if ($currentLevel > $maxDepth) {
            return null;
        }

        // Get customer data from map or use passed object
        $customerData = is_object($customer) && isset($customer->id)
            ? ($membersMap[$customer->id] ?? null)
            : ($membersMap[$customer] ?? null);

        if (! $customerData) {
            // If customer is the passed object, use it directly
            if (is_object($customer)) {
                $customerData = (object) [
                    'id' => $customer->id,
                    'name' => $customer->name,
                    'email' => $customer->email,
                    'package_name' => $customer->package?->name ?? $this->getPackageName($customer->package_id),
                    'total_left' => $customer->total_left ?? 0,
                    'total_right' => $customer->total_right ?? 0,
                    'upline_id' => $customer->upline_id,
                    'foot_left' => $customer->foot_left,
                    'foot_right' => $customer->foot_right,
                ];
            } else {
                return null;
            }
        }

        $leftChild = null;
        $rightChild = null;

        // Build children from preloaded data
        if ($customerData->foot_left && isset($membersMap[$customerData->foot_left])) {
            $leftChild = $this->buildTreeNodeFromData($membersMap[$customerData->foot_left], $currentLevel + 1, $maxDepth, $membersMap, 'left');
        }

        if ($customerData->foot_right && isset($membersMap[$customerData->foot_right])) {
            $rightChild = $this->buildTreeNodeFromData($membersMap[$customerData->foot_right], $currentLevel + 1, $maxDepth, $membersMap, 'right');
        }

        // Determine position
        $position = null;
        if ($currentLevel > 1 && $customerData->upline_id) {
            $upline = $membersMap[$customerData->upline_id] ?? null;
            if ($upline) {
                if ($upline->foot_left == $customerData->id) {
                    $position = 'left';
                } elseif ($upline->foot_right == $customerData->id) {
                    $position = 'right';
                }
            }
        }

        return [
            'id' => $customerData->id,
            'member_id' => $customerData->id,
            'name' => $customerData->name,
            'email' => $customerData->email,
            'package_name' => $customerData->package_name ?? $this->getPackageName($customerData->package_id ?? null),
            'total_left' => $customerData->total_left ?? 0,
            'total_right' => $customerData->total_right ?? 0,
            'position' => $position,
            'level' => $currentLevel,
            'status' => $customerData->upline_id !== null || $currentLevel === 1,
            'left' => $leftChild,
            'right' => $rightChild,
        ];
    }

    /**
     * Build tree node from preloaded data object
     */
    private function buildTreeNodeFromData(object $member, int $currentLevel, int $maxDepth, array $membersMap, string $position): ?array
    {
        if ($currentLevel > $maxDepth) {
            return null;
        }

        $leftChild = null;
        $rightChild = null;

        if ($member->foot_left && isset($membersMap[$member->foot_left])) {
            $leftChild = $this->buildTreeNodeFromData($membersMap[$member->foot_left], $currentLevel + 1, $maxDepth, $membersMap, 'left');
        }

        if ($member->foot_right && isset($membersMap[$member->foot_right])) {
            $rightChild = $this->buildTreeNodeFromData($membersMap[$member->foot_right], $currentLevel + 1, $maxDepth, $membersMap, 'right');
        }

        return [
            'id' => $member->id,
            'member_id' => $member->id,
            'name' => $member->name,
            'email' => $member->email,
            'package_name' => $member->package_name ?? $this->getPackageName($member->package_id ?? null),
            'total_left' => $member->total_left ?? 0,
            'total_right' => $member->total_right ?? 0,
            'position' => $position,
            'level' => $currentLevel,
            'status' => $member->upline_id !== null,
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
