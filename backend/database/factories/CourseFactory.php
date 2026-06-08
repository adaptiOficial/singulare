<?php

namespace Database\Factories;

use App\Models\Course;
use Illuminate\Database\Eloquent\Factories\Factory;

class CourseFactory extends Factory
{
    protected $model = Course::class;

    public function definition(): array
    {
        return [
            'title'           => $this->faker->sentence(4),
            'primary_image'   => $this->faker->imageUrl(),
            'primary_text'    => $this->faker->paragraph(),
            'secondary_image' => $this->faker->optional()->imageUrl(),
            'secondary_text'  => $this->faker->optional()->paragraph(),
        ];
    }
}
