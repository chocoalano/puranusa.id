<?php

namespace App\Http\Controllers\Admin\Zenner;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Zenner\StoreWebinarRequest;
use App\Http\Requests\Admin\Zenner\UpdateWebinarRequest;
use App\Services\Admin\Zenner\WebinarService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WebinarController extends Controller
{
    public function __construct(protected WebinarService $service) {}

    public function index(Request $request)
    {
        $validated = $request->validate([
            'search' => 'nullable|string|max:255',
            'status' => 'nullable|in:upcoming,live,completed,cancelled',
            'sort_by' => 'nullable|string|in:title,scheduled_at,created_at',
            'sort_order' => 'nullable|string|in:asc,desc',
            'per_page' => 'nullable|integer|in:10,25,50,100',
        ]);

        $items = $this->service->paginate($validated, $validated['per_page'] ?? 25);

        return Inertia::render('Admin/Zenner/Webinar/Index', [
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
        return Inertia::render('Admin/Zenner/Webinar/Create');
    }

    public function store(StoreWebinarRequest $request)
    {
        $this->service->create($request->validated());
        return redirect()->route('admin.zenner.webinars.index')
            ->with('success', 'Data berhasil ditambahkan');
    }

    public function edit(int $id)
    {
        $item = $this->service->findOrFail($id);
        return Inertia::render('Admin/Zenner/Webinar/Edit', ['item' => $item]);
    }

    public function update(UpdateWebinarRequest $request, int $id)
    {
        $this->service->update($id, $request->validated());
        return redirect()->route('admin.zenner.webinars.index')
            ->with('success', 'Data berhasil diperbarui');
    }

    public function destroy(int $id)
    {
        $this->service->delete($id);
        return back()->with('success', 'Data berhasil dihapus');
    }
}
