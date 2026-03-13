<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AboutUsRequest extends FormRequest
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
            'text' => ['string', 'min:3', 'max:200'],
        ];

        if ($this->isMethod('post')) {
            $postRules = [
                'image' => ['required'],
                'text' => ['required'],
            ];
        }
        if ($this->isMethod('put')) {
            $putRules = [
                'image' => ['sometimes'],
                'text' => ['sometimes'],
            ];
        }

        return array_merge_recursive($rules, $postRules, $putRules);
    }

    public function messages()
    {
        return [
            'text.required' => 'O campo TEXTO é obrigatório.',
            'text.min' => 'O campo TEXTO deve conter no mínimo 3 caracteres.',
            'text.max' => 'O campo TEXTO deve conter no máximo 200 caracteres.',
            'image.required' => 'O campo IMAGEM é obrigatório.',
            'image.image' => 'O campo IMAGEM deve conter apenas imagens.',
        ];
    }
}