<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request, Blog $blog)
    {
        $request->validate([
            'body' => 'required|string|max:1000',
        ]);

        $comment = Comment::create([
            'blog_id' => $blog->id,
            'user_id' => $request->user()->id,
            'body' => $request->body,
        ]);

        $comment->load('user');

        return response()->json($comment, 201);
    }

    public function destroy(Comment $comment)
    {
        $comment->delete();

        return response()->json(['message' => 'Comment deleted successfully']);
    }
}
