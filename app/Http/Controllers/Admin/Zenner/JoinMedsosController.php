<?php

namespace App\Http\Controllers\Admin\Zenner;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Zenner\StoreJoinMedsosRequest;
use App\Http\Requests\Admin\Zenner\UpdateJoinMedsosRequest;
use App\Services\Admin\Zenner\JoinMedsosService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JoinMedsosController extends Controller
{
    public function __construct(protected JoinMedsosService $service) {}

    public function index(Request $request)
    {
        $validated = $request->validate([
            'search' => 'nullable|string|max:255',
            'status' => 'nullable|in:active,inactive,all',
            'sort_by' => 'nullable|string|in:platform,created_at',
            'sort_order' => 'nullable|string|in:asc,desc',
            'per_page' => 'nullable|integer|in:10,25,50,100',
        ]);

        $items = $this->service->paginate(
            $validated,
            $validated['per_page'] ?? 25
        );

        return Inertia::render('Admin/Zenner/JoinMedsos/Index', [
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
        return Inertia::render('Admin/Zenner/JoinMedsos/Create');
    }

    public function store(StoreJoinMedsosRequest $request)
    {
        $this->service->create($request->validated());
        return redirect()->route('admin.zenner.join-medsos.index')
            ->with('success', 'Data berhasil ditambahkan');
    }

    public function edit(int $id)
    {
        $item = $this->service->findOrFail($id);
        return Inertia::render('Admin/Zenner/JoinMedsos/Edit', [
            'item' => $item,
        ]);
    }

    public function update(UpdateJoinMedsosRequest $request, int $id)
    {
        $this->service->update($id, $request->validated());
        return redirect()->route('admin.zenner.join-medsos.index')
            ->with('success', 'Data berhasil diperbarui');
    }

    public function destroy(int $id)
    {
        $this->service->delete($id);
        return back()->with('success', 'Data berhasil dihapus');
    }
}
