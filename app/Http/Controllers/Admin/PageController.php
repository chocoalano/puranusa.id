<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StorePageRequest;
use App\Http\Requests\Admin\UpdatePageRequest;
use App\Models\Page;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    public function index(Request $request)
    {
        $query = Page::query();

        // Search
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('slug', 'like', "%{$search}%");
            });
        }

        // Filter by status
        if ($request->filled('status')) {
            $query->where('is_published', $request->status === 'published');
        }

        // Sort
        $sortField = $request->get('sort', 'order');
        $sortDirection = $request->get('direction', 'asc');
        $query->orderBy($sortField, $sortDirection);

        $pages = $query->paginate(15)->withQueryString();

        return Inertia::render('Admin/Pages/Index', [
            'pages' => $pages,
            'filters' => $request->only(['search', 'status', 'sort', 'direction']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Pages/Create');
    }

    public function store(StorePageRequest $request)
    {
        $data = $request->validated();

        // Decode blocks if it's a JSON string
        if (isset($data['blocks']) && is_string($data['blocks'])) {
            $data['blocks'] = json_decode($data['blocks'], true);
        }

        Page::create($data);

        return redirect()->route('admin.pages.index')
            ->with('success', 'Halaman berhasil dibuat.');
    }

    public function edit(Page $page)
    {
        return Inertia::render('Admin/Pages/Edit', [
            'page' => $page,
        ]);
    }

    public function update(UpdatePageRequest $request, Page $page)
    {
        $data = $request->validated();
        $protectedSlugs = ['terms', 'about', 'privacy', 'faq'];

        // Decode blocks if it's a JSON string
        if (isset($data['blocks']) && is_string($data['blocks'])) {
            $data['blocks'] = json_decode($data['blocks'], true);
        }

        // If this is a protected page, only update title, content, and blocks
        if (in_array($page->slug, $protectedSlugs)) {
            $page->update([
                'title' => $data['title'],
                'content' => $data['content'] ?? null,
                'blocks' => $data['blocks'] ?? null,
            ]);
        } else {
            $page->update($data);
        }

        return redirect()->route('admin.pages.edit', $page)
            ->with('success', 'Halaman berhasil diperbarui.');
    }

    public function destroy(Page $page)
    {
        $protectedSlugs = ['terms', 'about', 'privacy', 'faq'];

        // Prevent deletion of protected system pages
        if (in_array($page->slug, $protectedSlugs)) {
            return redirect()->route('admin.pages.index')
                ->with('error', 'Halaman sistem tidak dapat dihapus.');
        }

        $page->delete();

        return redirect()->route('admin.pages.index')
            ->with('success', 'Halaman berhasil dihapus.');
    }
}
