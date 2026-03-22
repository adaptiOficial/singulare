'use server'

import { api } from '@/services/api'
import { revalidatePath } from 'next/cache'

export async function createFaq(form: FormData) {
    const res = await api('POST', '/faq', { data: form })

    if (!res.error) {
        revalidatePath('/admin/faq')
    }

    return JSON.stringify(res)
}

export async function updateFaq(form: FormData) {
    const res = await api('POST', `/faq/${form.get('id')}`, {
        data: form,
    })

    if (!res.error) {
        revalidatePath('/admin/faq')
    }

    return JSON.stringify(res)
}

export async function destroyFaq(id: string) {
    const res = await api('DELETE', `/faq/${id}`)

    if (!res.error) {
        revalidatePath('/admin/faq')
    }

    return JSON.stringify(res)
}
