<?php

namespace App\Http\Controllers\BonusComission;

use App\Http\Controllers\Controller;
use App\Models\Manage\Customer;
use App\Models\Manage\CustomerBonusPairing;
use App\Services\MLMService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BonusPairingController extends Controller
{
    public function __construct(protected MLMService $mlmService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $pairColumn = CustomerBonusPairing::pairColumn();
        $sortBy = $request->get('sort_by', 'created_at');
        if ($sortBy === 'pair' || $sortBy === 'pair_count' || $sortBy === 'pairing_count') {
            $sortBy = $pairColumn;
        }

        $query = CustomerBonusPairing::with(['member'])
            ->orderBy($sortBy, $request->get('sort_order', 'desc'));

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->integer('status'));
        }

        // Filter by member
        if ($memberId = $request->get('member_id')) {
            $query->where('member_id', $memberId);
        }

        // Search
        if ($search = $request->get('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('description', 'like', "%{$search}%")
                    ->orWhereHas('member', function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%")
                            ->orWhere('ewallet_id', 'like', "%{$search}%");
                    });
            });
        }

        $bonuses = $query->paginate($request->get('per_page', 15))
            ->through(function ($bonus) {
                $pairCount = (int) $bonus->pair;

                return [
                    'id' => $bonus->id,
                    'member_id' => $bonus->member_id,
                    'member_name' => $bonus->member?->name,
                    'member_ewallet_id' => $bonus->member?->ewallet_id,
                    'pair' => $pairCount,
                    'pair_count' => $pairCount,
                    'amount' => $bonus->amount,
                    'index_value' => $bonus->index_value,
                    'status' => $bonus->status,
                    'status_text' => $bonus->status === 1 ? 'Released' : 'Pending',
                    'description' => $bonus->description,
                    'created_at' => $bonus->created_at?->format('Y-m-d H:i:s'),
                ];
            });

        // Statistics
        $stats = [
            'total_pending' => CustomerBonusPairing::where('status', 0)->sum('amount'),
            'total_released' => CustomerBonusPairing::where('status', 1)->sum('amount'),
            'count_pending' => CustomerBonusPairing::where('status', 0)->count(),
            'count_released' => CustomerBonusPairing::where('status', 1)->count(),
            'total_pairs' => CustomerBonusPairing::where('status', 0)->sum($pairColumn),
        ];

        return Inertia::render('bonus/pairing/Index', [
            'bonuses' => $bonuses,
            'statistics' => $stats,
            'filters' => $request->only(['search', 'status', 'member_id', 'sort_by', 'sort_order', 'per_page']),
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

        return Inertia::render('bonus/pairing/Create', [
            'members' => $members,
        ]);
    }

    /**
     * Store a newly created resource in storage (process pairing for single member)
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'member_id' => ['required', 'exists:customers,id'],
            'bonus_per_pair' => ['required', 'numeric', 'min:0'],
            'max_pairs' => ['nullable', 'integer', 'min:1'],
        ]);

        try {
            $bonus = $this->mlmService->processPairingBonus(
                memberId: $validated['member_id'],
                bonusPerPair: $validated['bonus_per_pair'],
                maxPairs: $validated['max_pairs'] ?? null
            );

            if ($bonus) {
                return redirect()
                    ->route('bonus.pairing.index')
                    ->with('success', 'Bonus pairing berhasil dibuat dengan '.($bonus->pair).' pairs, total Rp '.number_format($bonus->amount, 0, ',', '.'));
            }

            return redirect()
                ->back()
                ->with('error', 'Tidak ada pairs yang valid untuk member ini');
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->withInput()
                ->with('error', 'Gagal proses bonus pairing: '.$e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id): Response
    {
        $bonusPairing = CustomerBonusPairing::find($id);
        $bonusPairing->load(['member']);
        $pairCount = (int) $bonusPairing->pair;
        $bonusPerPair = $pairCount > 0 ? (float) $bonusPairing->amount / $pairCount : 0.0;
        return Inertia::render('bonus/pairing/Show', [
            'bonus' => [
                'id' => $bonusPairing->id,
                'member_id' => $bonusPairing->member_id,
                'member_name' => $bonusPairing->member?->name,
                'member_ewallet_id' => $bonusPairing->member?->ewallet_id,
                'member_email' => $bonusPairing->member?->email,
                'pair' => $pairCount,
                'pair_count' => $pairCount,
                'bonus_per_pair' => $bonusPerPair,
                'amount' => $bonusPairing->amount,
                'index_value' => $bonusPairing->index_value,
                'status' => $bonusPairing->status,
                'status_text' => $bonusPairing->status === 1 ? 'Released' : 'Pending',
                'description' => $bonusPairing->description,
                'created_at' => $bonusPairing->created_at?->format('Y-m-d H:i:s'),
                'updated_at' => $bonusPairing->updated_at?->format('Y-m-d H:i:s'),
            ],
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CustomerBonusPairing $bonusPairing)
    {
        if ($bonusPairing->status === 1) {
            return redirect()
                ->back()
                ->with('error', 'Tidak dapat menghapus bonus yang sudah dirilis');
        }

        try {
            $bonusPairing->delete();

            return redirect()
                ->route('bonus.pairing.index')
                ->with('success', 'Bonus pairing berhasil dihapus');
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->with('error', 'Gagal menghapus bonus: '.$e->getMessage());
        }
    }

    /**
     * Release single bonus
     */
    public function release(CustomerBonusPairing $bonusPairing)
    {
        if ($bonusPairing->status === 1) {
            return redirect()
                ->back()
                ->with('error', 'Bonus sudah dirilis sebelumnya');
        }

        try {
            $bonusPairing->release();

            return redirect()
                ->back()
                ->with('success', 'Bonus pairing berhasil dirilis sebesar Rp '.number_format($bonusPairing->amount, 0, ',', '.'));
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->with('error', 'Gagal release bonus: '.$e->getMessage());
        }
    }

    /**
     * Flush pairing bonus for all members (monthly routine)
     */
    public function flush(Request $request)
    {
        $validated = $request->validate([
            'bonus_per_pair' => ['required', 'numeric', 'min:0'],
            'max_pairs' => ['nullable', 'integer', 'min:1'],
            'member_ids' => ['nullable', 'array'],
            'member_ids.*' => ['exists:customers,id'],
        ]);

        try {
            $results = $this->mlmService->flushAllPairingBonuses(
                bonusPerPair: $validated['bonus_per_pair'],
                maxPairs: $validated['max_pairs'] ?? null,
                memberIds: $validated['member_ids'] ?? []
            );

            $message = "Berhasil flush {$results['total_members']} member dengan {$results['total_pairs']} pairs, total Rp ".number_format($results['total_amount'], 0, ',', '.');

            return redirect()
                ->back()
                ->with('success', $message);
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->with('error', 'Gagal flush bonus pairing: '.$e->getMessage());
        }
    }
}
