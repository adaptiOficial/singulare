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
import { createFaq } from '@/actions/faq'
import { filterFormData } from '@/services/filter-form-data'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'
import { ResponseErrorType } from '@/services/api'

interface DialogCreateFaqProps {
  children: React.ReactNode
}

export function DialogCreateFaq({ children }: DialogCreateFaqProps) {
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

    const { error } = await JSON.parse(await createFaq(newForm))

    if (error) {
      setError(error)
      toast({
        title: 'Não foi possível criar a FAQ!',
      })
    } else {
      toast({
        title: 'FAQ criada com sucesso!',
      })
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar FAQ</DialogTitle>
          <DialogDescription>
            Preencha a pergunta e a resposta abaixo e clique em "Salvar" para
            adicioná-las ao sistema.
          </DialogDescription>
        </DialogHeader>

        <form action={submit}>
          <FormFieldsFaq error={error} />
        </form>
      </DialogContent>
    </Dialog>
  )
}