<?php

namespace App\Http\Controllers\Admin\Zenner;

use App\Http\Controllers\Controller;
use App\Services\Admin\Zenner\LeaderboardEntryService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeaderboardEntryController extends Controller
{
    public function __construct(protected LeaderboardEntryService $service) {}

    public function index(Request $request)
    {
        $validated = $request->validate([
            'search' => 'nullable|string|max:255',
            'status' => 'nullable|in:active,inactive,all',
            'config_id' => 'nullable|integer',
            'sort_by' => 'nullable|string|in:customer_name,rank,score',
            'sort_order' => 'nullable|string|in:asc,desc',
            'per_page' => 'nullable|integer|in:10,25,50,100',
        ]);

        $items = $this->service->paginate($validated, $validated['per_page'] ?? 25);

        return Inertia::render('Admin/Zenner/LeaderboardEntry/Index', [
            'items' => $items,
            'filters' => [
                'search' => $request->search,
                'status' => $request->status,
                'config_id' => $request->config_id,
                'sort_by' => $validated['sort_by'] ?? 'rank',
                'sort_order' => $validated['sort_order'] ?? 'asc',
                'per_page' => $validated['per_page'] ?? 25,
            ],
        ]);
    }

    public function show(int $id)
    {
        $item = $this->service->findOrFail($id);
        return Inertia::render('Admin/Zenner/LeaderboardEntry/Show', ['item' => $item]);
    }
}
