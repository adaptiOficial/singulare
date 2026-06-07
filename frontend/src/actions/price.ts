'use server'

import { api } from '@/services/api'
import { revalidatePath } from 'next/cache'

export async function createPrice(form: FormData) {
    const { error } = await api('POST', '/prices', { data: form })

    if (error) {
        return JSON.stringify(error)
    }

    revalidatePath('/admin/prices')
}

export async function updatePrice(form: FormData) {
    const { error } = await api('POST', `/prices/${form.get('id')}`, {
        data: form,
    })

    if (error) {
        return JSON.stringify(error)
    }

    revalidatePath('/admin/prices')
}

export async function destroyPrice(id: string) {
    await api('DELETE', `/prices/${id}`)
    revalidatePath('/admin/prices')
}