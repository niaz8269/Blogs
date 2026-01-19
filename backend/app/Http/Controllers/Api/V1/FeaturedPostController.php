<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\FeaturedPost;
use App\Models\Blog;
use Illuminate\Http\Request;

class FeaturedPostController extends Controller
{
    public function publicIndex()
    {
        $featured = FeaturedPost::with(['blog.author', 'blog.category'])
            ->whereHas('blog', function ($query) {
                $query->where('status', 'published');
            })
            ->orderBy('position')
            ->get();

        return response()->json(['data' => $featured]);
    }

    public function index(Request $request)
    {
        $this->authorize('approve', Blog::class);

        $featured = FeaturedPost::with(['blog.author', 'blog.category'])
            ->orderBy('position')
            ->get();

        return response()->json(['data' => $featured]);
    }

    public function store(Request $request)
    {
        $this->authorize('approve', Blog::class);

        $request->validate([
            'blog_id' => 'required|exists:blogs,id',
            'position' => 'nullable|integer|min:0',
        ]);

        $featured = FeaturedPost::create([
            'blog_id' => $request->blog_id,
            'position' => $request->position ?? 0,
        ]);

        $featured->load(['blog.author', 'blog.category']);

        return response()->json($featured, 201);
    }

    public function destroy(FeaturedPost $featuredPost)
    {
        $this->authorize('approve', Blog::class);

        $featuredPost->delete();

        return response()->json(['message' => 'Featured post removed']);
    }
}
