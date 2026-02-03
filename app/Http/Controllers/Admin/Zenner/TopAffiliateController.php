<?php

namespace App\Http\Controllers\Admin\Zenner;

use App\Http\Controllers\Controller;
use App\Services\Admin\Zenner\TopAffiliateService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TopAffiliateController extends Controller
{
    public function __construct(protected TopAffiliateService $service) {}

    public function index(Request $request)
    {
        $validated = $request->validate([
            'search' => 'nullable|string|max:255',
            'status' => 'nullable|in:active,inactive,all',
            'sort_by' => 'nullable|string|in:customer_name,rank,score,period',
            'sort_order' => 'nullable|string|in:asc,desc',
            'per_page' => 'nullable|integer|in:10,25,50,100',
        ]);

        $items = $this->service->paginate($validated, $validated['per_page'] ?? 25);

        return Inertia::render('Admin/Zenner/TopAffiliate/Index', [
            'items' => $items,
            'filters' => [
                'search' => $request->search,
                'status' => $request->status,
                'sort_by' => $validated['sort_by'] ?? 'rank',
                'sort_order' => $validated['sort_order'] ?? 'asc',
                'per_page' => $validated['per_page'] ?? 25,
            ],
        ]);
    }
}
