<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CustomerNetworkMatrix;
use App\Models\Manage\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NetworkMatrixController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $level = $request->input('level');

        $query = CustomerNetworkMatrix::with(['member', 'sponsor'])
            ->when($search, function ($q) use ($search) {
                $q->whereHas('member', function ($subQ) use ($search) {
                    $subQ->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->when($level, fn ($q) => $q->where('level', $level))
            ->latest();

        $networks = $query->paginate(15);

        $statistics = [
            'total_members' => CustomerNetworkMatrix::count(),
            'level_1' => CustomerNetworkMatrix::where('level', 1)->count(),
            'level_2' => CustomerNetworkMatrix::where('level', 2)->count(),
            'level_3_plus' => CustomerNetworkMatrix::where('level', '>=', 3)->count(),
        ];

        return Inertia::render('Admin/Networks/Matrix', [
            'networks' => $networks,
            'statistics' => $statistics,
            'filters' => [
                'search' => $search,
                'level' => $level,
            ],
        ]);
    }

    public function tree(Request $request)
    {
        $rootId = $request->member_id ?? 1;

        $tree = $this->buildMatrixTree($rootId);

        return Inertia::render('Admin/Networks/Matrix/Tree', [
            'tree' => $tree,
            'rootId' => $rootId,
        ]);
    }

    protected function buildMatrixTree($memberId, $depth = 0, $maxDepth = 3)
    {
        if ($depth >= $maxDepth) {
            return null;
        }

        $member = Customer::find($memberId);

        if (! $member) {
            return null;
        }

        $downlines = CustomerNetworkMatrix::where('sponsor_id', $memberId)
            ->with('member')
            ->get();

        return [
            'id' => $member->id,
            'name' => $member->name,
            'email' => $member->email,
            'level' => $depth,
            'children' => $downlines->map(function ($downline) use ($depth, $maxDepth) {
                return $this->buildMatrixTree($downline->member_id, $depth + 1, $maxDepth);
            })->filter()->values()->toArray(),
        ];
    }
}
