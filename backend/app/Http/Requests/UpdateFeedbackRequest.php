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
            'id' => ['required', 'uuid', 'exists:feedback,id'],

            'username' => ['sometimes', 'string', 'max:255'],
            'image' => ['sometimes', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'content' => ['sometimes', 'string', 'max:255'],
        ];
    }

    public function messages(): array
    {
        return [
            'id.required' => 'O identificador é obrigatório.',
            'id.uuid' => 'O identificador deve ser um UUID válido.',
            'id.exists' => 'O feedback não foi encontrado.',

            'username.string' => 'O nome deve ser um texto.',
            'username.max' => 'O nome deve ter no máximo 255 caracteres.',

            'image.image' => 'O arquivo deve ser uma imagem válida.',
            'image.mimes' => 'A imagem deve ser do tipo: jpg, jpeg, png ou webp.',
            'image.max' => 'A imagem deve ter no máximo 2MB.',

            'content.string' => 'O feedback deve ser um texto.',
            'content.max' => 'O feedback deve ter no máximo 255 caracteres.',
        ];
    }
}