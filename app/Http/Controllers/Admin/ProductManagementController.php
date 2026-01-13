<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductMedia;
use App\Services\ImageService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductManagementController extends Controller
{
    public function index(Request $request)
    {
        $validated = $request->validate([
            'search' => 'nullable|string|max:255',
            'category' => 'nullable|exists:categories,id',
            'status' => 'nullable|boolean',
            'sort_by' => 'nullable|string|in:name,sku,base_price,stock,bv,b_retail,created_at',
            'sort_order' => 'nullable|string|in:asc,desc',
            'per_page' => 'nullable|integer|in:10,25,50,100',
        ]);

        $sortBy = $validated['sort_by'] ?? 'created_at';
        $sortOrder = $validated['sort_order'] ?? 'desc';
        $perPage = $validated['per_page'] ?? 25;

        $products = Product::query()
            ->with('categories')
            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('sku', 'like', "%{$search}%")
                        ->orWhere('brand', 'like', "%{$search}%");
                });
            })
            ->when($request->category, function ($query, $category) {
                $query->whereHas('categories', function ($q) use ($category) {
                    $q->where('categories.id', $category);
                });
            })
            ->when($request->status !== null, function ($query) use ($request) {
                $query->where('is_active', $request->status);
            })
            ->orderBy($sortBy, $sortOrder)
            ->paginate($perPage)
            ->withQueryString();

        $categories = Category::where('is_active', true)->get();

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
            'categories' => $categories,
            'filters' => [
                'search' => $request->search,
                'category' => $request->category,
                'status' => $request->status,
                'sort_by' => $sortBy,
                'sort_order' => $sortOrder,
                'per_page' => $perPage,
            ],
        ]);
    }

    public function create()
    {
        $categories = Category::where('is_active', true)->get();

        return Inertia::render('Admin/Products/Create', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'sku' => 'required|string|max:255|unique:products,sku',
            'slug' => 'required|string|max:255|unique:products,slug',
            'name' => 'required|string|max:255',
            'short_desc' => 'nullable|string|max:500',
            'long_desc' => 'nullable|string',
            'brand' => 'nullable|string|max:255',
            'warranty_months' => 'nullable|integer|min:0',
            'base_price' => 'required|numeric|min:0',
            'currency' => 'required|string|in:IDR',
            'stock' => 'required|integer|min:0',
            'weight_gram' => 'required|integer|min:0',
            'length_mm' => 'nullable|integer|min:0',
            'width_mm' => 'nullable|integer|min:0',
            'height_mm' => 'nullable|integer|min:0',
            'bv' => 'nullable|numeric|min:0',
            'b_sponsor' => 'nullable|numeric|min:0',
            'b_matching' => 'nullable|numeric|min:0',
            'b_pairing' => 'nullable|numeric|min:0',
            'b_cashback' => 'nullable|numeric|min:0',
            'b_retail' => 'nullable|numeric|min:0',
            'is_active' => 'boolean',
            'categories' => 'array',
            'categories.*' => 'exists:categories,id',
            'images' => 'nullable|array|max:10',
            'images.*' => 'image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $product = Product::create($validated);

        if (! empty($validated['categories'])) {
            $product->categories()->sync($validated['categories']);
        }

        // Process image uploads
        if ($request->hasFile('images')) {
            $imageService = new ImageService;
            $imageService->uploadProductImages($product->id, $request->file('images'));
        }

        return redirect()->route('admin.products.index')
            ->with('success', 'Produk berhasil ditambahkan');
    }

    public function edit(Product $product)
    {
        $product->load([
            'categories:id,name',
            'media' => function ($query) {
                $query->orderBy('sort_order')
                    ->select(['id', 'product_id', 'url', 'alt_text', 'sort_order', 'is_primary']);
            },
        ]);
        $categories = Category::where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name']);
        $product_data = [
                'id' => $product->id,
                'sku' => $product->sku,
                'slug' => $product->slug,
                'name' => $product->name,
                'short_desc' => $product->short_desc,
                'long_desc' => $product->long_desc,
                'brand' => $product->brand,
                'warranty_months' => $product->warranty_months,
                'base_price' => $product->base_price,
                'currency' => $product->currency,
                'stock' => $product->stock,
                'weight_gram' => $product->weight_gram,
                'length_mm' => $product->length_mm,
                'width_mm' => $product->width_mm,
                'height_mm' => $product->height_mm,
                'bv' => $product->bv,
                'b_sponsor' => $product->b_sponsor,
                'b_matching' => $product->b_matching,
                'b_pairing' => $product->b_pairing,
                'b_cashback' => $product->b_cashback,
                'b_retail' => $product->b_retail,
                'is_active' => $product->is_active,
                'categories' => $product->categories->map(fn ($category) => [
                    'id' => $category->id,
                    'name' => $category->name,
                ]),
                'media' => $product->media->map(fn ($media) => [
                    'id' => $media->id,
                    'url' => $media->url,
                    'alt_text' => $media->alt_text,
                    'sort_order' => $media->sort_order,
                    'is_primary' => $media->is_primary,
                ]),
            ];
        return Inertia::render('Admin/Products/Edit', [
            'product' => $product_data,
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'sku' => 'required|string|max:255|unique:products,sku,'.$product->id,
            'slug' => 'required|string|max:255|unique:products,slug,'.$product->id,
            'name' => 'required|string|max:255',
            'short_desc' => 'nullable|string|max:500',
            'long_desc' => 'nullable|string',
            'brand' => 'nullable|string|max:255',
            'warranty_months' => 'nullable|integer|min:0',
            'base_price' => 'required|numeric|min:0',
            'currency' => 'required|string|in:IDR',
            'stock' => 'required|integer|min:0',
            'weight_gram' => 'required|integer|min:0',
            'length_mm' => 'nullable|integer|min:0',
            'width_mm' => 'nullable|integer|min:0',
            'height_mm' => 'nullable|integer|min:0',
            'bv' => 'nullable|numeric|min:0',
            'b_sponsor' => 'nullable|numeric|min:0',
            'b_matching' => 'nullable|numeric|min:0',
            'b_pairing' => 'nullable|numeric|min:0',
            'b_cashback' => 'nullable|numeric|min:0',
            'b_retail' => 'nullable|numeric|min:0',
            'is_active' => 'boolean',
            'categories' => 'array',
            'categories.*' => 'exists:categories,id',
            'images' => 'nullable|array|max:10',
            'images.*' => 'image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);
        $product->update($validated);

        $product->categories()->sync($validated['categories'] ?? []);

        // Process new image uploads
        if ($request->hasFile('images')) {
            $imageService = new ImageService;
            $imageService->uploadProductImages($product->id, $request->file('images'));
        }

        return redirect()->route('admin.products.index')
            ->with('success', 'Produk berhasil diperbarui');
    }

    public function destroy(Product $product)
    {
        // Delete all product images before deleting product
        $imageService = new ImageService;
        $imageService->deleteProductImages($product->id);

        $product->delete();

        return back()->with('success', 'Produk berhasil dihapus');
    }

    public function deleteImage(ProductMedia $media)
    {
        $imageService = new ImageService;
        $imageService->deleteImage($media);

        return back()->with('success', 'Gambar berhasil dihapus');
    }

    public function setPrimaryImage(Request $request, Product $product)
    {
        $validated = $request->validate([
            'media_id' => 'required|exists:product_media,id',
        ]);

        $imageService = new ImageService;
        $imageService->setImageAsPrimary($product->id, $validated['media_id']);

        return back()->with('success', 'Gambar utama berhasil diatur');
    }

    public function reorderImages(Request $request, Product $product)
    {
        $validated = $request->validate([
            'order' => 'required|array',
            'order.*' => 'exists:product_media,id',
        ]);

        $imageService = new ImageService;
        $imageService->reorderImages($product->id, $validated['order']);

        return back()->with('success', 'Urutan gambar berhasil diperbarui');
    }
}
