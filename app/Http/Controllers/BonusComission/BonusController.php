<?php

namespace App\Http\Controllers\BonusComission;

use App\Http\Controllers\Controller;
use App\Models\Manage\Customer;
use App\Models\Manage\CustomerBonus;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BonusController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $query = CustomerBonus::with(['member'])
            ->orderBy($request->get('sort_by', 'created_at'), $request->get('sort_order', 'desc'));

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

        // Date range filter
        if ($from = $request->get('date_from')) {
            $query->whereDate('created_at', '>=', $from);
        }
        if ($to = $request->get('date_to')) {
            $query->whereDate('created_at', '<=', $to);
        }

        $bonuses = $query->paginate($request->get('per_page', 15))
            ->through(function ($bonus) {
                return [
                    'id' => $bonus->id,
                    'member_id' => $bonus->member_id,
                    'member_name' => $bonus->member?->name,
                    'member_ewallet_id' => $bonus->member?->ewallet_id,
                    'amount' => $bonus->amount,
                    'tax_amount' => $bonus->tax_amount,
                    'tax_netto' => $bonus->tax_netto,
                    'tax_percent' => $bonus->tax_percent,
                    'index_value' => $bonus->index_value,
                    'status' => $bonus->status,
                    'status_text' => $bonus->status === 1 ? 'Released' : 'Pending',
                    'description' => $bonus->description,
                    'created_at' => $bonus->created_at->format('Y-m-d H:i:s'),
                ];
            });

        // Statistics
        $stats = [
            'total_pending' => CustomerBonus::where('status', 0)->sum('tax_netto'),
            'total_released' => CustomerBonus::where('status', 1)->sum('tax_netto'),
            'count_pending' => CustomerBonus::where('status', 0)->count(),
            'count_released' => CustomerBonus::where('status', 1)->count(),
        ];

        return Inertia::render('bonus/regular/Index', [
            'bonuses' => $bonuses,
            'statistics' => $stats,
            'filters' => $request->only(['search', 'status', 'member_id', 'date_from', 'date_to', 'sort_by', 'sort_order', 'per_page']),
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

        return Inertia::render('bonus/regular/Create', [
            'members' => $members,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'member_id' => ['required', 'exists:customers,id'],
            'amount' => ['required', 'numeric', 'min:0'],
            'tax_percent' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'description' => ['nullable', 'string', 'max:500'],
        ]);

        try {
            $bonus = CustomerBonus::createBonus(
                memberId: $validated['member_id'],
                amount: $validated['amount'],
                indexValue: $validated['amount'],
                taxPercent: $validated['tax_percent'] ?? 10,
                description: $validated['description'] ?? 'Bonus regular'
            );

            return redirect()
                ->route('bonus.regular.index')
                ->with('success', 'Bonus berhasil dibuat dengan nominal Rp '.number_format($bonus->tax_netto, 0, ',', '.'));
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->withInput()
                ->with('error', 'Gagal membuat bonus: '.$e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(CustomerBonus $bonus): Response
    {
        $bonus->load(['member']);

        return Inertia::render('bonus/regular/Show', [
            'bonus' => [
                'id' => $bonus->id,
                'member_id' => $bonus->member_id,
                'member_name' => $bonus->member?->name,
                'member_ewallet_id' => $bonus->member?->ewallet_id,
                'member_email' => $bonus->member?->email,
                'member_phone' => $bonus->member?->phone,
                'amount' => $bonus->amount,
                'tax_amount' => $bonus->tax_amount,
                'tax_netto' => $bonus->tax_netto,
                'tax_percent' => $bonus->tax_percent,
                'index_value' => $bonus->index_value,
                'status' => $bonus->status,
                'status_text' => $bonus->status === 1 ? 'Released' : 'Pending',
                'description' => $bonus->description,
                'created_at' => $bonus->created_at->format('Y-m-d H:i:s'),
                'updated_at' => $bonus->updated_at->format('Y-m-d H:i:s'),
            ],
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CustomerBonus $bonus)
    {
        if ($bonus->status === 1) {
            return redirect()
                ->back()
                ->with('error', 'Tidak dapat menghapus bonus yang sudah dirilis');
        }

        try {
            $bonus->delete();

            return redirect()
                ->route('bonus.regular.index')
                ->with('success', 'Bonus berhasil dihapus');
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->with('error', 'Gagal menghapus bonus: '.$e->getMessage());
        }
    }

    /**
     * Release single bonus
     */
    public function release(CustomerBonus $bonus)
    {
        if ($bonus->status === 1) {
            return redirect()
                ->back()
                ->with('error', 'Bonus sudah dirilis sebelumnya');
        }

        try {
            $bonus->release();

            return redirect()
                ->back()
                ->with('success', 'Bonus berhasil dirilis sebesar Rp '.number_format($bonus->tax_netto, 0, ',', '.'));
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
            'bonus_ids.*' => ['exists:customer_bonuses,id'],
        ]);

        try {
            $results = CustomerBonus::releaseBulk($validated['bonus_ids']);

            $message = "Berhasil release {$results['success']} bonus (Rp ".number_format($results['total_amount'], 0, ',', '.').')';

            if ($results['failed'] > 0) {
                $message .= ", Gagal: {$results['failed']}";
            }

            return redirect()
                ->back()
                ->with('success', $message);
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->with('error', 'Gagal mass release: '.$e->getMessage());
        }
    }
}
