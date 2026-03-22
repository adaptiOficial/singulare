<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MyHistory>
 */
class MyHistoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'image' => $this->faker->imageUrl(),
            'text' => $this->faker->text(200),
            'mission' => $this->faker->text(200),
            'vision' => $this->faker->text(200),
            'value' => $this->faker->text(200),

        ];
    }
}