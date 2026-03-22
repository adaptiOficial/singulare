'use server'

import { api } from '@/services/api'
import { revalidatePath } from 'next/cache'

export async function createService(form: FormData) {
    const { error } = await api('POST', '/services', { data: form })

    if (error) {
        return JSON.stringify(error)
    }

    revalidatePath('/admin/services')
}

export async function updateService(form: FormData) {
    const { error } = await api('POST', `/services/${form.get('id')}`, {
        data: form,
    })

    if (error) {
        return JSON.stringify(error)
    }

    revalidatePath('/admin/services')
}

export async function destroyService(id: string) {
    await api('DELETE', `/services/${id}`)
    revalidatePath('/admin/services')
}