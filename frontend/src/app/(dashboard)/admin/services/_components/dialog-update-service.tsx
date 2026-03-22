'use client'

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/dialog'
import FormFieldsService from './form-fields-service'
import { updateService } from '@/actions/services'
import { filterFormData } from '@/services/filter-form-data'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'
import { serviceType } from '@/types/service'
import { ResponseErrorType, api } from '@/services/api'

interface DialogUpdateServiceProps {
  id: string
  children: React.ReactNode
}

export function DialogUpdateService({ id, children }: DialogUpdateServiceProps) {
  const [service, setService] = useState<serviceType | null>(null)
  const [open, setOpen] = useState<boolean>()
  const [error, setError] = useState<ResponseErrorType | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const requestData = async () => {
      const { response } = await api<serviceType>('GET', `/services/${id}`)

      if (response) {
        setService(response)
      } else {
        setService(null)
        toast({
          title: 'Serviço não encontrado!',
        })
        setOpen(false)
      }
    }

    if (open) {
      requestData()
    } else {
      setError(null)
    }
  }, [open, id, toast])

  const submit = async (form: FormData) => {
    setError(null)
    const newForm = await filterFormData(form)

    const error = await updateService( newForm)
    if (error) {
      setError(await JSON.parse(error))
      toast({
        title: 'Não foi possível editar o serviço!',
      })
      return
    } else {
      toast({
        title: 'Serviço editado com sucesso!',
      })
    }
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar serviço</DialogTitle>
          <DialogDescription>
            Atualize as informações do serviço abaixo e clique em
            &quot;Salvar&quot; para aplicar as alterações.
          </DialogDescription>
        </DialogHeader>
        <form action={submit}>
          <FormFieldsService error={error} service={service} />
        </form>
      </DialogContent>
    </Dialog>
  )
}