<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCompanyInformationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'address' => ['sometimes', 'string', 'min:5', 'max:255'],
            'instagram' => ['sometimes', 'nullable', 'url'],
            'email' => ['sometimes', 'nullable', 'email'],
            'phone' => ['sometimes', 'string', 'min:8', 'max:25'],
            'about_us' => ['sometimes', 'string', 'min:5', 'max:255'],
        ];
    }

    public function messages()
    {
        return [
            'address.min' => 'O campo ENDEREÇO deve conter no mínimo 5 caracteres.',
            'address.max' => 'O campo ENDEREÇO deve conter no máximo 255 caracteres.',

            'instagram.url' => 'O campo INSTAGRAM deve conter uma URL válida.',

            'email.email' => 'O campo EMAIL deve conter um email válido.',

            'phone.min' => 'O campo TELEFONE deve conter no mínimo 8 caracteres.',
            'phone.max' => 'O campo TELEFONE deve conter no máximo 20 caracteres.',
            
            'about_us.min' => 'O campo SOBRE A EMPRESA deve conter no mínimo 5 caracteres.',
            'about_us.max' => 'O campo SOBRE A EMPRESA deve conter no máximo 255 caracteres.',

        ];
    }
}
