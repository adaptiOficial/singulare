<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateContactRequest extends FormRequest
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
            'done' => ['required', 'in:0,1'],
        ];
    }

    public function messages(): array
    {
        return [
            'done.required' => 'O campo DONE é obrigatório.',
            'done.in' => 'O campo DONE deve ser 0 ou 1.',
        ];
    }
}