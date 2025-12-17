<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CustomerPackage;
use Inertia\Inertia;

class MemberPackageController extends Controller
{
    /**
     * Display a listing of member packages.
     */
    public function index()
    {
        $packages = CustomerPackage::query()
            ->orderBy('price', 'asc')
            ->get();

        return Inertia::render('settings/MemberPackage', [
            'packages' => $packages,
        ]);
    }
}
