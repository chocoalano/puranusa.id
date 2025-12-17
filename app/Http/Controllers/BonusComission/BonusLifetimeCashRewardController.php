<?php

namespace App\Http\Controllers\BonusComission;

use App\Http\Controllers\Controller;
use App\Models\Manage\Customer;
use App\Models\Manage\CustomerBonusLifetimeCashReward;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BonusLifetimeCashRewardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $query = CustomerBonusLifetimeCashReward::with(['member'])
            ->orderBy($request->get('sort_by', 'created_at'), $request->get('sort_order', 'desc'));

        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->integer('status'));
        }

        if ($memberId = $request->get('member_id')) {
            $query->where('member_id', $memberId);
        }

        if ($search = $request->get('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('description', 'like', "%{$search}%")
                    ->orWhere('reward_name', 'like', "%{$search}%")
                    ->orWhere('reward', 'like', "%{$search}%")
                    ->orWhereHas('member', function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%")
                            ->orWhere('ewallet_id', 'like', "%{$search}%");
                    });
            });
        }

        $bonuses = $query->paginate($request->get('per_page', 15))
            ->through(fn ($bonus) => [
                'id' => $bonus->id,
                'member_id' => $bonus->member_id,
                'member_name' => $bonus->member?->name,
                'member_ewallet_id' => $bonus->member?->ewallet_id,
                'reward_name' => $bonus->reward_name,
                'reward' => $bonus->reward,
                'amount' => $bonus->amount,
                'bv' => $bonus->bv,
                'status' => $bonus->status,
                'status_text' => match ($bonus->status) {
                    0 => 'Pending',
                    1 => 'Claimed',
                    2 => 'Expired',
                    default => 'Unknown',
                },
                'description' => $bonus->description,
                'created_at' => $bonus->created_at?->format('Y-m-d H:i:s'),
            ]);

        $stats = [
            'total_pending' => CustomerBonusLifetimeCashReward::where('status', 0)->sum('amount'),
            'total_claimed' => CustomerBonusLifetimeCashReward::where('status', 1)->sum('amount'),
            'count_pending' => CustomerBonusLifetimeCashReward::where('status', 0)->count(),
            'count_claimed' => CustomerBonusLifetimeCashReward::where('status', 1)->count(),
        ];

        return Inertia::render('bonus/lifetime-cash-reward/Index', [
            'bonuses' => $bonuses,
            'statistics' => $stats,
            'filters' => $request->only(['search', 'status', 'member_id', 'sort_by', 'sort_order', 'per_page']),
        ]);
    }

    public function create(): Response
    {
        $members = Customer::select('id', 'name', 'ewallet_id')
            ->orderBy('name')
            ->get()
            ->map(fn ($member) => [
                'id' => $member->id,
                'name' => $member->name,
                'ewallet_id' => $member->ewallet_id,
            ]);

        return Inertia::render('bonus/lifetime-cash-reward/Create', [
            'members' => $members,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'member_id' => 'required|exists:customer,id',
            'reward_name' => 'nullable|string|max:255',
            'reward' => 'nullable|string|max:255',
            'amount' => 'required|numeric|min:0',
            'bv' => 'nullable|numeric|min:0',
            'status' => 'required|in:0,1,2',
            'description' => 'nullable|string|max:255',
        ]);

        CustomerBonusLifetimeCashReward::create($validated);

        return redirect()->route('bonus.lifetime-cash-reward.index')
            ->with('success', 'Bonus lifetime cash reward berhasil ditambahkan');
    }

    public function edit(CustomerBonusLifetimeCashReward $customerBonusLifetimeCashReward): Response
    {
        $members = Customer::select('id', 'name', 'ewallet_id')
            ->orderBy('name')
            ->get()
            ->map(fn ($member) => [
                'id' => $member->id,
                'name' => $member->name,
                'ewallet_id' => $member->ewallet_id,
            ]);

        return Inertia::render('bonus/lifetime-cash-reward/Edit', [
            'bonus' => $customerBonusLifetimeCashReward,
            'members' => $members,
        ]);
    }

    public function update(Request $request, CustomerBonusLifetimeCashReward $customerBonusLifetimeCashReward)
    {
        $validated = $request->validate([
            'member_id' => 'required|exists:customer,id',
            'reward_name' => 'nullable|string|max:255',
            'reward' => 'nullable|string|max:255',
            'amount' => 'required|numeric|min:0',
            'bv' => 'nullable|numeric|min:0',
            'status' => 'required|in:0,1,2',
            'description' => 'nullable|string|max:255',
        ]);

        $customerBonusLifetimeCashReward->update($validated);

        return redirect()->route('bonus.lifetime-cash-reward.index')
            ->with('success', 'Bonus lifetime cash reward berhasil diperbarui');
    }

    public function destroy(CustomerBonusLifetimeCashReward $customerBonusLifetimeCashReward)
    {
        $customerBonusLifetimeCashReward->delete();

        return back()->with('success', 'Bonus lifetime cash reward berhasil dihapus');
    }

    public function release(CustomerBonusLifetimeCashReward $customerBonusLifetimeCashReward)
    {
        $customerBonusLifetimeCashReward->update(['status' => 1]);

        return back()->with('success', 'Bonus lifetime cash reward berhasil dirilis');
    }

    public function massRelease(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:customer_bonus_lifetime_cash_rewards,id',
        ]);

        CustomerBonusLifetimeCashReward::whereIn('id', $request->ids)->update(['status' => 1]);

        return back()->with('success', count($request->ids).' bonus lifetime cash reward berhasil dirilis');
    }
}
