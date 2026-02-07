<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Content;
use App\Models\ContentsCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ZennerClubController extends Controller
{
    /**
     * Display a listing of contents.
     */
    public function index(Request $request)
    {
        $validated = $request->validate([
            'search' => 'nullable|string|max:255',
            'status' => 'nullable|string|max:50',
            'category_id' => 'nullable|integer|exists:contents_category,id',
            'sort_by' => 'nullable|string|in:title,created_at',
            'sort_order' => 'nullable|string|in:asc,desc',
            'per_page' => 'nullable|integer|in:10,25,50,100',
        ]);

        $sortBy = $validated['sort_by'] ?? 'created_at';
        $sortOrder = $validated['sort_order'] ?? 'desc';
        $perPage = $validated['per_page'] ?? 25;

        $contents = Content::query()
            ->with(['category', 'creator'])
            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                        ->orWhere('slug', 'like', "%{$search}%");
                });
            })
            ->when($request->category_id, function ($query, $categoryId) {
                $query->where('category_id', $categoryId);
            })
            ->when($request->status && $request->status !== 'all', function ($query) use ($request) {
                $query->where('status', $request->status);
            })
            ->orderBy($sortBy, $sortOrder)
            ->paginate($perPage)
            ->withQueryString();

        $categories = ContentsCategory::query()
            ->orderBy('name')
            ->get(['id', 'name', 'parent_id']);

        return Inertia::render('Admin/ZennerClub/Contents/Index', [
            'items' => $contents,
            'categories' => $categories,
            'filters' => [
                'search' => $request->search,
                'status' => $request->status,
                'category_id' => $request->category_id,
                'sort_by' => $sortBy,
                'sort_order' => $sortOrder,
                'per_page' => $perPage,
            ],
        ]);
    }

    /**
     * Display contents by category slug for Zenner Club menu pages.
     */
    public function categoryView(Request $request)
    {
        $validated = $request->validate([
            'category' => 'nullable|string|max:255',
        ]);

        if (! $validated['category']) {
            return redirect('/admin/zenner-club/categories')
                ->with('error', 'Kategori tidak ditemukan');
        }

        $categoryKey = $validated['category'];

        $categoryQuery = ContentsCategory::query()->with('parent');
        if (ctype_digit($categoryKey)) {
            $categoryQuery->where('id', (int) $categoryKey);
        } else {
            $categoryQuery->where('slug', $categoryKey);
        }

        $category = $categoryQuery->firstOrFail();

        $contents = Content::query()
            ->with(['category', 'creator'])
            ->where('category_id', $category->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Admin/ZennerClub/CategoryContent/Show', [
            'category' => [
                'id' => $category->id,
                'name' => $category->name,
                'slug' => $category->slug,
                'parent_id' => $category->parent_id,
                'parent' => $category->parent
                    ? [
                        'id' => $category->parent->id,
                        'name' => $category->parent->name,
                        'slug' => $category->parent->slug,
                    ]
                    : null,
            ],
            'contents' => $contents->map(function ($content) {
                return [
                    'id' => $content->id,
                    'title' => $content->title,
                    'slug' => $content->slug,
                    'status' => $content->status,
                    'content' => $content->content,
                    'file' => $content->file,
                    'vlink' => $content->vlink,
                    'created_at' => $content->created_at,
                    'category' => $content->category
                        ? [
                            'id' => $content->category->id,
                            'name' => $content->category->name,
                        ]
                        : null,
                    'creator' => $content->creator
                        ? [
                            'id' => $content->creator->id,
                            'name' => $content->creator->name,
                        ]
                        : null,
                ];
            }),
        ]);
    }

    /**
     * Show data for creating a new content.
     */
    public function create()
    {
        $categories = ContentsCategory::query()
            ->orderBy('name')
            ->get(['id', 'name', 'parent_id']);

        return Inertia::render('Admin/ZennerClub/Contents/Create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created content in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'nullable|exists:contents_category,id',
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'file' => 'nullable|file|max:10240|mimes:jpg,jpeg,png,webp,gif,svg,mp4,mov,avi,webm,mkv,pdf,doc,docx,xls,xlsx,ppt,pptx,txt',
            'vlink' => 'nullable|string|max:500',
            'status' => 'nullable|string|max:50',
        ]);

        $baseSlug = $validated['slug'] ?? $validated['title'];
        $validated['slug'] = $this->makeUniqueSlug($baseSlug, Content::class);

        if ($request->hasFile('file')) {
            $validated['file'] = $request->file('file')->store('contents/files', 'public');
        } else {
            unset($validated['file']);
        }

        if (auth()->id()) {
            $validated['created_by'] = auth()->id();
        }

        $content = Content::create($validated);

        return redirect('/admin/zenner-club/contents')
            ->with('success', 'Content berhasil ditambahkan');
    }

    /**
     * Display the specified content.
     */
    public function show(string $id)
    {
        $content = Content::with(['category', 'creator'])->findOrFail($id);

        return Inertia::render('Admin/ZennerClub/Contents/Show', [
            'item' => $content,
        ]);
    }

    /**
     * Show data for editing the specified content.
     */
    public function edit(string $id)
    {
        $content = Content::with(['category', 'creator'])->findOrFail($id);
        $categories = ContentsCategory::query()
            ->orderBy('name')
            ->get(['id', 'name', 'parent_id']);

        return Inertia::render('Admin/ZennerClub/Contents/Edit', [
            'item' => $content,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified content in storage.
     */
    public function update(Request $request, string $id)
    {
        $content = Content::findOrFail($id);

        $validated = $request->validate([
            'category_id' => 'nullable|exists:contents_category,id',
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'file' => 'nullable|file|max:10240|mimes:jpg,jpeg,png,webp,gif,svg,mp4,mov,avi,webm,mkv,pdf,doc,docx,xls,xlsx,ppt,pptx,txt',
            'vlink' => 'nullable|string|max:500',
            'status' => 'nullable|string|max:50',
        ]);

        if (array_key_exists('slug', $validated) && $validated['slug']) {
            $validated['slug'] = $this->makeUniqueSlug($validated['slug'], Content::class, $content->id);
        } else {
            unset($validated['slug']);
        }

        if ($request->hasFile('file')) {
            if ($content->file && Storage::disk('public')->exists($content->file)) {
                Storage::disk('public')->delete($content->file);
            }
            $validated['file'] = $request->file('file')->store('contents/files', 'public');
        } else {
            unset($validated['file']);
        }

        $content->update($validated);

        return redirect('/admin/zenner-club/contents')
            ->with('success', 'Content berhasil diperbarui');
    }

    /**
     * Remove the specified content from storage.
     */
    public function destroy(string $id)
    {
        $content = Content::findOrFail($id);

        if ($content->file && Storage::disk('public')->exists($content->file)) {
            Storage::disk('public')->delete($content->file);
        }

        $content->delete();

        return back()->with('success', 'Content berhasil dihapus');
    }

    /**
     * Display a listing of content categories.
     */
    public function categoriesIndex(Request $request)
    {
        $validated = $request->validate([
            'search' => 'nullable|string|max:255',
            'parent_id' => 'nullable|integer|exists:contents_category,id',
            'sort_by' => 'nullable|string|in:name,created_at',
            'sort_order' => 'nullable|string|in:asc,desc',
            'per_page' => 'nullable|integer|in:10,25,50,100',
        ]);

        $sortBy = $validated['sort_by'] ?? 'name';
        $sortOrder = $validated['sort_order'] ?? 'asc';
        $perPage = $validated['per_page'] ?? 25;

        $categories = ContentsCategory::query()
            ->with('parent')
            ->withCount('contents')
            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('slug', 'like', "%{$search}%");
                });
            })
            ->when($request->parent_id, function ($query, $parentId) {
                $query->where('parent_id', $parentId);
            })
            ->orderBy($sortBy, $sortOrder)
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('Admin/ZennerClub/Categories/Index', [
            'items' => $categories,
            'filters' => [
                'search' => $request->search,
                'parent_id' => $request->parent_id,
                'sort_by' => $sortBy,
                'sort_order' => $sortOrder,
                'per_page' => $perPage,
            ],
        ]);
    }

    /**
     * Show data for creating a new content category.
     */
    public function categoriesCreate()
    {
        $parents = ContentsCategory::query()
            ->orderBy('name')
            ->get(['id', 'name', 'parent_id']);

        return Inertia::render('Admin/ZennerClub/Categories/Create', [
            'parents' => $parents,
        ]);
    }

    /**
     * Store a newly created content category.
     */
    public function categoriesStore(Request $request)
    {
        $validated = $request->validate([
            'parent_id' => 'nullable|exists:contents_category,id',
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255',
        ]);

        $baseSlug = $validated['slug'] ?? $validated['name'];
        $validated['slug'] = $this->makeUniqueSlug($baseSlug, ContentsCategory::class);

        $category = ContentsCategory::create($validated);

        return redirect('/admin/zenner-club/categories')
            ->with('success', 'Kategori berhasil ditambahkan');
    }

    /**
     * Display the specified content category.
     */
    public function categoriesShow(string $id)
    {
        $category = ContentsCategory::with(['parent', 'children', 'contents'])->findOrFail($id);

        return Inertia::render('Admin/ZennerClub/Categories/Show', [
            'item' => $category,
        ]);
    }

    /**
     * Show data for editing the specified content category.
     */
    public function categoriesEdit(string $id)
    {
        $category = ContentsCategory::with('parent')->findOrFail($id);
        $parents = ContentsCategory::query()
            ->where('id', '!=', $category->id)
            ->orderBy('name')
            ->get(['id', 'name', 'parent_id']);

        return Inertia::render('Admin/ZennerClub/Categories/Edit', [
            'item' => $category,
            'parents' => $parents,
        ]);
    }

    /**
     * Update the specified content category.
     */
    public function categoriesUpdate(Request $request, string $id)
    {
        $category = ContentsCategory::findOrFail($id);

        $validated = $request->validate([
            'parent_id' => 'nullable|exists:contents_category,id',
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255',
        ]);

        if (array_key_exists('slug', $validated) && $validated['slug']) {
            $validated['slug'] = $this->makeUniqueSlug($validated['slug'], ContentsCategory::class, $category->id);
        } else {
            unset($validated['slug']);
        }

        $category->update($validated);

        return redirect('/admin/zenner-club/categories')
            ->with('success', 'Kategori berhasil diperbarui');
    }

    /**
     * Remove the specified content category.
     */
    public function categoriesDestroy(string $id)
    {
        $category = ContentsCategory::findOrFail($id);

        if ($category->children()->exists()) {
            return back()->with('error', 'Kategori tidak dapat dihapus karena masih memiliki sub-kategori');
        }

        if ($category->contents()->exists()) {
            return back()->with('error', 'Kategori tidak dapat dihapus karena masih memiliki konten');
        }

        $category->delete();

        return back()->with('success', 'Kategori berhasil dihapus');
    }

    private function makeUniqueSlug(string $base, string $modelClass, ?int $ignoreId = null): string
    {
        $slug = Str::slug($base);
        $original = $slug;
        $counter = 1;

        while ($modelClass::query()
            ->where('slug', $slug)
            ->when($ignoreId, fn ($q) => $q->where('id', '!=', $ignoreId))
            ->exists()) {
            $slug = $original.'-'.$counter;
            $counter++;
        }

        return $slug;
    }
}
