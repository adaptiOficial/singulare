<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Throwable;

class Course extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'title',
        'primary_image',
        'secondary_image',
        'primary_text',
        'secondary_text',
    ];

    /**
     * The "booted" method of the model.
     */
    protected static function booted()
    {
        self::deleted(function (Course $course) {
            try {
                // Delete primary image if exists
                if ($course->primary_image) {
                    $primary = explode('courses/', $course->primary_image);
                    Storage::disk('public')->delete('courses/' . $primary[1]);
                }
                // Delete secondary image if exists
                if ($course->secondary_image) {
                    $secondary = explode('courses/', $course->secondary_image);
                    Storage::disk('public')->delete('courses/' . $secondary[1]);
                }
            } catch (Throwable) {}
        });
    }
}
