<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBlogRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->isAuthorOrAdmin();
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'excerpt' => 'required|string|max:500',
            'body' => 'required|string',
            'category_id' => 'nullable|exists:categories,id',
            'featured_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'tags' => 'nullable|array',
            'tags.*' => 'exists:tags,id',
            'status' => 'nullable|in:draft,pending',
        ];
    }
}
