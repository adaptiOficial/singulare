export type InscriptionData = {
    id?: string
    nome_completo: string
    email: string
    telefone: string
    cpf_cnpj: string
    quantidade_inscricoes: number
    ramo_atividade?: string
    done?: '0' | '1'
    created_at?: string
    updated_at?: string
}
