<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeaturedPost extends Model
{
    use HasFactory;

    protected $fillable = ['blog_id', 'position', 'starts_at', 'ends_at'];

    protected $casts = [
        'starts_at' => 'datetime',
        'ends_at' => 'datetime',
    ];

    public function blog()
    {
        return $this->belongsTo(Blog::class);
    }
}
