<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ServiceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $postRules = [];
        $putRules = [];

        $rules = [
            'image' => ['image'],
            'title' => ['string', 'min:3', 'max:80'],
            'content' => ['string', 'min:3', 'max:500'],
        ];

        if ($this->isMethod('post')) {
            $postRules = [
                'image' => ['required'],
                'title' => ['required'],
                'content' => ['required'],
            ];
        }
        if ($this->isMethod('put')) {
            $putRules = [
                'image' => ['sometimes'],
                'title' => ['sometimes'],
                'content' => ['sometimes'],
            ];
        }

        return array_merge_recursive($rules, $postRules, $putRules);
    }

    public function messages()
    {
        return [
            'title.required' => 'O campo TÍTULO é obrigatório.',
            'title.min' => 'O campo TÍTULO deve conter no mínimo 3 caracteres.',
            'title.max' => 'O campo TÍTULO no máximo 80 caracteres.',

            'image.required' => 'O campo IMAGEM é obrigatório.',
            'image.image' => 'O campo IMAGEM deve conter apenas imagens.',

            'content.required' => 'O campo CONTEÚDO é obrigatório.',
            'content.min' => 'O campo CONTEÚDO deve conter no mínimo 3 caracteres.',
            'content.max' => 'O campo CONTEÚDO no máximo 500 caracteres.',
        ];
    }
}