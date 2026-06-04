<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateFeedbackRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['sometimes', 'string', 'max:255'],
            'content' => ['sometimes', 'string', 'max:1000'],
            'role' => ['sometimes', 'string', 'max:255'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.string' => 'O nome deve ser um texto.',
            'name.max' => 'O nome deve ter no máximo 255 caracteres.',

            'content.string' => 'O feedback deve ser um texto.',
            'content.max' => 'O feedback deve ter no máximo 1000 caracteres.',

            'role.string' => 'O cargo deve ser um texto.',
            'role.max' => 'O cargo deve ter no máximo 255 caracteres.',
        ];
    }
}