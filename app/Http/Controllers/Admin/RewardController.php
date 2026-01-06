<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CustomerBvReward;
use App\Models\Manage\CustomerBonusReward;
use App\Models\Reward;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RewardController extends Controller
{
    /**
     * Display Promotions Rewards (type = 0 - periode)
     */
    public function promotions(Request $request)
    {
        $now = now();

        $rewards = Reward::query()
            ->where('type', 0) // Promotions = periode
            ->when($request->search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('code', 'like', "%{$search}%");
            })
            ->when($request->status !== null && $request->status !== 'all', function ($query) use ($request) {
                $query->where('status', $request->status);
            })
            ->orderBy($request->input('sort_by', 'created_at'), $request->input('sort_order', 'desc'))
            ->paginate(15)
            ->withQueryString();

        $statistics = [
            'total_active' => Reward::where('type', 0)
                ->where('status', 1)
                ->where('start', '<=', $now)
                ->where('end', '>=', $now)
                ->count(),
            'total_scheduled' => Reward::where('type', 0)
                ->where('status', 1)
                ->where('start', '>', $now)
                ->count(),
            'total_expired' => Reward::where('type', 0)
                ->where('end', '<', $now)
                ->count(),
            'total_inactive' => Reward::where('type', 0)
                ->where('status', 0)
                ->count(),
        ];

        return Inertia::render('Admin/Rewards/Promotions/Index', [
            'rewards' => $rewards,
            'statistics' => $statistics,
            'filters' => [
                'search' => $request->search,
                'status' => $request->status,
                'sort_by' => $request->input('sort_by', 'created_at'),
                'sort_order' => $request->input('sort_order', 'desc'),
            ],
        ]);
    }

    /**
     * Show form to create Promotions Reward
     */
    public function createPromotion()
    {
        return Inertia::render('Admin/Rewards/Promotions/Create');
    }

    /**
     * Store new Promotions Reward
     */
    public function storePromotion(Request $request)
    {
        $validated = $request->validate([
            'code' => 'nullable|max:10',
            'name' => 'required|max:225',
            'reward' => 'nullable|max:225',
            'value' => 'required|numeric|min:0|max:9999999999999.99',
            'bv' => 'required|numeric|min:0|max:9999999999999.99',
            'start' => 'required|date',
            'end' => 'required|date|after_or_equal:start',
            'status' => 'required|in:0,1',
        ], [
            'value.max' => 'Nilai tidak boleh lebih dari Rp 9.999.999.999.999,99',
            'bv.max' => 'BV tidak boleh lebih dari 9.999.999.999.999,99',
        ]);

        $validated['type'] = 0; // Promotions = periode

        Reward::create($validated);

        return redirect()->route('admin.settings.promotions-rewards.index')
            ->with('success', 'Promotions Reward berhasil ditambahkan');
    }

    /**
     * Show form to edit Promotions Reward
     */
    public function editPromotion(Reward $reward)
    {
        return Inertia::render('Admin/Rewards/Promotions/Edit', [
            'reward' => $reward,
        ]);
    }

    /**
     * Update Promotions Reward
     */
    public function updatePromotion(Request $request, Reward $reward)
    {
        $validated = $request->validate([
            'code' => 'nullable|max:10',
            'name' => 'required|max:225',
            'reward' => 'nullable|max:225',
            'value' => 'required|numeric|min:0|max:9999999999999.99',
            'bv' => 'required|numeric|min:0|max:9999999999999.99',
            'start' => 'required|date',
            'end' => 'required|date|after_or_equal:start',
            'status' => 'required|in:0,1',
        ], [
            'value.max' => 'Nilai tidak boleh lebih dari Rp 9.999.999.999.999,99',
            'bv.max' => 'BV tidak boleh lebih dari 9.999.999.999.999,99',
        ]);

        $reward->update($validated);

        return redirect()->route('admin.settings.promotions-rewards.index')
            ->with('success', 'Promotions Reward berhasil diperbarui');
    }

    /**
     * Delete Promotions Reward
     */
    public function destroyPromotion(Reward $reward)
    {
        $reward->delete();

        return back()->with('success', 'Promotions Reward berhasil dihapus');
    }

    /**
     * Display Lifetime Cash Rewards (type = 1 - permanen)
     */
    public function lifetime(Request $request)
    {
        $rewards = Reward::query()
            ->where('type', 1) // Lifetime = permanen
            ->when($request->search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('code', 'like', "%{$search}%");
            })
            ->when($request->status !== null && $request->status !== 'all', function ($query) use ($request) {
                $query->where('status', $request->status);
            })
            ->orderBy($request->input('sort_by', 'created_at'), $request->input('sort_order', 'desc'))
            ->paginate(15)
            ->withQueryString();

        $statistics = [
            'total' => Reward::where('type', 1)->count(),
            'total_active' => Reward::where('type', 1)->where('status', 1)->count(),
            'total_inactive' => Reward::where('type', 1)->where('status', 0)->count(),
        ];

        return Inertia::render('Admin/Rewards/Lifetime/Index', [
            'rewards' => $rewards,
            'statistics' => $statistics,
            'filters' => [
                'search' => $request->search,
                'status' => $request->status,
                'sort_by' => $request->input('sort_by', 'created_at'),
                'sort_order' => $request->input('sort_order', 'desc'),
            ],
        ]);
    }

    /**
     * Show form to create Lifetime Cash Reward
     */
    public function createLifetime()
    {
        return Inertia::render('Admin/Rewards/Lifetime/Create');
    }

    /**
     * Store new Lifetime Cash Reward
     */
    public function storeLifetime(Request $request)
    {
        $validated = $request->validate([
            'code' => 'nullable|max:10',
            'name' => 'required|max:225',
            'reward' => 'nullable|max:225',
            'value' => 'required|numeric|min:0|max:9999999999999.99',
            'bv' => 'required|numeric|min:0|max:9999999999999.99',
            'status' => 'required|in:0,1',
        ], [
            'value.max' => 'Nilai tidak boleh lebih dari Rp 9.999.999.999.999,99',
            'bv.max' => 'BV tidak boleh lebih dari 9.999.999.999.999,99',
        ]);

        $validated['type'] = 1; // Lifetime = permanen
        $validated['start'] = null;
        $validated['end'] = null;

        Reward::create($validated);

        return redirect()->route('admin.settings.lifetime-cash-rewards.index')
            ->with('success', 'Lifetime Cash Reward berhasil ditambahkan');
    }

    /**
     * Show form to edit Lifetime Cash Reward
     */
    public function editLifetime(Reward $reward)
    {
        return Inertia::render('Admin/Rewards/Lifetime/Edit', [
            'reward' => $reward,
        ]);
    }

    /**
     * Update Lifetime Cash Reward
     */
    public function updateLifetime(Request $request, Reward $reward)
    {
        $validated = $request->validate([
            'code' => 'nullable|max:10',
            'name' => 'required|max:225',
            'reward' => 'nullable|max:225',
            'value' => 'required|numeric|min:0|max:9999999999999.99',
            'bv' => 'required|numeric|min:0|max:9999999999999.99',
            'status' => 'required|in:0,1',
        ], [
            'value.max' => 'Nilai tidak boleh lebih dari Rp 9.999.999.999.999,99',
            'bv.max' => 'BV tidak boleh lebih dari 9.999.999.999.999,99',
        ]);

        $reward->update($validated);

        return redirect()->route('admin.settings.lifetime-cash-rewards.index')
            ->with('success', 'Lifetime Cash Reward berhasil diperbarui');
    }

    /**
     * Delete Lifetime Cash Reward
     */
    public function destroyLifetime(Reward $reward)
    {
        $reward->delete();

        return back()->with('success', 'Lifetime Cash Reward berhasil dihapus');
    }

    /**
     * Display Promotions Rewards Progress for all members
     */
    public function promotionsProgress(Request $request)
    {
        $now = now()->toDateString();

        // Get active promotions rewards (type=0, status=1, start<=today, end>=today)
        $activeRewards = Reward::query()
            ->where('type', 0)
            ->where('status', 1)
            ->whereDate('start', '<=', $now)
            ->whereDate('end', '>=', $now)
            ->orderBy('end', 'asc')
            ->get()
            ->map(function ($reward) {
                // Get count of members with progress
                $progressCount = CustomerBvReward::where('reward_id', $reward->id)->count();
                $achievedCount = CustomerBvReward::where('reward_id', $reward->id)
                    ->where('status', 1)
                    ->count();

                return [
                    'id' => $reward->id,
                    'name' => $reward->name,
                    'reward' => $reward->reward,
                    'bv_left' => $reward->bv,
                    'bv_right' => $reward->bv,
                    'start' => $reward->start?->format('Y-m-d'),
                    'end' => $reward->end?->format('Y-m-d'),
                    'progress_count' => $progressCount,
                    'achieved_count' => $achievedCount,
                ];
            });

        // Get progress data with pagination
        $progressQuery = CustomerBvReward::query()
            ->with(['member:id,name,username,ewallet_id', 'reward:id,name,reward,bv'])
            ->whereHas('reward', function ($q) use ($now) {
                $q->where('type', 0)
                    ->where('status', 1)
                    ->whereDate('start', '<=', $now)
                    ->whereDate('end', '>=', $now);
            });

        if ($request->filled('reward_id')) {
            $progressQuery->where('reward_id', $request->reward_id);
        }

        if ($request->filled('status') && $request->status !== 'all') {
            $progressQuery->where('status', $request->status);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $progressQuery->whereHas('member', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('username', 'like', "%{$search}%")
                    ->orWhere('ewallet_id', 'like', "%{$search}%");
            });
        }

        $progressData = $progressQuery
            ->orderBy('created_on', 'desc')
            ->paginate(15)
            ->withQueryString()
            ->through(function ($progress) {
                return [
                    'id' => $progress->id,
                    'member_id' => $progress->member_id,
                    'member_name' => $progress->member?->name,
                    'member_username' => $progress->member?->username,
                    'member_ewallet_id' => $progress->member?->ewallet_id,
                    'reward_id' => $progress->reward_id,
                    'reward_name' => $progress->reward?->name,
                    'reward_prize' => $progress->reward?->reward,
                    'bv_required' => $progress->reward?->bv ?? 0,
                    'omzet_left' => $progress->omzet_left,
                    'omzet_right' => $progress->omzet_right,
                    'status' => $progress->status, // 0 = Belum tercapai, 1 = Diproses
                    'created_on' => $progress->created_on?->format('Y-m-d H:i:s'),
                ];
            });

        // Get claimed rewards with pagination
        $claimedQuery = CustomerBonusReward::query()
            ->with(['member:id,name,username,ewallet_id'])
            ->where('reward_type', 'promotion');

        if ($request->filled('claimed_search')) {
            $search = $request->claimed_search;
            $claimedQuery->whereHas('member', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('username', 'like', "%{$search}%")
                    ->orWhere('ewallet_id', 'like', "%{$search}%");
            });
        }

        $claimedRewards = $claimedQuery
            ->orderBy('created_at', 'desc')
            ->paginate(15, ['*'], 'claimed_page')
            ->withQueryString()
            ->through(function ($bonus) {
                return [
                    'id' => $bonus->id,
                    'member_id' => $bonus->member_id,
                    'member_name' => $bonus->member?->name,
                    'member_username' => $bonus->member?->username,
                    'member_ewallet_id' => $bonus->member?->ewallet_id,
                    'reward' => $bonus->reward,
                    'bv' => $bonus->bv,
                    'amount' => $bonus->amount,
                    'claimed_at' => $bonus->created_at?->format('Y-m-d H:i:s'),
                    'status' => $bonus->status,
                ];
            });

        return Inertia::render('Admin/Rewards/PromotionsProgress/Index', [
            'activeRewards' => $activeRewards,
            'progressData' => $progressData,
            'claimedRewards' => $claimedRewards,
            'filters' => [
                'search' => $request->search,
                'reward_id' => $request->reward_id,
                'status' => $request->status,
                'claimed_search' => $request->claimed_search,
            ],
        ]);
    }
}
