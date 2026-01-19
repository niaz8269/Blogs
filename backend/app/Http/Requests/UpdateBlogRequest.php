<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBlogRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->isAdmin() || $this->route('blog')->user_id === $this->user()->id;
    }

    public function rules(): array
    {
        return [
            'title' => 'sometimes|required|string|max:255',
            'excerpt' => 'sometimes|required|string|max:500',
            'body' => 'sometimes|required|string',
            'category_id' => 'nullable|exists:categories,id',
            'featured_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'tags' => 'nullable|array',
            'tags.*' => 'exists:tags,id',
            'status' => 'nullable|in:draft,pending,published,rejected',
        ];
    }
}
