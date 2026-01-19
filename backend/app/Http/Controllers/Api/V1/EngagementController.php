<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\Like;
use App\Models\Bookmark;
use Illuminate\Http\Request;

class EngagementController extends Controller
{
    public function like(Request $request, Blog $blog)
    {
        $like = Like::firstOrCreate([
            'blog_id' => $blog->id,
            'user_id' => $request->user()->id,
        ]);

        return response()->json([
            'message' => 'Blog liked',
            'likes_count' => $blog->likes()->count(),
        ]);
    }

    public function unlike(Request $request, Blog $blog)
    {
        Like::where('blog_id', $blog->id)
            ->where('user_id', $request->user()->id)
            ->delete();

        return response()->json([
            'message' => 'Blog unliked',
            'likes_count' => $blog->likes()->count(),
        ]);
    }

    public function bookmark(Request $request, Blog $blog)
    {
        $bookmark = Bookmark::firstOrCreate([
            'blog_id' => $blog->id,
            'user_id' => $request->user()->id,
        ]);

        return response()->json([
            'message' => 'Blog bookmarked',
            'bookmarks_count' => $blog->bookmarks()->count(),
        ]);
    }

    public function unbookmark(Request $request, Blog $blog)
    {
        Bookmark::where('blog_id', $blog->id)
            ->where('user_id', $request->user()->id)
            ->delete();

        return response()->json([
            'message' => 'Blog unbookmarked',
            'bookmarks_count' => $blog->bookmarks()->count(),
        ]);
    }
}
