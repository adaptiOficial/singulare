<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CompanyInformation>
 */
class CompanyInformationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            
            'address' => fake()->address(),
            'email' => fake()->unique()->safeEmail(),
            'instagram' => $this->faker->url(),
            'phone' => fake()->phoneNumber(),
            'about_us' => fake()->paragraph(),
            
        ];
    }
}
