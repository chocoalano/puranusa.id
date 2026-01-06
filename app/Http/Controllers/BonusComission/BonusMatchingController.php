<?php

namespace App\Http\Controllers\BonusComission;

use App\Http\Controllers\Controller;
use App\Models\Manage\Customer;
use App\Models\Manage\CustomerBonusMatching;
use App\Services\MLMService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BonusMatchingController extends Controller
{
    public function __construct(protected MLMService $mlmService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $query = CustomerBonusMatching::with(['member', 'fromMember'])
            ->orderBy($request->get('sort_by', 'created_at'), $request->get('sort_order', 'desc'));

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->integer('status'));
        }

        // Filter by member (receiver)
        if ($memberId = $request->get('member_id')) {
            $query->where('member_id', $memberId);
        }

        // Filter by level
        if ($level = $request->get('level')) {
            $query->where('level', $level);
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
                return [
                    'id' => $bonus->id,
                    'member_id' => $bonus->member_id,
                    'member_name' => $bonus->member?->name,
                    'member_ewallet_id' => $bonus->member?->ewallet_id,
                    'from_member_id' => $bonus->from_member_id,
                    'from_member_name' => $bonus->fromMember?->name,
                    'from_member_ewallet_id' => $bonus->fromMember?->ewallet_id,
                    'level' => $bonus->level,
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
            'total_pending' => CustomerBonusMatching::where('status', 0)->sum('amount'),
            'total_released' => CustomerBonusMatching::where('status', 1)->sum('amount'),
            'count_pending' => CustomerBonusMatching::where('status', 0)->count(),
            'count_released' => CustomerBonusMatching::where('status', 1)->count(),
        ];

        return Inertia::render('bonus/matching/Index', [
            'bonuses' => $bonuses,
            'statistics' => $stats,
            'filters' => $request->only(['search', 'status', 'member_id', 'level', 'sort_by', 'sort_order', 'per_page']),
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

        return Inertia::render('bonus/matching/Create', [
            'members' => $members,
        ]);
    }

    /**
     * Store a newly created resource in storage (distribute matching bonus)
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'from_member_id' => ['required', 'exists:customers,id'],
            'amount' => ['required', 'numeric', 'min:0'],
            'max_level' => ['nullable', 'integer', 'min:1', 'max:10'],
        ]);

        try {
            $bonuses = $this->mlmService->processMatchingBonus(
                fromMemberId: $validated['from_member_id'],
                amount: $validated['amount'],
                maxLevel: $validated['max_level'] ?? 5
            );

            $totalAmount = array_sum(array_column($bonuses, 'amount'));
            $count = count($bonuses);

            return redirect()
                ->route('bonus.matching.index')
                ->with('success', "Berhasil distribusi {$count} bonus matching dengan total Rp ".number_format($totalAmount, 0, ',', '.'));
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->withInput()
                ->with('error', 'Gagal distribusi bonus: '.$e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(CustomerBonusMatching $bonusMatching): Response
    {
        $bonusMatching->load(['member', 'fromMember']);

        return Inertia::render('bonus/matching/Show', [
            'bonus' => [
                'id' => $bonusMatching->id,
                'member_id' => $bonusMatching->member_id,
                'member_name' => $bonusMatching->member?->name,
                'member_ewallet_id' => $bonusMatching->member?->ewallet_id,
                'member_email' => $bonusMatching->member?->email,
                'from_member_id' => $bonusMatching->from_member_id,
                'from_member_name' => $bonusMatching->fromMember?->name,
                'from_member_ewallet_id' => $bonusMatching->fromMember?->ewallet_id,
                'level' => $bonusMatching->level,
                'amount' => $bonusMatching->amount,
                'index_value' => $bonusMatching->index_value,
                'status' => $bonusMatching->status,
                'status_text' => $bonusMatching->status === 1 ? 'Released' : 'Pending',
                'description' => $bonusMatching->description,
                'created_at' => $bonusMatching->created_at?->format('Y-m-d H:i:s'),
                'updated_at' => $bonusMatching->updated_at?->format('Y-m-d H:i:s'),
            ],
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CustomerBonusMatching $bonusMatching)
    {
        if ($bonusMatching->status === 1) {
            return redirect()
                ->back()
                ->with('error', 'Tidak dapat menghapus bonus yang sudah dirilis');
        }

        try {
            $bonusMatching->delete();

            return redirect()
                ->route('bonus.matching.index')
                ->with('success', 'Bonus matching berhasil dihapus');
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->with('error', 'Gagal menghapus bonus: '.$e->getMessage());
        }
    }

    /**
     * Release single bonus
     */
    public function release(CustomerBonusMatching $bonusMatching)
    {
        if ($bonusMatching->status === 1) {
            return redirect()
                ->back()
                ->with('error', 'Bonus sudah dirilis sebelumnya');
        }

        try {
            $bonusMatching->release();

            return redirect()
                ->back()
                ->with('success', 'Bonus matching berhasil dirilis sebesar Rp '.number_format($bonusMatching->amount, 0, ',', '.'));
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
            'bonus_ids.*' => ['exists:customer_bonus_matchings,id'],
        ]);

        $success = 0;
        $failed = 0;
        $totalAmount = 0;

        foreach ($validated['bonus_ids'] as $bonusId) {
            try {
                $bonus = CustomerBonusMatching::findOrFail($bonusId);
                if ($bonus->status === 0) {
                    $bonus->release();
                    $success++;
                    $totalAmount += $bonus->amount;
                }
            } catch (\Exception $e) {
                $failed++;
            }
        }

        $message = "Berhasil release {$success} bonus matching (Rp ".number_format($totalAmount, 0, ',', '.').')';

        if ($failed > 0) {
            $message .= ", Gagal: {$failed}";
        }

        return redirect()
            ->back()
            ->with('success', $message);
    }
}
