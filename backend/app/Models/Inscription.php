<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Inscription extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'nome',
        'email',
        'telefone',
        'cpf_cnpj',
        'quantidade_inscricoes',
        'ramo_atividade',
        'done'
    ];
}
