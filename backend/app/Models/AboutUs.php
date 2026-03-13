<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Throwable;

class AboutUs extends Model
{
    /** @use HasFactory<\Database\Factories\AddressFactory> */
    use HasFactory, HasUuids;
    protected $fillable = [
        'text',
        'image',
    ];

    protected static function booted(){
        self::deleted(function (AboutUs $about_us){
            try{
                $image_name = explode('about-us/', $about_us['image']);
                Storage::disk('public')->delete('about-us/'.$image_name[1]);
            }catch(Throwable){}
        });
    }
}