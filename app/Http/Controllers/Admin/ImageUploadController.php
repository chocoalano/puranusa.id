<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImageUploadController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:5120', // 5MB
        ]);

        $image = $request->file('image');
        $filename = Str::ulid().'.'.$image->getClientOriginalExtension();
        $path = $image->storeAs('articles/images', $filename, 'public');

        return response()->json([
            'url' => Storage::url($path),
            'path' => $path,
        ]);
    }
}
