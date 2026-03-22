
'use server'

import { api } from '@/services/api'
import { revalidatePath } from 'next/cache'



export async function updateCompanyInformation(form: FormData) {


    const newForm = new FormData()
    newForm.append('_method', 'PUT')

    for (const [key, value] of form.entries()) {
        newForm.append(key, value)
    }

    const res = await api('POST', `/companyinformation/${form.get('id')}`, {
        data: newForm,
    })

    console.log(res)



    if (!res.error) {
        revalidatePath('/admin/informacoesdaempresa')
    }

    return JSON.stringify(res)
}