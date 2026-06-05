<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFacilitatorRequest extends FormRequest
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
        return [
            'name' => ['required', 'string', 'min:3', 'max: 200'],
            'description' => ['required', 'string', 'min:3', 'max:1500'],
            'image' => ['required', 'image'],
        ];
    }

        public function messages()
    {
        return [
            'name.required' => 'O campo NOME é obrigatório',
            'name.min' => 'O campo NOME deve conter no mínimo 3 caracteres',
            'name.max' => 'O campo NOME no máximo 200 caracteres',

            'description.required' => 'O campo DESCRIÇÃO é obigatório.',
            'description.min' => 'O campo DESCRIÇÃO deve conter no mínimo 3 caracteres.',
            'description.max' => 'O campo DESCRIÇÃO no máximo 1500 caracteres.',

            'image.required' => 'O campo IMAGEM é obrigatório.',
            'image.image' => 'O campo IMAGEM deve conter apenas imagens.',
        ];
    }
}
