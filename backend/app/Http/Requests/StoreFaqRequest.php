<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFaqRequest extends FormRequest
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
            'question' => ['required', 'string', 'min:5', 'max:255'],
            'answer' => ['required', 'string', 'min:5', 'max:1000'],
        ];
    }

    public function messages(): array
    {
        return [
            'question.required' => 'A PERGUNTA é obrigatória.',
            'question.min' => 'A PERGUNTA deve ter no mínimo 5 caracteres.',
            'question.max' => 'A PERGUNTA deve ter no máximo 255 caracteres.',

            'answer.required' => 'A RESPOSTA é obrigatória.',
            'answer.min' => 'A RESPOSTA deve ter no mínimo 5 caracteres.',
            'answer.max' => 'A RESPOSTA deve ter no máximo 1000 caracteres.',
        ];
    }
}