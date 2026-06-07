'use client'

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/dialog'
import FormFieldsContent from './form-fields-content'
import { createContent } from '@/actions/content'
import { filterFormData } from '@/services/filter-form-data'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'
import { ResponseErrorType } from '@/services/api'

interface DialogCreateContentProps {
  children: React.ReactNode
}

export function DialogCreateContent({ children }: DialogCreateContentProps) {
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

    const erro = await createContent(newForm)
    if (erro) {
      setError(await JSON.parse(erro))
      toast({
        title: 'Não foi possível criar o conteúdo!',
      })
      return
    } else {
      toast({
        title: 'Conteúdo criado com sucesso!',
      })
    }

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar conteúdo</DialogTitle>
          <DialogDescription>
            Preencha as informações do conteúdo abaixo e clique em
            &rdquo;Salvar&rdquo; para incluí-lo no sistema.

            <ul>
              <li>Para adicionar um tópico, após a frase, utilize ";".</li>
              <li>Para adicionar um texto, utilize "|" antes dele.</li>
            </ul>

          </DialogDescription>
        </DialogHeader>
        <form action={submit}>
          <FormFieldsContent error={error} />
        </form>
      </DialogContent>
    </Dialog>
  )
}