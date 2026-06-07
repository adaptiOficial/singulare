<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Throwable;

class Price extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'image',
    ];

    protected static function booted()
    {
        self::deleted(function (Price $price) {
            try {
                $image_name = explode('price/', $price['image']);

                Storage::disk('public')->delete(
                    'price/' . $image_name[1]
                );
            } catch (Throwable) {
                //
            }
        });
    }
}