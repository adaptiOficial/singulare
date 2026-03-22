<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MyHistoryRequest extends FormRequest
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
            'mission' => ['string', 'max:200'],
            'vision' => ['string', 'min:3', 'max:200'],
            'value' => ['string', 'min:3', 'max:200'],
        ];

        if ($this->isMethod('post')) {
            $postRules = [
                'image' => ['required'],
                'text' => ['required'],
                'mission' => ['required'],
                'vision' => ['required'],
                'value' => ['required'],
            ];
        }
        if ($this->isMethod('put')) {
            $putRules = [
                'image' => ['sometimes'],
                'text' => ['sometimes'],
                'mission' => ['sometimes'],
                'vision' => ['sometimes'],
                'value' => ['sometimes'],
            ];
        }

        return array_merge_recursive($rules, $postRules, $putRules);
    }

    public function messages()
    {
        return [
            'text.required' => 'O campo TEXTO é obigatório.',
            'text.min' => 'O campo TEXTO deve conter no mínimo 3 caracteres.',
            'text.max' => 'O campo TEXTO no máximo 200 caracteres.',

            'mission.max' => 'O campo MISSÃO no máximo 200 caracteres.',
            'mission.required' => 'O campo MISSÃO é obrigatório.',

            'vision.min' => 'O campo VISÃO deve conter no mínimo 3 caracteres.',
            'vision.max' => 'O campo VISÃO no máximo 200 caracteres.',
            'vision.required' => 'O campo VISÃO é obrigatório.',

            'value.min' => 'O campo VALOR deve conter no mínimo 3 caracteres.',
            'value.max' => 'O campo VALOR no máximo 200 caracteres.',
            'value.required' => 'O campo VALOR é obrigatório.',


            'image.required' => 'O campo IMAGEM é obrigatório.',
            'image.image' => 'O campo IMAGEM deve conter apenas imagens.',
        ];
    }
}