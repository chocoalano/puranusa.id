<?php

namespace App\Http\Controllers\Ecommerce;

use App\Http\Controllers\Controller;
use App\Models\Content;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ZennerClubController extends Controller
{
    public function show(Content $content)
    {
        $customer = Auth::guard('client')->user();
        if (! $customer || (int) $customer->status !== 3) {
            abort(403);
        }

        if ($content->status !== 'published') {
            abort(404);
        }

        $content->load('category');

        return Inertia::render('ecommerce/ZennerClub/ContentShow', [
            'item' => [
                'id' => $content->id,
                'title' => $content->title,
                'slug' => $content->slug,
                'content' => $content->content,
                'file' => $content->file,
                'vlink' => $content->vlink,
                'created_at' => $content->created_at,
                'category' => $content->category
                    ? [
                        'id' => $content->category->id,
                        'name' => $content->category->name,
                    ]
                    : null,
            ],
            'backUrl' => route('client.profile', ['tab' => 'zenner-club']),
        ]);
    }
}
