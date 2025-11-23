<?php

namespace App\Http\Controllers\Ecommerce;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArticleController extends Controller
{
    /**
     * Display a listing of articles.
     */
    public function index(Request $request)
    {
        $validated = $request->validate([
            'search' => 'nullable|string|max:255',
            'tag' => 'nullable|string|max:50',
            'per_page' => 'nullable|integer|in:9,18,27,36',
        ]);

        $perPage = $validated['per_page'] ?? 9;

        $articles = Article::query()
            ->with('content')
            ->where('is_published', true)
            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                        ->orWhere('seo_description', 'like', "%{$search}%");
                });
            })
            ->when($request->tag, function ($query, $tag) {
                $query->whereHas('content', function ($q) use ($tag) {
                    $q->whereJsonContains('tags', $tag);
                });
            })
            ->orderBy('published_at', 'desc')
            ->paginate($perPage)
            ->withQueryString();

        // Get all unique tags from published articles
        $allTags = Article::query()
            ->where('is_published', true)
            ->with('content')
            ->get()
            ->pluck('content.tags')
            ->flatten()
            ->unique()
            ->sort()
            ->values();

        return Inertia::render('ecommerce/Articles/Index', [
            'articles' => $articles->through(fn ($article) => [
                'id' => $article->id,
                'title' => $article->title,
                'slug' => $article->slug,
                'seo_description' => $article->seo_description,
                'published_at' => $article->published_at?->format('d M Y'),
                'featured_image' => $this->extractFeaturedImage($article->content?->content),
                'tags' => $article->content?->tags ?? [],
                'reading_time' => $this->estimateReadingTime($article->content?->content),
            ]),
            'filters' => [
                'search' => $request->search,
                'tag' => $request->tag,
                'per_page' => $perPage,
            ],
            'allTags' => $allTags,
        ]);
    }

    /**
     * Display the specified article.
     */
    public function show(string $slug)
    {
        $article = Article::with('content')
            ->where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();

        // Parse content blocks
        $blocks = json_decode($article->content->content ?? '[]', true);

        // Get related articles by tags
        $relatedArticles = Article::query()
            ->with('content')
            ->where('is_published', true)
            ->where('id', '!=', $article->id)
            ->whereHas('content', function ($q) use ($article) {
                $tags = $article->content?->tags ?? [];
                if (! empty($tags)) {
                    foreach ($tags as $tag) {
                        $q->orWhereJsonContains('tags', $tag);
                    }
                }
            })
            ->orderBy('published_at', 'desc')
            ->limit(3)
            ->get()
            ->map(fn ($item) => [
                'id' => $item->id,
                'title' => $item->title,
                'slug' => $item->slug,
                'seo_description' => $item->seo_description,
                'published_at' => $item->published_at?->format('d M Y'),
                'featured_image' => $this->extractFeaturedImage($item->content?->content),
                'tags' => $item->content?->tags ?? [],
            ]);

        return Inertia::render('ecommerce/Articles/Show', [
            'article' => [
                'id' => $article->id,
                'title' => $article->title,
                'slug' => $article->slug,
                'seo_title' => $article->seo_title,
                'seo_description' => $article->seo_description,
                'published_at' => $article->published_at?->format('d M Y'),
                'blocks' => $blocks,
                'tags' => $article->content?->tags ?? [],
                'reading_time' => $this->estimateReadingTime($article->content?->content),
            ],
            'relatedArticles' => $relatedArticles,
        ]);
    }

    /**
     * Extract featured image from article content blocks.
     */
    private function extractFeaturedImage(?string $content): ?string
    {
        if (! $content) {
            return null;
        }

        $blocks = json_decode($content, true);
        if (! is_array($blocks)) {
            return null;
        }

        foreach ($blocks as $block) {
            if ($block['type'] === 'image') {
                $imageData = $block['content'] ?? $block['data'] ?? null;
                if ($imageData && isset($imageData['url'])) {
                    return $imageData['url'];
                }
            }
        }

        return null;
    }

    /**
     * Estimate reading time based on content.
     */
    private function estimateReadingTime(?string $content): int
    {
        if (! $content) {
            return 1;
        }

        $blocks = json_decode($content, true);
        if (! is_array($blocks)) {
            return 1;
        }

        $totalWords = 0;
        foreach ($blocks as $block) {
            $blockContent = $block['content'] ?? $block['data'] ?? [];

            if (in_array($block['type'], ['heading', 'paragraph', 'quote'])) {
                $text = $blockContent['text'] ?? '';
                $totalWords += str_word_count(strip_tags($text));
            } elseif ($block['type'] === 'list') {
                $items = $blockContent['items'] ?? [];
                foreach ($items as $item) {
                    $totalWords += str_word_count($item);
                }
            }
        }

        // Average reading speed: 200 words per minute
        $minutes = max(1, ceil($totalWords / 200));

        return $minutes;
    }
}
