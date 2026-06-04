<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreInscriptionRequest extends FormRequest
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
            'nome' => ['required', 'string', 'min:3', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'telefone' => ['required', 'string', 'min:8', 'max:20'],
            'cpf_cnpj' => ['required', 'string', 'min:11', 'max:20'],
            'quantidade_inscricoes' => ['required', 'integer', 'min:1'],
            'ramo_atividade' => ['required', 'string', 'min:3', 'max:255'],
        ];
    }

    public function messages(): array
    {
        return [
            'nome.required' => 'O campo NOME é obrigatório.',
            'nome.min' => 'O campo NOME deve ter no mínimo 3 caracteres.',
            'nome.max' => 'O campo NOME deve ter no máximo 255 caracteres.',

            'email.required' => 'O campo EMAIL é obrigatório.',
            'email.email' => 'O campo EMAIL deve conter um email válido.',
            'email.max' => 'O campo EMAIL deve ter no máximo 255 caracteres.',

            'telefone.required' => 'O campo TELEFONE é obrigatório.',
            'telefone.min' => 'O campo TELEFONE deve ter no mínimo 8 caracteres.',
            'telefone.max' => 'O campo TELEFONE deve ter no máximo 20 caracteres.',

            'cpf_cnpj.required' => 'O campo CPF/CNPJ é obrigatório.',
            'cpf_cnpj.min' => 'O campo CPF/CNPJ deve ter no mínimo 11 caracteres.',
            'cpf_cnpj.max' => 'O campo CPF/CNPJ deve ter no máximo 20 caracteres.',

            'quantidade_inscricoes.required' => 'O campo QUANTIDADE DE INSCRIÇÕES é obrigatório.',
            'quantidade_inscricoes.integer' => 'O campo QUANTIDADE DE INSCRIÇÕES deve ser um número inteiro.',
            'quantidade_inscricoes.min' => 'O campo QUANTIDADE DE INSCRIÇÕES deve ser no mínimo 1.',

            'ramo_atividade.required' => 'O campo RAMO DE ATIVIDADE é obrigatório.',
            'ramo_atividade.min' => 'O campo RAMO DE ATIVIDADE deve ter no mínimo 3 caracteres.',
            'ramo_atividade.max' => 'O campo RAMO DE ATIVIDADE deve ter no máximo 255 caracteres.',
        ];
    }
}
