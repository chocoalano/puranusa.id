<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class DocumentationController extends Controller
{
    /**
     * Display documentation page.
     */
    public function index(): Response
    {
        return Inertia::render('Documentation/Index');
    }
}
