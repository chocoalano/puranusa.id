<?php

namespace App\Http\Controllers\Admin\Zenner;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Zenner\StoreLessonRequest;
use App\Http\Requests\Admin\Zenner\UpdateLessonRequest;
use App\Models\Zenner\Course;
use App\Services\Admin\Zenner\LessonService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LessonController extends Controller
{
    public function __construct(protected LessonService $service) {}

    public function index(Request $request)
    {
        $validated = $request->validate([
            'search' => 'nullable|string|max:255',
            'status' => 'nullable|in:active,inactive,all',
            'course_id' => 'nullable|integer',
            'sort_by' => 'nullable|string|in:title,created_at',
            'sort_order' => 'nullable|string|in:asc,desc',
            'per_page' => 'nullable|integer|in:10,25,50,100',
        ]);

        $items = $this->service->paginate(
            $validated,
            $validated['per_page'] ?? 25
        );

        $courses = Course::orderBy('title')->get(['id', 'title']);

        return Inertia::render('Admin/Zenner/Lesson/Index', [
            'items' => $items,
            'courses' => $courses,
            'filters' => [
                'search' => $request->search,
                'status' => $request->status,
                'course_id' => $request->course_id,
                'sort_by' => $validated['sort_by'] ?? 'created_at',
                'sort_order' => $validated['sort_order'] ?? 'desc',
                'per_page' => $validated['per_page'] ?? 25,
            ],
        ]);
    }

    public function create()
    {
        $courses = Course::where('is_active', true)->orderBy('title')->get(['id', 'title']);

        return Inertia::render('Admin/Zenner/Lesson/Create', [
            'courses' => $courses,
        ]);
    }

    public function store(StoreLessonRequest $request)
    {
        $this->service->create($request->validated());
        return redirect()->route('admin.zenner.lessons.index')
            ->with('success', 'Data berhasil ditambahkan');
    }

    public function edit(int $id)
    {
        $item = $this->service->findOrFail($id);
        $courses = Course::where('is_active', true)->orderBy('title')->get(['id', 'title']);

        return Inertia::render('Admin/Zenner/Lesson/Edit', [
            'item' => $item,
            'courses' => $courses,
        ]);
    }

    public function update(UpdateLessonRequest $request, int $id)
    {
        $this->service->update($id, $request->validated());
        return redirect()->route('admin.zenner.lessons.index')
            ->with('success', 'Data berhasil diperbarui');
    }

    public function destroy(int $id)
    {
        $this->service->delete($id);
        return back()->with('success', 'Data berhasil dihapus');
    }
}
