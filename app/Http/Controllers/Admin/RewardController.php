<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
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
            'value' => 'required|numeric|min:0',
            'bv' => 'required|numeric|min:0',
            'start' => 'required|date',
            'end' => 'required|date|after_or_equal:start',
            'status' => 'required|in:0,1',
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
            'value' => 'required|numeric|min:0',
            'bv' => 'required|numeric|min:0',
            'start' => 'required|date',
            'end' => 'required|date|after_or_equal:start',
            'status' => 'required|in:0,1',
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
            'value' => 'required|numeric|min:0',
            'bv' => 'required|numeric|min:0',
            'status' => 'required|in:0,1',
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
            'value' => 'required|numeric|min:0',
            'bv' => 'required|numeric|min:0',
            'status' => 'required|in:0,1',
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
}
