<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;

class BlogApprovalController extends Controller
{
    public function submit(Request $request, Blog $blog)
    {
        if ($blog->user_id !== $request->user()->id && !$request->user()->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $blog->update(['status' => 'pending']);

        return response()->json(['message' => 'Blog submitted for approval', 'blog' => $blog]);
    }

    public function approve(Request $request, Blog $blog)
    {
        $request->user()->can('approve', Blog::class);

        $blog->update([
            'status' => 'published',
            'published_at' => now(),
        ]);

        return response()->json(['message' => 'Blog approved', 'blog' => $blog]);
    }

    public function reject(Request $request, Blog $blog)
    {
        $request->user()->can('approve', Blog::class);

        $request->validate([
            'reason' => 'nullable|string|max:500',
        ]);

        $blog->update([
            'status' => 'rejected',
            'rejection_reason' => $request->reason,
        ]);

        return response()->json(['message' => 'Blog rejected', 'blog' => $blog]);
    }
}
