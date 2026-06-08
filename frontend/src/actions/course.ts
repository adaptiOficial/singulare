'use server'

import { api } from '@/services/api'
import { revalidatePath } from 'next/cache'

export async function createCourse(form: FormData) {
    const { error } = await api('POST', '/courses', { data: form })

    if (error) {
        return JSON.stringify(error)
    }

    revalidatePath('/admin/courses')
}

export async function updateCourse(form: FormData) {
    const { error } = await api('POST', `/courses/${form.get('id')}`, {
        data: form,
    })

    if (error) {
        return JSON.stringify(error)
    }

    revalidatePath('/admin/courses')
}
