<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Promotion;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PromotionManagementController extends Controller
{
    public function index(Request $request)
    {
        $now = now();

        $promotions = Promotion::query()
            ->withCount('products')
            ->when($request->search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('code', 'like', "%{$search}%");
            })
            ->when($request->type, function ($query, $type) {
                $query->where('type', $type);
            })
            ->when($request->active !== null, function ($query) use ($request) {
                $query->where('is_active', $request->active);
            })
            ->orderBy($request->input('sort_by', 'created_at'), $request->input('sort_order', 'desc'))
            ->paginate(15)
            ->withQueryString();

        $statistics = [
            'total_active' => Promotion::where('is_active', true)
                ->where('start_at', '<=', $now)
                ->where('end_at', '>=', $now)
                ->count(),
            'total_scheduled' => Promotion::where('is_active', true)
                ->where('start_at', '>', $now)
                ->count(),
            'total_expired' => Promotion::where('end_at', '<', $now)
                ->count(),
        ];

        return Inertia::render('Admin/Promotions/Index', [
            'promotions' => $promotions,
            'statistics' => $statistics,
            'filters' => [
                'search' => $request->search,
                'type' => $request->type,
                'sort_by' => $request->input('sort_by', 'created_at'),
                'sort_order' => $request->input('sort_order', 'desc'),
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Promotions/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|unique:promotions,code',
            'name' => 'required|max:255',
            'type' => 'required|in:discount,bundle,flash_sale,promo',
            'landing_slug' => 'nullable|max:255',
            'description' => 'nullable',
            'image' => 'nullable|image|mimes:jpeg,png,gif,webp|max:2048',
            'start_at' => 'required|date',
            'end_at' => 'required|date|after:start_at',
            'is_active' => 'boolean',
            'priority' => 'integer|min:0',
            'max_redemption' => 'nullable|integer|min:0',
            'per_user_limit' => 'nullable|integer|min:0',
            'conditions_json' => 'nullable|json',
            'show_on' => 'nullable|in:homepage,product_page,checkout',
            'page' => 'nullable|in:home,product,category,cart',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('promotions', 'public');
        }

        Promotion::create($validated);

        return redirect()->route('admin.promotions.index')
            ->with('success', 'Promosi berhasil ditambahkan');
    }

    public function edit(Promotion $promotion)
    {
        return Inertia::render('Admin/Promotions/Edit', [
            'promotion' => $promotion,
        ]);
    }

    public function update(Request $request, Promotion $promotion)
    {
        $validated = $request->validate([
            'code' => 'required|unique:promotions,code,'.$promotion->id,
            'name' => 'required|max:255',
            'type' => 'required|in:discount,bundle,flash_sale,promo',
            'landing_slug' => 'nullable|max:255',
            'description' => 'nullable',
            'image' => 'nullable|image|mimes:jpeg,png,gif,webp|max:2048',
            'start_at' => 'required|date',
            'end_at' => 'required|date|after:start_at',
            'is_active' => 'boolean',
            'priority' => 'integer|min:0',
            'max_redemption' => 'nullable|integer|min:0',
            'per_user_limit' => 'nullable|integer|min:0',
            'conditions_json' => 'nullable|json',
            'show_on' => 'nullable|in:homepage,product_page,checkout',
            'page' => 'nullable|in:home,product,category,cart',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($promotion->image && \Storage::disk('public')->exists($promotion->image)) {
                \Storage::disk('public')->delete($promotion->image);
            }
            $validated['image'] = $request->file('image')->store('promotions', 'public');
        }

        $promotion->update($validated);

        return redirect()->route('admin.promotions.index')
            ->with('success', 'Promosi berhasil diperbarui');
    }

    public function destroy(Promotion $promotion)
    {
        $promotion->delete();

        return back()->with('success', 'Promosi berhasil dihapus');
    }
}
