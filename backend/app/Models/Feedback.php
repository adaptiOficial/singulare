<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Throwable;

class Feedback extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'username',
        'image',
        'content',
    ];

    protected static function booted()
    {
        self::deleted(function (Feedback $feedback) {
            try {
                if ($feedback->image) {
                    $image_name = explode('feedback/', $feedback->image);
                    Storage::disk('public')->delete('feedback/' . $image_name[1]);
                }
            } catch (Throwable) {
                // evita quebra caso dê erro ao deletar imagem
            }
        });
    }
}