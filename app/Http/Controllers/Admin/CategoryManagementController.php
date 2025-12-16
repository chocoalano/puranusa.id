<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CategoryManagementController extends Controller
{
    public function index(Request $request)
    {
        $categories = Category::query()
            ->with('parent')
            ->withCount('products')
            ->when($request->search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('slug', 'like', "%{$search}%");
            })
            ->when($request->status !== null, function ($query) use ($request) {
                $query->where('is_active', $request->status);
            })
            ->orderBy('sort_order')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/Categories/Index', [
            'categories' => $categories,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function create()
    {
        $parentCategories = Category::whereNull('parent_id')
            ->where('is_active', true)
            ->orderBy('name')
            ->get();

        return Inertia::render('Admin/Categories/Create', [
            'parentCategories' => $parentCategories,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'parent_id' => 'nullable|exists:categories,id',
            'slug' => 'required|unique:categories,slug',
            'name' => 'required|max:255',
            'description' => 'nullable',
            'sort_order' => 'integer|min:0',
            'is_active' => 'boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('categories', 'public');
        }

        Category::create($validated);

        return redirect()->route('admin.categories.index')
            ->with('success', 'Kategori berhasil ditambahkan');
    }

    public function edit(Category $category)
    {
        $parentCategories = Category::whereNull('parent_id')
            ->where('id', '!=', $category->id)
            ->where('is_active', true)
            ->orderBy('name')
            ->get();

        return Inertia::render('Admin/Categories/Edit', [
            'category' => $category,
            'parentCategories' => $parentCategories,
        ]);
    }

    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'parent_id' => 'nullable|exists:categories,id',
            'slug' => 'required|unique:categories,slug,'.$category->id,
            'name' => 'required|max:255',
            'description' => 'nullable',
            'sort_order' => 'integer|min:0',
            'is_active' => 'boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'remove_image' => 'nullable|boolean',
        ]);

        // Handle image removal
        if ($request->boolean('remove_image') && $category->image) {
            Storage::disk('public')->delete($category->image);
            $validated['image'] = null;
        }
        // Handle new image upload
        elseif ($request->hasFile('image')) {
            // Delete old image if exists
            if ($category->image) {
                Storage::disk('public')->delete($category->image);
            }
            $validated['image'] = $request->file('image')->store('categories', 'public');
        } else {
            // Keep existing image
            unset($validated['image']);
        }

        unset($validated['remove_image']);

        $category->update($validated);

        return redirect()->route('admin.categories.index')
            ->with('success', 'Kategori berhasil diperbarui');
    }

    public function destroy(Category $category)
    {
        if ($category->products()->count() > 0) {
            return back()->with('error', 'Kategori tidak dapat dihapus karena masih memiliki produk');
        }

        $category->delete();

        return back()->with('success', 'Kategori berhasil dihapus');
    }
}
