'use client'

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/dialog'

import FormFieldsCompanyInformation from './form-fields-company-information'
import { updateCompanyInformation } from '@/actions/company-information'
import { filterFormData } from '@/services/filter-form-data'

import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'

import { companyInformationType } from '@/types/company-information'
import { ResponseErrorType, api } from '@/services/api'

import SkeletonFormFieldsUser from './skeleton-users'

interface DialogUpdateUserProps {
  id: string
  children: React.ReactNode
}

export function DialogUpdateCompanyInformation({ id, children }: DialogUpdateUserProps) {
  const [companyInformation, setCompanyInformation] =
    useState<companyInformationType | null>(null)

  const [open, setOpen] = useState<boolean>()
  const [error, setError] = useState<ResponseErrorType | null>(null)

  const { toast } = useToast()

  useEffect(() => {
    const requestData = async () => {
      const { response } = await api<companyInformationType>(
        'GET',
        '/companyinformation',
      )

      if (response) {
        setCompanyInformation(response)
      } else {
        setCompanyInformation(null)
        toast({
          title: 'Informação não encontrada!',
        })
        setOpen(false)
      }
    }

    requestData()

    return () => {
      setCompanyInformation(null)
      setError(null)
    }
  }, [id, open, toast])

  const submit = async (form: FormData) => {
    

    const { error } = await JSON.parse(
      await updateCompanyInformation(form),
    )

    if (error) {
      setError(error)

      toast({
        title: 'Não foi possível editar as informações!',
      })
    } else {
      toast({
        title: 'Informações atualizadas com sucesso!',
      })

      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar informações da empresa</DialogTitle>
          <DialogDescription>
            Atualize as informações abaixo e clique em
            &quot;Salvar&quot; para aplicar as alterações.
          </DialogDescription>
        </DialogHeader>

        <form action={submit}>
          {companyInformation ? (
            <FormFieldsCompanyInformation
              error={error}
              companyInformation={companyInformation}
            />
          ) : (
            <SkeletonFormFieldsUser />
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}