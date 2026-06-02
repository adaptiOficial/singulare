<?php

namespace App\Models;

use Fiber;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Override;
use Throwable;

class Facilitator extends Model
{
    /** @use HasFactory<\Database\Factories\FacilitatorFactory> */
    use HasFactory, HasUuids;
    protected $fillable = [
        'name',
        'description',
        'image',
    ];

    #[Override]
    protected static function booted()
    {
        self::deleted(function (Facilitator $facilitator) {
            try {
                $image_name = explode('facilitator/', $facilitator['image']);
                Storage::disk('public')->delete('facilitator/'.$image_name[1]);
            } catch(Throwable) {}
        });
    }
}
