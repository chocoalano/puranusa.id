<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\ArticleContent;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArticleController extends Controller
{
    public function index(Request $request)
    {
        $validated = $request->validate([
            'search' => 'nullable|string|max:255',
            'status' => 'nullable|in:published,draft,all',
            'sort_by' => 'nullable|string|in:title,published_at,created_at',
            'sort_order' => 'nullable|string|in:asc,desc',
            'per_page' => 'nullable|integer|in:10,25,50,100',
        ]);

        $sortBy = $validated['sort_by'] ?? 'created_at';
        $sortOrder = $validated['sort_order'] ?? 'desc';
        $perPage = $validated['per_page'] ?? 25;

        $articles = Article::query()
            ->with('content')
            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                        ->orWhere('slug', 'like', "%{$search}%")
                        ->orWhere('seo_title', 'like', "%{$search}%");
                });
            })
            ->when($request->status === 'published', function ($query) {
                $query->where('is_published', true);
            })
            ->when($request->status === 'draft', function ($query) {
                $query->where('is_published', false);
            })
            ->orderBy($sortBy, $sortOrder)
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('Admin/Articles/Index', [
            'articles' => $articles,
            'filters' => [
                'search' => $request->search,
                'status' => $request->status,
                'sort_by' => $sortBy,
                'sort_order' => $sortOrder,
                'per_page' => $perPage,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Articles/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:articles,slug',
            'seo_title' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string|max:500',
            'content' => 'required|string',
            'tags' => 'nullable|array',
            'tags.*' => 'string|max:50',
            'is_published' => 'boolean',
            'published_at' => 'nullable|date',
        ]);

        $article = Article::create([
            'title' => $validated['title'],
            'slug' => $validated['slug'],
            'seo_title' => $validated['seo_title'] ?? $validated['title'],
            'seo_description' => $validated['seo_description'],
            'is_published' => $validated['is_published'] ?? false,
            'published_at' => $validated['is_published'] ? ($validated['published_at'] ?? now()) : null,
        ]);

        ArticleContent::create([
            'article_id' => $article->id,
            'content' => $validated['content'],
            'tags' => $validated['tags'] ?? [],
        ]);

        return redirect()->route('admin.articles.index')
            ->with('success', 'Artikel berhasil ditambahkan');
    }

    public function edit(Article $article)
    {
        $article->load('content');

        return Inertia::render('Admin/Articles/Edit', [
            'article' => [
                'id' => $article->id,
                'title' => $article->title,
                'slug' => $article->slug,
                'seo_title' => $article->seo_title,
                'seo_description' => $article->seo_description,
                'is_published' => $article->is_published,
                'published_at' => $article->published_at?->format('Y-m-d\TH:i'),
                'content' => $article->content?->content,
                'tags' => $article->content?->tags ?? [],
            ],
        ]);
    }

    public function update(Request $request, Article $article)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:articles,slug,'.$article->id,
            'seo_title' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string|max:500',
            'content' => 'required|string',
            'tags' => 'nullable|array',
            'tags.*' => 'string|max:50',
            'is_published' => 'boolean',
            'published_at' => 'nullable|date',
        ]);

        $article->update([
            'title' => $validated['title'],
            'slug' => $validated['slug'],
            'seo_title' => $validated['seo_title'] ?? $validated['title'],
            'seo_description' => $validated['seo_description'],
            'is_published' => $validated['is_published'] ?? false,
            'published_at' => $validated['is_published'] ? ($validated['published_at'] ?? $article->published_at ?? now()) : null,
        ]);

        $article->content()->updateOrCreate(
            ['article_id' => $article->id],
            [
                'content' => $validated['content'],
                'tags' => $validated['tags'] ?? [],
            ]
        );

        return redirect()->route('admin.articles.edit', $article)
            ->with('success', 'Artikel berhasil diperbarui');
    }

    public function destroy(Article $article)
    {
        $article->delete();

        return back()->with('success', 'Artikel berhasil dihapus');
    }
}
