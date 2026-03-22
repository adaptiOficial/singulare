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
import { updateFeedback } from '@/actions/feedback'
import { filterFormData } from '@/services/filter-form-data'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'
import { feedbackType } from '@/types/feedback'
import { ResponseErrorType, api } from '@/services/api'
import SkeletonFormFieldsUser from '../../usuarios/_components/skeleton-users'

interface DialogUpdateFeedbackProps {
  id: string
  children: React.ReactNode
}

export function DialogUpdateFeedback({
  id,
  children,
}: DialogUpdateFeedbackProps) {
  const [feedback, setFeedback] = useState<feedbackType | null>(null)
  const [open, setOpen] = useState<boolean>()
  const [error, setError] = useState<ResponseErrorType | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const requestData = async () => {
      const { response } = await api<feedbackType>('GET', `/feedbacks/${id}`)

      if (response) {
        setFeedback(response)
      } else {
        setFeedback(null)
        toast({
          title: 'Feedback não encontrado!',
        })
        setOpen(false)
      }
    }

    if (open) {
      requestData()
    }

    return () => {
      setFeedback(null)
      setError(null)
    }
  }, [id, open, toast])

  const submit = async (form: FormData) => {
    const newForm = await filterFormData(form)

    const { error } = await JSON.parse(await updateFeedback(newForm))

    if (error) {
      setError(error)
      toast({
        title: 'Não foi possível editar o feedback!',
      })
    } else {
      toast({
        title: 'Feedback editado com sucesso!',
      })
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar feedback</DialogTitle>
          <DialogDescription>
            Atualize as informações abaixo e clique em "Salvar" para aplicar as
            alterações.
          </DialogDescription>
        </DialogHeader>

        <form action={submit}>
          {feedback ? (
            <FormFieldsFeedback error={error} feedback={feedback} />
          ) : (
            <SkeletonFormFieldsUser />
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}