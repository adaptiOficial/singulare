<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateInscriptionRequest extends FormRequest
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
            'nome' => ['sometimes', 'string', 'min:3', 'max:255'],
            'email' => ['sometimes', 'email', 'max:255'],
            'telefone' => ['sometimes', 'string', 'min:8', 'max:20'],
            'cpf_cnpj' => ['sometimes', 'string', 'min:11', 'max:20'],
            'quantidade_inscricoes' => ['sometimes', 'integer', 'min:1'],
            'ramo_atividade' => ['sometimes', 'string', 'min:3', 'max:255'],
        ];
    }

    public function messages(): array
    {
        return [
            'nome.string' => 'O campo NOME deve ser um texto.',
            'nome.min' => 'O campo NOME deve ter no mínimo 3 caracteres.',
            'nome.max' => 'O campo NOME deve ter no máximo 255 caracteres.',

            'email.email' => 'O campo EMAIL deve conter um email válido.',
            'email.max' => 'O campo EMAIL deve ter no máximo 255 caracteres.',

            'telefone.min' => 'O campo TELEFONE deve ter no mínimo 8 caracteres.',
            'telefone.max' => 'O campo TELEFONE deve ter no máximo 20 caracteres.',

            'cpf_cnpj.min' => 'O campo CPF/CNPJ deve ter no mínimo 11 caracteres.',
            'cpf_cnpj.max' => 'O campo CPF/CNPJ deve ter no máximo 20 caracteres.',

            'quantidade_inscricoes.integer' => 'O campo QUANTIDADE DE INSCRIÇÕES deve ser um número inteiro.',
            'quantidade_inscricoes.min' => 'O campo QUANTIDADE DE INSCRIÇÕES deve ser no mínimo 1.',

            'ramo_atividade.min' => 'O campo RAMO DE ATIVIDADE deve ter no mínimo 3 caracteres.',
            'ramo_atividade.max' => 'O campo RAMO DE ATIVIDADE deve ter no máximo 255 caracteres.',
        ];
    }
}
