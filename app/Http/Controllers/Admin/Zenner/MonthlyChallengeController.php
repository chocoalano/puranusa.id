<?php

namespace App\Http\Controllers\Admin\Zenner;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Zenner\StoreMonthlyChallengeRequest;
use App\Http\Requests\Admin\Zenner\UpdateMonthlyChallengeRequest;
use App\Services\Admin\Zenner\MonthlyChallengeService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MonthlyChallengeController extends Controller
{
    public function __construct(protected MonthlyChallengeService $service) {}

    public function index(Request $request)
    {
        $validated = $request->validate([
            'search' => 'nullable|string|max:255',
            'status' => 'nullable|in:active,inactive,all',
            'sort_by' => 'nullable|string|in:title,start_date,created_at',
            'sort_order' => 'nullable|string|in:asc,desc',
            'per_page' => 'nullable|integer|in:10,25,50,100',
        ]);

        $items = $this->service->paginate($validated, $validated['per_page'] ?? 25);

        return Inertia::render('Admin/Zenner/MonthlyChallenge/Index', [
            'items' => $items,
            'filters' => [
                'search' => $request->search,
                'status' => $request->status,
                'sort_by' => $validated['sort_by'] ?? 'created_at',
                'sort_order' => $validated['sort_order'] ?? 'desc',
                'per_page' => $validated['per_page'] ?? 25,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Zenner/MonthlyChallenge/Create');
    }

    public function store(StoreMonthlyChallengeRequest $request)
    {
        $this->service->create($request->validated());
        return redirect()->route('admin.zenner.monthly-challenges.index')
            ->with('success', 'Data berhasil ditambahkan');
    }

    public function edit(int $id)
    {
        $item = $this->service->findOrFail($id);
        return Inertia::render('Admin/Zenner/MonthlyChallenge/Edit', ['item' => $item]);
    }

    public function update(UpdateMonthlyChallengeRequest $request, int $id)
    {
        $this->service->update($id, $request->validated());
        return redirect()->route('admin.zenner.monthly-challenges.index')
            ->with('success', 'Data berhasil diperbarui');
    }

    public function destroy(int $id)
    {
        $this->service->delete($id);
        return back()->with('success', 'Data berhasil dihapus');
    }
}
