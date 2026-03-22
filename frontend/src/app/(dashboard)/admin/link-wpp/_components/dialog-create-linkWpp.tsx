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
import { createLinkWpp } from '@/actions/linkWpp'
import { filterFormData } from '@/services/filter-form-data'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'
import { ResponseErrorType } from '@/services/api'

interface DialogCreateLinkWppProps {
  children: React.ReactNode
}

export function DialogCreateLinkWpp({ children }: DialogCreateLinkWppProps) {
  const [open, setOpen] = useState<boolean>()
  const [error, setError] = useState<ResponseErrorType | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (!open) {
      setError(null)
    }
  }, [open])

  const submit = async (form: FormData) => {
    setError(null)
    const newForm = await filterFormData(form)

    const erro = await createLinkWpp(newForm)
    if (erro) {
      setError(await JSON.parse(erro))
      toast({
        title: 'Não foi possível criar o link!',
      })
      return
    } else {
      toast({
        title: 'Link criado com sucesso!',
      })
    }

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar link</DialogTitle>
          <DialogDescription>
            Preencha as informações do link abaixo e clique em
            &rdquo;Salvar&rdquo; para incluí-lo no sistema.
          </DialogDescription>
        </DialogHeader>
        <form action={submit}>
          <FormFieldsLinkWpp error={error} />
        </form>
      </DialogContent>
    </Dialog>
  )
}