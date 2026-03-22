<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreContactRequest extends FormRequest
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
        return [
            'username' => ['required', 'string', 'min:3', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['required', 'string', 'min:8', 'max:20'],
            'message' => ['required', 'string', 'min:5', 'max:2000'],
        ];
    }

    public function messages(): array
    {
        return [
            'username.required' => 'O campo NOME é obrigatório.',
            'username.min' => 'O campo NOME deve ter no mínimo 3 caracteres.',
            'username.max' => 'O campo NOME deve ter no máximo 255 caracteres.',

            'email.required' => 'O campo EMAIL é obrigatório.',
            'email.email' => 'O campo EMAIL deve conter um email válido.',

            'phone.required' => 'O campo TELEFONE é obrigatório.',
            'phone.min' => 'O campo TELEFONE deve ter no mínimo 8 caracteres.',
            'phone.max' => 'O campo TELEFONE deve ter no máximo 20 caracteres.',

            'message.required' => 'O campo MENSAGEM é obrigatório.',
            'message.min' => 'A MENSAGEM deve ter no mínimo 5 caracteres.',
            'message.max' => 'A MENSAGEM deve ter no máximo 2000 caracteres.',
        ];
    }
}