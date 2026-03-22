<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Throwable;

class MyHistory extends Model
{
    /** @use HasFactory<\Database\Factories\AddressFactory> */
    use HasFactory, HasUuids;
    protected $fillable = [
        'text',
        'mission',
        'vision',
        'value',
        'image',
    ];

    protected static function booted(){
        self::deleted(function (MyHistory $my_history){
            try{
                $image_name = explode('my-history/', $my_history['image']);
                Storage::disk('public')->delete('my-history/'.$image_name[1]);
            }catch(Throwable){}
        });
    }
}