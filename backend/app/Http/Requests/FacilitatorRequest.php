<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FacilitatorRequest extends FormRequest
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
            'name' => ['string', 'min:3', 'max: 200'],
            'description' => ['string', 'min:3', 'max:500'],
            'image' => ['image'],
        ];

        if ($this->isMethod('post')) {
            $postRules = [
                'name' => ['required'],
                'description' => ['required'],
                'image' => ['required'],
            ];
        }

        if ($this->isMethod('put')) {
            $putRules = [
                'name' => ['sometimes'],
                'description' => ['sometimes'],
                'image' => ['sometimes'],
            ];
        }

        return array_merge_recursive($rules, $postRules, $putRules);
    }

        public function messages()
    {
        return [
            'name.required' => 'O campo NOME é obrigatório',
            'name.min' => 'O campo NOME deve conter no mínimo 3 caracteres',
            'name.max' => 'O campo NOME no máximo 200 caracteres',

            'description.required' => 'O campo DESCRIÇÃO é obigatório.',
            'description.min' => 'O campo DESCRIÇÃO deve conter no mínimo 3 caracteres.',
            'description.max' => 'O campo DESCRIÇÃO no máximo 500 caracteres.',

            'image.required' => 'O campo IMAGEM é obrigatório.',
            'image.image' => 'O campo IMAGEM deve conter apenas imagens.',
        ];
    }
}
