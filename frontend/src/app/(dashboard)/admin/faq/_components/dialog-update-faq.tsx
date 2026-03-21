'use client'

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/dialog'
import FormFieldsFaq from './form-fields-faq'
import { updateFaq } from '@/actions/faq'
import { filterFormData } from '@/services/filter-form-data'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'
import { ResponseErrorType, api } from '@/services/api'
import SkeletonFormFieldsUser from '../../usuarios/_components/skeleton-users'

interface FaqType {
  id: string
  question: string
  answer: string
}

interface DialogUpdateFaqProps {
  id: string
  children: React.ReactNode
}

export function DialogUpdateFaq({ id, children }: DialogUpdateFaqProps) {
  const [faq, setFaq] = useState<FaqType | null>(null)
  const [open, setOpen] = useState<boolean>()
  const [error, setError] = useState<ResponseErrorType | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const requestData = async () => {
      const { response } = await api<FaqType>('GET', `/faq/${id}`)

      if (response) {
        setFaq(response)
      } else {
        setFaq(null)
        toast({
          title: 'FAQ não encontrada!',
        })
        setOpen(false)
      }
    }

    if (open) {
      requestData()
    }

    return () => {
      setFaq(null)
      setError(null)
    }
  }, [id, open, toast])

  const submit = async (form: FormData) => {
    const newForm = await filterFormData(form)

    const { error } = await JSON.parse(await updateFaq(newForm))

    if (error) {
      setError(error)
      toast({
        title: 'Não foi possível editar a FAQ!',
      })
    } else {
      toast({
        title: 'FAQ editada com sucesso!',
      })
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar FAQ</DialogTitle>
          <DialogDescription>
            Atualize a pergunta e a resposta abaixo e clique em "Salvar" para
            aplicar as alterações.
          </DialogDescription>
        </DialogHeader>

        <form action={submit}>
          {faq ? (
            <FormFieldsFaq error={error} faq={faq} />
          ) : (
            <SkeletonFormFieldsUser />
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}