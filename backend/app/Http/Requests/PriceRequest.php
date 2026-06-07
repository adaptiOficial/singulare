<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PriceRequest extends FormRequest
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
     */
    public function rules(): array
    {
        $postRules = [];
        $putRules = [];

        $rules = [
            'image' => ['image'],
        ];

        if ($this->isMethod('post')) {
            $postRules = [
                'image' => ['required'],
            ];
        }

        if ($this->isMethod('put')) {
            $putRules = [
                'image' => ['sometimes'],
            ];
        }

        return array_merge_recursive($rules, $postRules, $putRules);
    }

    public function messages()
    {
        return [
            'image.required' => 'O campo IMAGEM é obrigatório.',
            'image.image' => 'O campo IMAGEM deve conter apenas imagens.',
        ];
    }
}