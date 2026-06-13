<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MoreInformation>
 */
class MoreInformationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'numero_turma' => '17',
            'dias' => '15 e 22 de agosto de 2026',
            'inicio' => '8:00 horas',
            'encerramento' => '18:00 horas',
            'local' => 'Rua João Nardoto, 92, Bairro Jaqueline - São Mateus - ES (OAB)',
        ];
    }
}
