'use server'

import { api } from '@/services/api'
import { revalidatePath } from 'next/cache'

export async function createMyHistory(form: FormData) {
    const { error } = await api('POST', '/my-histories', { data: form })

    if (error) {
        return JSON.stringify(error)
    }

    revalidatePath('/admin/my-histories')
}

export async function updateMyHistory(form: FormData) {
    const { error } = await api('POST', `/my-histories/${form.get('id')}`, {
        data: form,
    })

    if (error) {
        return JSON.stringify(error)
    }

    revalidatePath('/admin/my-histories')
}
