'use client'

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/dialog'
import { updateContent } from '@/actions/content'
import { filterFormData } from '@/services/filter-form-data'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'
import { contentType } from '@/types/content'
import { ResponseErrorType, api } from '@/services/api'
import FormFieldsContent from './form-fields-content'

interface DialogUpdateContentProps {
  id: string
  children: React.ReactNode
}

export function DialogUpdateContent({ id, children }: DialogUpdateContentProps) {
  const [content, setContent] = useState<contentType | null>(null)
  const [open, setOpen] = useState<boolean>()
  const [error, setError] = useState<ResponseErrorType | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const requestData = async () => {
      const { response } = await api<contentType>('GET', `/contents/${id}`)

      if (response) {
        setContent(response)
      } else {
        setContent(null)
        toast({
          title: 'Conteúdo não encontrado!',
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

    const error = await updateContent( newForm)
    if (error) {
      setError(await JSON.parse(error))
      toast({
        title: 'Não foi possível editar o conteúdo!',
      })
      return
    } else {
      toast({
        title: 'Conteúdo editado com sucesso!',
      })
    }
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar conteúdo</DialogTitle>
          <DialogDescription>
            Atualize as informações do conteúdo abaixo e clique em
            &quot;Salvar&quot; para aplicar as alterações.
          </DialogDescription>
        </DialogHeader>
        <form action={submit}>
          <FormFieldsContent error={error} content={content} />
        </form>
      </DialogContent>
    </Dialog>
  )
}