'use client'

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/dialog'
import FormFieldsLinkWpp from './form-fields-linkWpp'
import { updateLinkWpp } from '@/actions/linkWpp'
import { filterFormData } from '@/services/filter-form-data'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'
import { linkWppType } from '@/types/linkWpp'
import { ResponseErrorType, api } from '@/services/api'

interface DialogUpdateLinkWppProps {
  id: string
  children: React.ReactNode
}

export function DialogUpdateLinkWpp({ id, children }: DialogUpdateLinkWppProps) {
  const [linkWpp, setLinkWpp] = useState<linkWppType | null>(null)
  const [open, setOpen] = useState<boolean>()
  const [error, setError] = useState<ResponseErrorType | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const requestData = async () => {
      const { response } = await api<linkWppType>('GET', `/link-wpp/${id}`)

      if (response) {
        setLinkWpp(response)
      } else {
        setLinkWpp(null)
        toast({
          title: 'Link não encontrado!',
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

    const error = await updateLinkWpp(newForm)
    if (error) {
      setError(await JSON.parse(error))
      toast({
        title: 'Não foi possível editar o link!',
      })
      return
    } else {
      toast({
        title: 'Link editado com sucesso!',
      })
    }
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar link</DialogTitle>
          <DialogDescription>
            Atualize as informações do link abaixo e clique em
            &quot;Salvar&quot; para aplicar as alterações.
          </DialogDescription>
        </DialogHeader>
        <form action={submit}>
          <FormFieldsLinkWpp error={error} linkWpp={linkWpp} />
        </form>
      </DialogContent>
    </Dialog>
  )
}