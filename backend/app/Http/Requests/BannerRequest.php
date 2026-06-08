<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BannerRequest extends FormRequest
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
            'title' => ['string', 'min:3', 'max:200'],
            'subtitle' => ['nullable', 'string', 'max:255'],
            'button_text' => ['nullable', 'string', 'max:50'],
            'image' => ['image'],
        ];

        if ($this->isMethod('post')) {
            $postRules = [
                'title' => ['required'],
                'image' => ['required'],
            ];
        }
        if ($this->isMethod('put')) {
            $putRules = [
                'title' => ['sometimes'],
                'image' => ['sometimes'],
            ];
        }

        return array_merge_recursive($rules, $postRules, $putRules);
    }

    public function messages()
    {
        return [
            'title.required' => 'O campo TÍTULO é obrigatório.',
            'title.min' => 'O campo TÍTULO deve conter no mínimo 3 caracteres.',
            'title.max' => 'O campo TÍTULO deve conter no máximo 200 caracteres.',

            'image.required' => 'O campo IMAGEM é obrigatório.',
            'image.image' => 'O campo IMAGEM deve conter apenas imagens.',
        ];
    }
}
