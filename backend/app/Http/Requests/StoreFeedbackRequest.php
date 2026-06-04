<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFeedbackRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string', 'max:1000'],
            'role' => ['required', 'string', 'max:255'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'O nome é obrigatório.',
            'name.max' => 'O nome deve ter no máximo 255 caracteres.',

            'content.required' => 'O feedback é obrigatório.',
            'content.max' => 'O feedback deve ter no máximo 1000 caracteres.',

            'role.required' => 'O cargo é obrigatório.',
            'role.max' => 'O cargo deve ter no máximo 255 caracteres.',
        ];
    }
}