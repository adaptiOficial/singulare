<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Throwable;

class Banner extends Model
{
    /** @use HasFactory<\Database\Factories\AddressFactory> */
    use HasFactory, HasUuids;
    protected $fillable = [
        'title',
        'subtitle',
        'button_text',
        'image',
    ];

    protected static function booted(){
        self::deleted(function (Banner $banner) {
            try{
                $image_name = explode('banner/', $banner['image']);
                Storage::disk('public')->delete('banner/'.$image_name[1]);
            }catch(Throwable){}
        });
    }
}
