<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Throwable;

class Content extends Model
{
    /** @use HasFactory<\Database\Factories\ContentFactory> */
    use HasFactory, HasUuids;

    protected $table = 'content';

    protected $fillable = [
        'text',
        'image',
    ];

    protected static function booted(){
        self::deleted(function (Content $content) {
            try{
                $image_name = explode('content/', $content['image']);
                Storage::disk('public')->delete('content/'.$image_name[1]);
            }catch(Throwable){}
        });
    }
}