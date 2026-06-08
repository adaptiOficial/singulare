<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateFacilitatorRequest extends FormRequest
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
            'name' => ['sometimes', 'string', 'min:3', 'max: 200'],
            'description' => ['sometimes', 'string', 'min:3', 'max:1500'],
            'image' => ['sometimes', 'image'],
        ];
    }

        public function messages()
    {
        return [
            'name.min' => 'O campo NOME deve conter no mínimo 3 caracteres',
            'name.max' => 'O campo NOME deve conter no máximo 200 caracteres',

            'description.min' => 'O campo DESCRIÇÃO deve conter no mínimo 3 caracteres.',
            'description.max' => 'O campo DESCRIÇÃO deve conter no máximo 1500 caracteres.',

            'image.image' => 'O campo IMAGEM deve conter apenas imagens.',
        ];
    }
}
