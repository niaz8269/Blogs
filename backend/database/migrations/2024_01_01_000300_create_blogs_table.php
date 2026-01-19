<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('blogs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('category_id')->nullable()->constrained()->nullOnDelete();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('excerpt', 500);
            $table->text('body');
            $table->string('featured_image')->nullable();
            $table->enum('status', ['draft', 'pending', 'published', 'rejected'])->default('draft');
            $table->timestamp('published_at')->nullable();
            $table->unsignedInteger('read_time')->default(1);
            $table->unsignedInteger('views')->default(0);
            $table->text('rejection_reason')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->index(['status', 'published_at']);
            $table->index('user_id');
        });

        Schema::create('blog_tag', function (Blueprint $table) {
            $table->foreignId('blog_id')->constrained()->cascadeOnDelete();
            $table->foreignId('tag_id')->constrained()->cascadeOnDelete();
            $table->primary(['blog_id', 'tag_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('blog_tag');
        Schema::dropIfExists('blogs');
    }
};
