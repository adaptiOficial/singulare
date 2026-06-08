'use client'

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/dialog'
import FormFieldsCourse from './form-fields-course'
import { createCourse } from '@/actions/course'
import { filterFormData } from '@/services/filter-form-data'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'
import { ResponseErrorType } from '@/services/api'

interface DialogCreateCourseProps {
  children: React.ReactNode
}

export function DialogCreateCourse({ children }: DialogCreateCourseProps) {
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

    const erro = await createCourse(newForm)
    if (erro) {
      setError(await JSON.parse(erro))
      toast({
        title: 'Não foi possível criar o sobre o curso!',
      })
      return
    } else {
      toast({
        title: 'Sobre o curso criado com sucesso!',
      })
    }

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar sobre o curso</DialogTitle>
          <DialogDescription>
            Preencha as informações sobre o curso abaixo e clique em
            &rdquo;Salvar&rdquo; para incluí-lo no sistema.
          </DialogDescription>
        </DialogHeader>
        <div className='max-h-[70vh] overflow-y-auto pr-2'>
          <form action={submit}>
            <FormFieldsCourse error={error} />
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}