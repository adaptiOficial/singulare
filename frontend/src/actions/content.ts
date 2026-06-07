'use server'

import { api } from '@/services/api'
import { revalidatePath } from 'next/cache'

export async function createContent(form: FormData) {
    const { error } = await api('POST', '/contents', { data: form })

    if (error) {
        return JSON.stringify(error)
    }

    revalidatePath('/admin/contents')
}

export async function updateContent(form: FormData) {
    const { error } = await api('POST', `/contents/${form.get('id')}`, {
        data: form,
    })

    if (error) {
        return JSON.stringify(error)
    }

    revalidatePath('/admin/contents')
}

export async function destroyContent(id: string) {
    await api('DELETE', `/contents/${id}`)
    revalidatePath('/admin/contents')
}