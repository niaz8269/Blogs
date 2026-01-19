<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $request->validate([
            'q' => 'required|string|min:2',
        ]);

        $query = Blog::with(['author', 'category', 'tags'])
            ->where('status', 'published')
            ->whereNotNull('published_at')
            ->where(function ($q) use ($request) {
                $q->where('title', 'like', "%{$request->q}%")
                  ->orWhere('excerpt', 'like', "%{$request->q}%")
                  ->orWhere('body', 'like', "%{$request->q}%");
            })
            ->orderBy('published_at', 'desc')
            ->paginate(15);

        return response()->json($query);
    }
}
