<?php

namespace App\Http\Controllers\BonusComission;

use App\Http\Controllers\Controller;
use App\Models\Manage\Customer;
use App\Models\Manage\CustomerBonusRetail;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BonusRetailController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $query = CustomerBonusRetail::with(['member', 'fromMember'])
            ->orderBy($request->get('sort_by', 'created_at'), $request->get('sort_order', 'desc'));

        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->integer('status'));
        }

        if ($memberId = $request->get('member_id')) {
            $query->where('member_id', $memberId);
        }

        if ($fromMemberId = $request->get('from_member_id')) {
            $query->where('from_member_id', $fromMemberId);
        }

        if ($search = $request->get('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('description', 'like', "%{$search}%")
                    ->orWhereHas('member', function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%")
                            ->orWhere('ewallet_id', 'like', "%{$search}%");
                    })
                    ->orWhereHas('fromMember', function ($q) use ($search) {
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
                'from_member_id' => $bonus->from_member_id,
                'from_member_name' => $bonus->fromMember?->name,
                'from_member_ewallet_id' => $bonus->fromMember?->ewallet_id,
                'amount' => $bonus->amount,
                'index_value' => $bonus->index_value,
                'status' => $bonus->status,
                'status_text' => $bonus->status === 1 ? 'Released' : 'Pending',
                'description' => $bonus->description,
                'created_at' => $bonus->created_at?->format('Y-m-d H:i:s'),
            ]);

        $stats = [
            'total_pending' => CustomerBonusRetail::where('status', 0)->sum('amount'),
            'total_released' => CustomerBonusRetail::where('status', 1)->sum('amount'),
            'count_pending' => CustomerBonusRetail::where('status', 0)->count(),
            'count_released' => CustomerBonusRetail::where('status', 1)->count(),
        ];

        return Inertia::render('bonus/retail/Index', [
            'bonuses' => $bonuses,
            'statistics' => $stats,
            'filters' => $request->only(['search', 'status', 'member_id', 'from_member_id', 'sort_by', 'sort_order', 'per_page']),
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

        return Inertia::render('bonus/retail/Create', [
            'members' => $members,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'member_id' => 'required|exists:customer,id',
            'from_member_id' => 'nullable|exists:customer,id',
            'amount' => 'required|numeric|min:0',
            'index_value' => 'nullable|numeric|min:0',
            'status' => 'required|in:0,1',
            'description' => 'nullable|string|max:255',
        ]);

        CustomerBonusRetail::create($validated);

        return redirect()->route('bonus.retail.index')
            ->with('success', 'Bonus retail berhasil ditambahkan');
    }

    public function edit(CustomerBonusRetail $customerBonusRetail): Response
    {
        $members = Customer::select('id', 'name', 'ewallet_id')
            ->orderBy('name')
            ->get()
            ->map(fn ($member) => [
                'id' => $member->id,
                'name' => $member->name,
                'ewallet_id' => $member->ewallet_id,
            ]);

        return Inertia::render('bonus/retail/Edit', [
            'bonus' => $customerBonusRetail,
            'members' => $members,
        ]);
    }

    public function update(Request $request, CustomerBonusRetail $customerBonusRetail)
    {
        $validated = $request->validate([
            'member_id' => 'required|exists:customer,id',
            'from_member_id' => 'nullable|exists:customer,id',
            'amount' => 'required|numeric|min:0',
            'index_value' => 'nullable|numeric|min:0',
            'status' => 'required|in:0,1',
            'description' => 'nullable|string|max:255',
        ]);

        $customerBonusRetail->update($validated);

        return redirect()->route('bonus.retail.index')
            ->with('success', 'Bonus retail berhasil diperbarui');
    }

    public function destroy(CustomerBonusRetail $customerBonusRetail)
    {
        $customerBonusRetail->delete();

        return back()->with('success', 'Bonus retail berhasil dihapus');
    }

    public function release(CustomerBonusRetail $customerBonusRetail)
    {
        $customerBonusRetail->update(['status' => 1]);

        return back()->with('success', 'Bonus retail berhasil dirilis');
    }

    public function massRelease(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:customer_bonus_retails,id',
        ]);

        CustomerBonusRetail::whereIn('id', $request->ids)->update(['status' => 1]);

        return back()->with('success', count($request->ids).' bonus retail berhasil dirilis');
    }
}
