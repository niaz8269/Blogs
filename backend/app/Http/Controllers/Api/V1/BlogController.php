<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBlogRequest;
use App\Http\Requests\UpdateBlogRequest;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class BlogController extends Controller
{
    public function index(Request $request)
    {
        $query = Blog::with(['author', 'category', 'tags']);

        // Public access - only show published blogs
        if (!$request->user()) {
            $query->where('status', 'published')
                  ->whereNotNull('published_at');
        } else {
            // Authenticated users can see their own blogs + published
            if (!$request->user()->isAdmin()) {
                $query->where(function ($q) use ($request) {
                    $q->where('status', 'published')
                      ->whereNotNull('published_at')
                      ->orWhere('user_id', $request->user()->id);
                });
            }
        }

        // Filter by category
        if ($request->has('category')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        // Filter by tag
        if ($request->has('tag')) {
            $query->whereHas('tags', function ($q) use ($request) {
                $q->where('slug', $request->tag);
            });
        }

        // Search
        if ($request->has('q')) {
            $search = $request->q;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('excerpt', 'like', "%{$search}%")
                  ->orWhere('body', 'like', "%{$search}%");
            });
        }

        // Filter by status (for authenticated users)
        if ($request->has('status') && $request->user()) {
            $query->where('status', $request->status);
        }

        $blogs = $query->orderBy('published_at', 'desc')
                      ->orderBy('created_at', 'desc')
                      ->paginate(15);

        return response()->json($blogs);
    }

    public function show(Request $request, $slug)
    {
        $blog = Blog::where('slug', $slug)->firstOrFail();
        
        // Check if user can view this blog
        if (!$request->user() || (!$request->user()->isAdmin() && $blog->user_id !== $request->user()->id)) {
            if ($blog->status !== 'published' || !$blog->published_at) {
                abort(404);
            }
        }

        // Increment views
        $blog->increment('views');

        $blog->load(['author', 'category', 'tags', 'comments.user', 'likes', 'bookmarks']);

        return response()->json([
            'data' => $blog,
            'likes_count' => $blog->likes()->count(),
            'comments_count' => $blog->comments()->count(),
            'is_liked' => auth()->check() ? $blog->likes()->where('user_id', auth()->id())->exists() : false,
            'is_bookmarked' => auth()->check() ? $blog->bookmarks()->where('user_id', auth()->id())->exists() : false,
        ]);
    }

    public function store(StoreBlogRequest $request)
    {
        $data = $request->validated();

        // Handle featured image upload
        if ($request->hasFile('featured_image')) {
            $data['featured_image'] = $request->file('featured_image')->store('blogs', 'public');
        }

        $data['user_id'] = $request->user()->id;
        $data['slug'] = Str::slug($data['title']);
        $data['status'] = $data['status'] ?? 'draft';

        $blog = Blog::create($data);

        // Attach tags
        if (isset($data['tags'])) {
            $blog->tags()->attach($data['tags']);
        }

        $blog->load(['author', 'category', 'tags']);

        return response()->json($blog, 201);
    }

    public function update(UpdateBlogRequest $request, Blog $blog)
    {
        $data = $request->validated();

        // Handle featured image upload
        if ($request->hasFile('featured_image')) {
            if ($blog->featured_image) {
                Storage::disk('public')->delete($blog->featured_image);
            }
            $data['featured_image'] = $request->file('featured_image')->store('blogs', 'public');
        }

        if (isset($data['title'])) {
            $data['slug'] = Str::slug($data['title']);
        }

        $blog->update($data);

        // Sync tags
        if (isset($data['tags'])) {
            $blog->tags()->sync($data['tags']);
        }

        $blog->load(['author', 'category', 'tags']);

        return response()->json($blog);
    }

    public function destroy(Blog $blog)
    {
        if ($blog->featured_image) {
            Storage::disk('public')->delete($blog->featured_image);
        }

        $blog->delete();

        return response()->json(['message' => 'Blog deleted successfully']);
    }
}
