<?php

namespace App\Http\Controllers\Admin\Zenner;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Zenner\StoreCourseRequest;
use App\Http\Requests\Admin\Zenner\UpdateCourseRequest;
use App\Services\Admin\Zenner\CourseService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function __construct(protected CourseService $service) {}

    public function index(Request $request)
    {
        $validated = $request->validate([
            'search' => 'nullable|string|max:255',
            'status' => 'nullable|in:active,inactive,all',
            'level' => 'nullable|in:beginner,intermediate,advanced',
            'sort_by' => 'nullable|string|in:title,created_at',
            'sort_order' => 'nullable|string|in:asc,desc',
            'per_page' => 'nullable|integer|in:10,25,50,100',
        ]);

        $items = $this->service->paginate(
            $validated,
            $validated['per_page'] ?? 25
        );

        return Inertia::render('Admin/Zenner/Course/Index', [
            'items' => $items,
            'filters' => [
                'search' => $request->search,
                'status' => $request->status,
                'level' => $request->level,
                'sort_by' => $validated['sort_by'] ?? 'created_at',
                'sort_order' => $validated['sort_order'] ?? 'desc',
                'per_page' => $validated['per_page'] ?? 25,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Zenner/Course/Create');
    }

    public function store(StoreCourseRequest $request)
    {
        $this->service->create($request->validated());
        return redirect()->route('admin.zenner.courses.index')
            ->with('success', 'Data berhasil ditambahkan');
    }

    public function show(int $id)
    {
        $item = $this->service->findWithLessons($id);
        return Inertia::render('Admin/Zenner/Course/Show', [
            'item' => $item,
        ]);
    }

    public function edit(int $id)
    {
        $item = $this->service->findOrFail($id);
        return Inertia::render('Admin/Zenner/Course/Edit', [
            'item' => $item,
        ]);
    }

    public function update(UpdateCourseRequest $request, int $id)
    {
        $this->service->update($id, $request->validated());
        return redirect()->route('admin.zenner.courses.index')
            ->with('success', 'Data berhasil diperbarui');
    }

    public function destroy(int $id)
    {
        $this->service->delete($id);
        return back()->with('success', 'Data berhasil dihapus');
    }
}
