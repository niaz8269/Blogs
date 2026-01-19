<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\User;
use App\Models\Comment;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function author(Request $request)
    {
        $user = $request->user();

        $stats = [
            'drafts' => Blog::where('user_id', $user->id)->where('status', 'draft')->count(),
            'pending' => Blog::where('user_id', $user->id)->where('status', 'pending')->count(),
            'published' => Blog::where('user_id', $user->id)->where('status', 'published')->count(),
            'total_views' => Blog::where('user_id', $user->id)->sum('views'),
            'total_likes' => Blog::where('user_id', $user->id)->withCount('likes')->get()->sum('likes_count'),
        ];

        $recentBlogs = Blog::where('user_id', $user->id)
            ->with(['category', 'tags'])
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        return response()->json([
            'stats' => $stats,
            'recent_blogs' => $recentBlogs,
        ]);
    }

    public function admin(Request $request)
    {
        $this->authorize('approve', Blog::class);

        $stats = [
            'total_users' => User::count(),
            'total_blogs' => Blog::count(),
            'pending_blogs' => Blog::where('status', 'pending')->count(),
            'published_blogs' => Blog::where('status', 'published')->count(),
            'total_comments' => Comment::count(),
        ];

        $pendingBlogs = Blog::where('status', 'pending')
            ->with(['author', 'category'])
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get();

        return response()->json([
            'stats' => $stats,
            'pending_blogs' => $pendingBlogs,
        ]);
    }
}
