'use client'

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/dialog'
import FormFieldsMyHistory from './form-fields-my-history'
import { createMyHistory } from '@/actions/my-histories'
import { filterFormData } from '@/services/filter-form-data'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'
import { ResponseErrorType } from '@/services/api'

interface DialogCreateMyHistoryProps {
  children: React.ReactNode
}

export function DialogCreateMyHistory({ children }: DialogCreateMyHistoryProps) {
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

    const erro = await createMyHistory(newForm)
    if (erro) {
      setError(await JSON.parse(erro))
      toast({
        title: 'Não foi possível criar a história!',
      })
      return
    } else {
      toast({
        title: 'História criada com sucesso!',
      })
    }

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar história</DialogTitle>
          <DialogDescription>
            Preencha as informações da história abaixo e clique em
            &rdquo;Salvar&rdquo; para incluí-la no sistema.
          </DialogDescription>
        </DialogHeader>
        <form action={submit}>
          <FormFieldsMyHistory error={error} />
        </form>
      </DialogContent>
    </Dialog>
  )
}