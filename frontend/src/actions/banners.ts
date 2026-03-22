'use server'

import { api } from '@/services/api'
import { revalidatePath } from 'next/cache'

export async function createBanner(form: FormData) {
    const { error } = await api('POST', '/banners', { data: form })

    if (error) {
        return JSON.stringify(error)
    }

    revalidatePath('/admin/banners')
}

export async function updateBanner(form: FormData) {
    const { error } = await api('POST', `/banners/${form.get('id')}`, {
        data: form,
    })

    if (error) {
        return JSON.stringify(error)
    }

    revalidatePath('/admin/banners')
}

export async function destroyBanner(id: string) {
    await api('DELETE', `/banners/${id}`)
    revalidatePath('/admin/banners')
}