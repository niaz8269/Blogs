<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use App\Models\Blog;
use App\Models\Comment;
use App\Policies\BlogPolicy;
use App\Policies\CommentPolicy;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        Blog::class => BlogPolicy::class,
        Comment::class => CommentPolicy::class,
    ];

    public function boot(): void
    {
        //
    }
}
