<?php

namespace App\Policies;

use App\Models\Blog;
use App\Models\User;

class BlogPolicy
{
    public function view(?User $user, Blog $blog): bool
    {
        return $blog->status === 'published' 
            || optional($user)->id === $blog->user_id 
            || optional($user)?->isAdmin();
    }

    public function create(User $user): bool
    {
        return $user->isAuthorOrAdmin();
    }

    public function update(User $user, Blog $blog): bool
    {
        return $user->isAdmin() || $blog->user_id === $user->id;
    }

    public function delete(User $user, Blog $blog): bool
    {
        return $user->isAdmin() || $blog->user_id === $user->id;
    }

    public function approve(User $user): bool
    {
        return $user->isAdmin();
    }
}
