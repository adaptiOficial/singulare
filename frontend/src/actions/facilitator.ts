'use server'

import { api } from '@/services/api'
import { revalidatePath } from 'next/cache'

export async function createFacilitator(form: FormData) {
    const res = await api('POST', '/facilitator', {data: form})

    if (!res.error) {
        revalidatePath('/admin/facilitadores')
    }

    return JSON.stringify(res)
}

export async function updateFacilitator(form: FormData) {
    const res = await api('POST', `/facilitator/${form.get('id')}`, {
        data: form,
    })

    if (!res.error) {
        revalidatePath('/admin/facilitadores')
    }

    return JSON.stringify(res)
}

export async function destroyFacilitator(id: string) {
    const res = await api('DELETE', `/facilitator/${id}`)

    if (!res.error) {
        revalidatePath('/admin/facilitadores')
    }

    return JSON.stringify(res)
}
