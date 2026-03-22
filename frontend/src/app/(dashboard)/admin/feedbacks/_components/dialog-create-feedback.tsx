'use client'

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/dialog'
import FormFieldsFeedback from './form-fields-feedback'
import { createFeedback } from '@/actions/feedback'
import { filterFormData } from '@/services/filter-form-data'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'
import { ResponseErrorType } from '@/services/api'

interface DialogCreateFeedbackProps {
  children: React.ReactNode
}

export function DialogCreateFeedback({
  children,
}: DialogCreateFeedbackProps) {
  const [open, setOpen] = useState<boolean>()
  const [error, setError] = useState<ResponseErrorType | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (!open) {
      setError(null)
    }
  }, [open])

  const submit = async (form: FormData) => {
    const newForm = await filterFormData(form)

    const { error } = await JSON.parse(await createFeedback(newForm))

    if (error) {
      setError(error)
      toast({
        title: 'Não foi possível criar o feedback!',
      })
    } else {
      toast({
        title: 'Feedback criado com sucesso!',
      })
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar feedback</DialogTitle>
          <DialogDescription>
            Preencha as informações abaixo e clique em "Salvar" para cadastrar o
            feedback.
          </DialogDescription>
        </DialogHeader>

        <form action={submit}>
          <FormFieldsFeedback error={error} />
        </form>
      </DialogContent>
    </Dialog>
  )
}