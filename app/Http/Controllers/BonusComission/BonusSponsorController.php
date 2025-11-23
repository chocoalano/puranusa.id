<?php

namespace App\Http\Controllers\BonusComission;

use App\Http\Controllers\Controller;
use App\Models\Manage\Customer;
use App\Models\Manage\CustomerBonusSponsor;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BonusSponsorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $query = CustomerBonusSponsor::with(['member', 'fromMember'])
            ->orderBy($request->get('sort_by', 'created_at'), $request->get('sort_order', 'desc'));

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->integer('status'));
        }

        // Filter by member (sponsor/receiver)
        if ($memberId = $request->get('member_id')) {
            $query->where('member_id', $memberId);
        }

        // Filter by from_member (downline)
        if ($fromMemberId = $request->get('from_member_id')) {
            $query->where('from_member_id', $fromMemberId);
        }

        // Search
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
            ->through(function ($bonus) {
                return [
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
                    'created_at' => $bonus->created_at->format('Y-m-d H:i:s'),
                ];
            });

        // Statistics
        $stats = [
            'total_pending' => CustomerBonusSponsor::where('status', 0)->sum('amount'),
            'total_released' => CustomerBonusSponsor::where('status', 1)->sum('amount'),
            'count_pending' => CustomerBonusSponsor::where('status', 0)->count(),
            'count_released' => CustomerBonusSponsor::where('status', 1)->count(),
        ];

        return Inertia::render('bonus/sponsor/Index', [
            'bonuses' => $bonuses,
            'statistics' => $stats,
            'filters' => $request->only(['search', 'status', 'member_id', 'from_member_id', 'sort_by', 'sort_order', 'per_page']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $members = Customer::select('id', 'name', 'ewallet_id')
            ->orderBy('name')
            ->get()
            ->map(function ($member) {
                return [
                    'id' => $member->id,
                    'name' => $member->name,
                    'ewallet_id' => $member->ewallet_id,
                ];
            });

        return Inertia::render('bonus/sponsor/Create', [
            'members' => $members,
        ]);
    }

    /**
     * Store a newly created resource in storage
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => ['required', 'in:registration,transaction'],
            'from_member_id' => ['required', 'exists:customers,id'],
            'amount' => ['required', 'numeric', 'min:0'],
            'percentage' => ['required', 'numeric', 'min:0', 'max:100'],
            'description' => ['nullable', 'string'],
        ]);

        try {
            if ($validated['type'] === 'registration') {
                $bonus = CustomerBonusSponsor::distributeSponsorBonusFromRegistration(
                    newMemberId: $validated['from_member_id'],
                    registrationAmount: $validated['amount'],
                    sponsorPercentage: $validated['percentage']
                );
            } else {
                $bonus = CustomerBonusSponsor::distributeSponsorBonusFromTransaction(
                    buyerId: $validated['from_member_id'],
                    transactionAmount: $validated['amount'],
                    sponsorPercentage: $validated['percentage']
                );
            }

            if ($bonus) {
                // Update description if provided
                if (! empty($validated['description'])) {
                    $bonus->update(['description' => $validated['description']]);
                }

                return redirect()
                    ->route('bonus.sponsor.index')
                    ->with('success', 'Bonus sponsor berhasil dibuat sebesar Rp '.number_format($bonus->amount, 0, ',', '.'));
            }

            return redirect()
                ->back()
                ->withInput()
                ->with('error', 'Tidak dapat membuat bonus sponsor, member tidak memiliki sponsor');
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->withInput()
                ->with('error', 'Gagal membuat bonus sponsor: '.$e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(CustomerBonusSponsor $customerBonusSponsor): Response
    {
        $customerBonusSponsor->load(['member', 'fromMember']);

        return Inertia::render('bonus/sponsor/Show', [
            'bonus' => [
                'id' => $customerBonusSponsor->id,
                'member_id' => $customerBonusSponsor->member_id,
                'member_name' => $customerBonusSponsor->member?->name,
                'member_ewallet_id' => $customerBonusSponsor->member?->ewallet_id,
                'from_member_id' => $customerBonusSponsor->from_member_id,
                'from_member_name' => $customerBonusSponsor->fromMember?->name,
                'from_member_ewallet_id' => $customerBonusSponsor->fromMember?->ewallet_id,
                'amount' => $customerBonusSponsor->amount,
                'index_value' => $customerBonusSponsor->index_value,
                'status' => $customerBonusSponsor->status,
                'status_text' => $customerBonusSponsor->status === 1 ? 'Released' : 'Pending',
                'description' => $customerBonusSponsor->description,
                'created_at' => $customerBonusSponsor->created_at?->format('Y-m-d H:i:s') ?? now()->format('Y-m-d H:i:s'),
                'updated_at' => $customerBonusSponsor->updated_at?->format('Y-m-d H:i:s') ?? now()->format('Y-m-d H:i:s'),
            ],
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CustomerBonusSponsor $customerBonusSponsor)
    {
        if ($customerBonusSponsor->status === 1) {
            return redirect()
                ->back()
                ->with('error', 'Tidak dapat menghapus bonus yang sudah dirilis');
        }

        try {
            $customerBonusSponsor->delete();

            return redirect()
                ->route('bonus.sponsor.index')
                ->with('success', 'Bonus sponsor berhasil dihapus');
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->with('error', 'Gagal menghapus bonus: '.$e->getMessage());
        }
    }

    /**
     * Release single bonus
     */
    public function release(CustomerBonusSponsor $customerBonusSponsor)
    {
        if ($customerBonusSponsor->status === 1) {
            return redirect()
                ->back()
                ->with('error', 'Bonus sudah dirilis sebelumnya');
        }

        try {
            $customerBonusSponsor->release();

            return redirect()
                ->back()
                ->with('success', 'Bonus sponsor berhasil dirilis sebesar Rp '.number_format($customerBonusSponsor->amount, 0, ',', '.'));
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->with('error', 'Gagal release bonus: '.$e->getMessage());
        }
    }

    /**
     * Mass release pending bonuses
     */
    public function massRelease(Request $request)
    {
        $validated = $request->validate([
            'bonus_ids' => ['required', 'array', 'min:1'],
            'bonus_ids.*' => ['exists:customer_bonus_sponsors,id'],
        ]);

        $success = 0;
        $failed = 0;
        $totalAmount = 0;

        foreach ($validated['bonus_ids'] as $bonusId) {
            try {
                $bonus = CustomerBonusSponsor::findOrFail($bonusId);
                if ($bonus->status === 0) {
                    $bonus->release();
                    $success++;
                    $totalAmount += $bonus->amount;
                }
            } catch (\Exception $e) {
                $failed++;
            }
        }

        $message = "Berhasil release {$success} bonus sponsor (Rp ".number_format($totalAmount, 0, ',', '.').')';

        if ($failed > 0) {
            $message .= ", Gagal: {$failed}";
        }

        return redirect()
            ->back()
            ->with('success', $message);
    }
}
