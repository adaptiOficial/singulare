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
            'username' => ['required', 'string', 'max:255'],
            'image' => ['required', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'content' => ['required', 'string', 'max:255'],
        ];
    }

    public function messages(): array
    {
        return [
            'username.required' => 'O nome é obrigatório.',
            'username.max' => 'O nome deve ter no máximo 255 caracteres.',

            'image.required' => 'A imagem é obrigatória.',
            'image.image' => 'O arquivo deve ser uma imagem válida.',
            'image.mimes' => 'A imagem deve ser do tipo: jpg, jpeg, png ou webp.',
            'image.max' => 'A imagem deve ter no máximo 2MB.',

            'content.required' => 'O feedback é obrigatório.',
            'content.max' => 'O feedback deve ter no máximo 255 caracteres.',
        ];
    }
}