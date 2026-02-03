<?php

namespace App\Http\Controllers\Admin\Zenner;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Zenner\StoreProcureProductRequest;
use App\Http\Requests\Admin\Zenner\UpdateProcureProductRequest;
use App\Services\Admin\Zenner\ProcureProductService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProcureProductController extends Controller
{
    public function __construct(protected ProcureProductService $service) {}

    public function index(Request $request)
    {
        $validated = $request->validate([
            'search' => 'nullable|string|max:255',
            'status' => 'nullable|in:active,inactive,all',
            'category' => 'nullable|string|max:100',
            'sort_by' => 'nullable|string|in:title,price,created_at',
            'sort_order' => 'nullable|string|in:asc,desc',
            'per_page' => 'nullable|integer|in:10,25,50,100',
        ]);

        $items = $this->service->paginate(
            $validated,
            $validated['per_page'] ?? 25
        );

        return Inertia::render('Admin/Zenner/ProcureProduct/Index', [
            'items' => $items,
            'filters' => [
                'search' => $request->search,
                'status' => $request->status,
                'category' => $request->category,
                'sort_by' => $validated['sort_by'] ?? 'created_at',
                'sort_order' => $validated['sort_order'] ?? 'desc',
                'per_page' => $validated['per_page'] ?? 25,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Zenner/ProcureProduct/Create');
    }

    public function store(StoreProcureProductRequest $request)
    {
        $this->service->create($request->validated());
        return redirect()->route('admin.zenner.procure-products.index')
            ->with('success', 'Data berhasil ditambahkan');
    }

    public function edit(int $id)
    {
        $item = $this->service->findOrFail($id);
        return Inertia::render('Admin/Zenner/ProcureProduct/Edit', [
            'item' => $item,
        ]);
    }

    public function update(UpdateProcureProductRequest $request, int $id)
    {
        $this->service->update($id, $request->validated());
        return redirect()->route('admin.zenner.procure-products.index')
            ->with('success', 'Data berhasil diperbarui');
    }

    public function destroy(int $id)
    {
        $this->service->delete($id);
        return back()->with('success', 'Data berhasil dihapus');
    }
}
