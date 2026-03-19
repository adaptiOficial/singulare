<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LinkWppRequest extends FormRequest
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
            'link' => ['required', 'string'],

        ];
        if ($this->isMethod('post')) {
            $postRules = [
                'link' => ['required'],
            ];
        }
        if ($this->isMethod('put')) {
            $putRules = [
                'link' => ['sometimes'],
            ];
        }

        return array_merge_recursive($postRules, $putRules, $rules);
    }

    public function messages()
    {
        return [
            'link.required' => 'O campo LINK é obrigatório.',
            'link.string' => 'O campo LINK deve ser um texto.',
 
        ];
    }
}