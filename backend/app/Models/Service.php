<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Throwable;

class Service extends Model
{
    /** @use HasFactory<\Database\Factories\AddressFactory> */
    use HasFactory, HasUuids;
    protected $fillable = [
        'title',
        'content',
        'image',
    ];

    protected static function booted(){
        self::deleted(function (Service $service) {
            try{
                $image_name = explode('service/', $service['image']);
                Storage::disk('public')->delete('service/'.$image_name[1]);
            }catch(Throwable){}
        });
    }
}