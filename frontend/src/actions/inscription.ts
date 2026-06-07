'use server'

import { api } from '@/services/api'
import { revalidatePath } from 'next/cache'
import { getPhoneDigits } from '@/lib/phone'
import { getCpfDigits } from '@/lib/cpf'

export async function createInscription(form: FormData) {
    const nome_completo = form.get('nome_completo') as string
    const email = form.get('email') as string
    const telefone = form.get('telefone') as string
    const cpf_cnpj = form.get('cpf_cnpj') as string
    const quantidade_inscricoes = form.get('quantidade_inscricoes') as string
    const ramo_atividade = form.get('ramo_atividade') as string

    const cleanTelefone = getPhoneDigits(telefone)
    const cleanCpfCnpj = getCpfDigits(cpf_cnpj)
    const cleanQuantidade = quantidade_inscricoes ? Number(quantidade_inscricoes) : 0

    const data: Record<string, any> = {
        nome: nome_completo,
        email: email,
        telefone: cleanTelefone,
        cpf_cnpj: cleanCpfCnpj,
        quantidade_inscricoes: cleanQuantidade,
    }

    if (ramo_atividade) {
        data.ramo_atividade = ramo_atividade
    }

    const res = await api('POST', '/inscriptions', { data })

    if (!res.error) {
        revalidatePath('/admin/inscricoes')
    }

    return JSON.stringify(res)
}

export async function updateInscriptionDone(form: FormData) {
    const id = form.get('id') as string
    const done = form.get('done') as string

    const res = await api('PUT', `/inscriptions/${id}`, {
        data: {
            done
        }
    })

    if (!res.error) {
        revalidatePath('/admin/inscricoes')
    }

    return JSON.stringify(res)
}
