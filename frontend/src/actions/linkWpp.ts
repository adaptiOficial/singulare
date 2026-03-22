'use server'

import { api } from '@/services/api'
import { revalidatePath } from 'next/cache'

export async function createLinkWpp(form: FormData) {
    const { error } = await api('POST', '/link-wpp', { data: form })

    if (error) {
        return JSON.stringify(error)
    }

    revalidatePath('/admin/link-wpp')
}

export async function updateLinkWpp(form: FormData) {
    const { error } = await api('POST', `/link-wpp/${form.get('id')}`, {
        data: form,
    })

    if (error) {
        return JSON.stringify(error)
    }

    revalidatePath('/admin/link-wpp')
}
