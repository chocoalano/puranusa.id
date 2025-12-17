<?php

namespace App\Http\Controllers\BonusComission;

use App\Http\Controllers\Controller;
use App\Models\Manage\Customer;
use App\Models\Manage\CustomerBonusReward;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BonusRewardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $query = CustomerBonusReward::with(['member'])
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
                    ->orWhere('reward_type', 'like', "%{$search}%")
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
                'reward_type' => $bonus->reward_type,
                'amount' => $bonus->amount,
                'index_value' => $bonus->index_value,
                'status' => $bonus->status,
                'status_text' => $bonus->status === 1 ? 'Released' : 'Pending',
                'description' => $bonus->description,
                'created_at' => $bonus->created_at?->format('Y-m-d H:i:s'),
            ]);

        $stats = [
            'total_pending' => CustomerBonusReward::where('status', 0)->sum('amount'),
            'total_released' => CustomerBonusReward::where('status', 1)->sum('amount'),
            'count_pending' => CustomerBonusReward::where('status', 0)->count(),
            'count_released' => CustomerBonusReward::where('status', 1)->count(),
        ];

        return Inertia::render('bonus/reward/Index', [
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

        return Inertia::render('bonus/reward/Create', [
            'members' => $members,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'member_id' => 'required|exists:customer,id',
            'reward_type' => 'nullable|string|max:255',
            'amount' => 'required|numeric|min:0',
            'index_value' => 'nullable|numeric|min:0',
            'status' => 'required|in:0,1',
            'description' => 'nullable|string|max:255',
        ]);

        CustomerBonusReward::create($validated);

        return redirect()->route('bonus.reward.index')
            ->with('success', 'Bonus reward berhasil ditambahkan');
    }

    public function edit(CustomerBonusReward $customerBonusReward): Response
    {
        $members = Customer::select('id', 'name', 'ewallet_id')
            ->orderBy('name')
            ->get()
            ->map(fn ($member) => [
                'id' => $member->id,
                'name' => $member->name,
                'ewallet_id' => $member->ewallet_id,
            ]);

        return Inertia::render('bonus/reward/Edit', [
            'bonus' => $customerBonusReward,
            'members' => $members,
        ]);
    }

    public function update(Request $request, CustomerBonusReward $customerBonusReward)
    {
        $validated = $request->validate([
            'member_id' => 'required|exists:customer,id',
            'reward_type' => 'nullable|string|max:255',
            'amount' => 'required|numeric|min:0',
            'index_value' => 'nullable|numeric|min:0',
            'status' => 'required|in:0,1',
            'description' => 'nullable|string|max:255',
        ]);

        $customerBonusReward->update($validated);

        return redirect()->route('bonus.reward.index')
            ->with('success', 'Bonus reward berhasil diperbarui');
    }

    public function destroy(CustomerBonusReward $customerBonusReward)
    {
        $customerBonusReward->delete();

        return back()->with('success', 'Bonus reward berhasil dihapus');
    }

    public function release(CustomerBonusReward $customerBonusReward)
    {
        $customerBonusReward->update(['status' => 1]);

        return back()->with('success', 'Bonus reward berhasil dirilis');
    }

    public function massRelease(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:customer_bonus_rewards,id',
        ]);

        CustomerBonusReward::whereIn('id', $request->ids)->update(['status' => 1]);

        return back()->with('success', count($request->ids).' bonus reward berhasil dirilis');
    }
}
