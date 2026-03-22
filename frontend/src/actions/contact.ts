'use server'

import { api } from '@/services/api'
import { revalidatePath } from 'next/cache'

export async function createContact(form: FormData) {
    const res = await api('POST', '/contacts', { data: form })

    if (!res.error) {
        revalidatePath('/admin/contatos')
    }

    return JSON.stringify(res)
}

export async function updateContactDone(form: FormData) {
    const res = await api('POST', `/contacts/${form.get('id')}`, {
        data: form,
    })

    if (!res.error) {
        revalidatePath('/admin/contatos')
    }

    return JSON.stringify(res)
}

