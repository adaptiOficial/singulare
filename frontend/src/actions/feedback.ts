'use server'

import { api } from '@/services/api'
import { revalidatePath } from 'next/cache'

export async function createFeedback(form: FormData) {
    const res = await api('POST', '/feedbacks', { data: form })

    if (!res.error) {
        revalidatePath('/admin/feedbacks')
    }

    return JSON.stringify(res)
}

export async function updateFeedback(form: FormData) {
    const res = await api('POST', `/feedbacks/${form.get('id')}`, {
        data: form,
    })

    if (!res.error) {
        revalidatePath('/admin/feedbacks')
    }

    return JSON.stringify(res)
}

export async function destroyFeedback(id: string) {
    const res = await api('DELETE', `/feedbacks/${id}`)

    if (!res.error) {
        revalidatePath('/admin/feedbacks')
    }

    return JSON.stringify(res)
}
