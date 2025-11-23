<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Manage\Customer;
use App\Models\Manage\CustomerNetwork;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NetworkBinaryController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $position = $request->input('position');

        $query = CustomerNetwork::with(['member', 'upline'])
            ->whereIn('position', ['left', 'right'])
            ->when($search, function ($q) use ($search) {
                $q->whereHas('member', function ($subQ) use ($search) {
                    $subQ->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->when($position, fn ($q) => $q->where('position', $position))
            ->latest();

        $networks = $query->paginate(15);

        $statistics = [
            'total_members' => CustomerNetwork::whereIn('position', ['left', 'right'])->count(),
            'left_members' => CustomerNetwork::where('position', 'left')->count(),
            'right_members' => CustomerNetwork::where('position', 'right')->count(),
            'active_members' => CustomerNetwork::whereIn('position', ['left', 'right'])->where('status', 1)->count(),
        ];

        return Inertia::render('Admin/Networks/Binary', [
            'networks' => $networks,
            'statistics' => $statistics,
            'filters' => [
                'search' => $search,
                'position' => $position,
            ],
        ]);
    }

    public function tree(Request $request)
    {
        $rootId = $request->member_id ?? 1;

        $tree = $this->buildBinaryTree($rootId);

        return Inertia::render('Admin/Networks/Binary/Tree', [
            'tree' => $tree,
            'rootId' => $rootId,
        ]);
    }

    protected function buildBinaryTree($memberId, $depth = 0, $maxDepth = 5)
    {
        if ($depth >= $maxDepth) {
            return null;
        }

        $member = Customer::with(['networkPosition'])->find($memberId);

        if (! $member) {
            return null;
        }

        $left = CustomerNetwork::where('upline_id', $memberId)
            ->where('position', 'left')
            ->first();

        $right = CustomerNetwork::where('upline_id', $memberId)
            ->where('position', 'right')
            ->first();

        return [
            'id' => $member->id,
            'name' => $member->name,
            'email' => $member->email,
            'position' => $member->networkPosition->position ?? null,
            'left' => $left ? $this->buildBinaryTree($left->member_id, $depth + 1, $maxDepth) : null,
            'right' => $right ? $this->buildBinaryTree($right->member_id, $depth + 1, $maxDepth) : null,
        ];
    }
}
