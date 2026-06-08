'use client'

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/dialog'
import FormFieldsCourseUs from './form-fields-course'
import { updateCourse } from '@/actions/course'
import { filterFormData } from '@/services/filter-form-data'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'
import { courseType } from '@/types/course'
import { ResponseErrorType, api } from '@/services/api'
import FormFieldsCourse from './form-fields-course'

interface DialogUpdateCourseProps {
  id: string
  children: React.ReactNode
}

export function DialogUpdateCourse({ id, children }: DialogUpdateCourseProps) {
  const [course, setCourse] = useState<courseType | null>(null)
  const [open, setOpen] = useState<boolean>()
  const [error, setError] = useState<ResponseErrorType | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const requestData = async () => {
      const { response } = await api<courseType>('GET', `/courses/${id}`)

      if (response) {
        setCourse(response)
      } else {
        setCourse(null)
        toast({
          title: 'Sobre curso não encontrado!',
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

    const error = await updateCourse(newForm)
    if (error) {
      setError(await JSON.parse(error))
      toast({
        title: 'Não foi possível editar sobre o curso!',
      })
      return
    } else {
      toast({
        title: 'Sobre curso editado com sucesso!',
      })
    }
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar sobre o curso</DialogTitle>
          <DialogDescription>
            Atualize as informações sobre o curso abaixo e clique em
            &quot;Salvar&quot; para aplicar as alterações.
          </DialogDescription>
        </DialogHeader>
        <div className='max-h-[70vh] overflow-y-auto pr-2'>
          <form action={submit}>
            <FormFieldsCourse error={error} course={course} />
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}