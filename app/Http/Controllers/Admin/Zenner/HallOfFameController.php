<?php

namespace App\Http\Controllers\Admin\Zenner;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Zenner\StoreHallOfFameRequest;
use App\Http\Requests\Admin\Zenner\UpdateHallOfFameRequest;
use App\Services\Admin\Zenner\HallOfFameService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HallOfFameController extends Controller
{
    public function __construct(protected HallOfFameService $service) {}

    public function index(Request $request)
    {
        $validated = $request->validate([
            'search' => 'nullable|string|max:255',
            'status' => 'nullable|in:active,inactive,all',
            'sort_by' => 'nullable|string|in:customer_name,title,created_at',
            'sort_order' => 'nullable|string|in:asc,desc',
            'per_page' => 'nullable|integer|in:10,25,50,100',
        ]);

        $items = $this->service->paginate($validated, $validated['per_page'] ?? 25);

        return Inertia::render('Admin/Zenner/HallOfFame/Index', [
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
        return Inertia::render('Admin/Zenner/HallOfFame/Create');
    }

    public function store(StoreHallOfFameRequest $request)
    {
        $this->service->create($request->validated());
        return redirect()->route('admin.zenner.hall-of-fames.index')
            ->with('success', 'Data berhasil ditambahkan');
    }

    public function edit(int $id)
    {
        $item = $this->service->findOrFail($id);
        return Inertia::render('Admin/Zenner/HallOfFame/Edit', ['item' => $item]);
    }

    public function update(UpdateHallOfFameRequest $request, int $id)
    {
        $this->service->update($id, $request->validated());
        return redirect()->route('admin.zenner.hall-of-fames.index')
            ->with('success', 'Data berhasil diperbarui');
    }

    public function destroy(int $id)
    {
        $this->service->delete($id);
        return back()->with('success', 'Data berhasil dihapus');
    }
}
