<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TagController extends Controller
{
    public function index()
    {
        $tags = Tag::withCount('blogs')->get();
        return response()->json(['data' => $tags]);
    }

    public function store(Request $request)
    {
        $request->user()->can('approve', \App\Models\Blog::class);

        $request->validate([
            'name' => 'required|string|max:255|unique:tags',
        ]);

        $tag = Tag::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
        ]);

        return response()->json($tag, 201);
    }
}
