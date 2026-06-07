<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CourseRequest extends FormRequest
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
     * @return array
     */
    public function rules(): array
    {
        $postRules = [];
        $putRules  = [];

        $rules = [
            'title'           => ['string', 'min:3', 'max:255'],
            'primary_image'   => ['image'],
            'secondary_image' => ['image'],
            'primary_text'    => ['string', 'min:3', 'max:500'],
            'secondary_text'  => ['string', 'min:3', 'max:500'],
        ];

        if ($this->isMethod('post')) {
            $postRules = [
                'title'           => ['required'],
                'primary_image'   => ['required'],
                'primary_text'    => ['required'],
            ];
        }

        if ($this->isMethod('put') || $this->isMethod('patch')) {
            $putRules = [
                'title'           => ['sometimes'],
                'primary_image'   => ['sometimes'],
                'secondary_image' => ['sometimes'],
                'primary_text'    => ['sometimes'],
                'secondary_text'  => ['sometimes'],
            ];
        }

        return array_merge_recursive($rules, $postRules, $putRules);
    }

    /**
     * Custom error messages.
     */
    public function messages(): array
    {
        return [
            'title.required'           => 'O campo TÍTULO é obrigatório.',
            'title.min'                => 'O campo TÍTULO deve conter no mínimo 3 caracteres.',
            'title.max'                => 'O campo TÍTULO deve conter no máximo 255 caracteres.',
            'primary_image.required'   => 'A imagem PRINCIPAL é obrigatória.',
            'primary_image.image'      => 'A imagem PRINCIPAL deve ser um arquivo de imagem válido.',
            'secondary_image.image'    => 'A imagem SECUNDÁRIA deve ser um arquivo de imagem válido.',
            'primary_text.required'    => 'O campo TEXTO PRINCIPAL é obrigatório.',
            'primary_text.min'         => 'O campo TEXTO PRINCIPAL deve conter no mínimo 3 caracteres.',
            'secondary_text.min'       => 'O campo TEXTO SECUNDÁRIO deve conter no mínimo 3 caracteres.',
        ];
    }
}
