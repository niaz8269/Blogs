<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::withCount('blogs')->get();
        return response()->json(['data' => $categories]);
    }

    public function store(Request $request)
    {
        $request->user()->can('approve', \App\Models\Blog::class);

        $request->validate([
            'name' => 'required|string|max:255|unique:categories',
            'description' => 'nullable|string',
        ]);

        $category = Category::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'description' => $request->description,
        ]);

        return response()->json($category, 201);
    }

    public function show(Category $category)
    {
        $category->load('blogs.author');
        return response()->json(['data' => $category]);
    }
}
