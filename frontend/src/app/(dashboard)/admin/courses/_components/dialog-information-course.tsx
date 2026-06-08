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
import { courseType } from '@/types/course'
import { api } from '@/services/api'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'

interface DialogInformationCourseProps {
  id: string
  children: React.ReactNode
  isInformation?: boolean
}

export function DialogInformationCourse({
  id,
  children,
}: DialogInformationCourseProps) {
  const [course, setCourse] = useState<courseType | null>(null)
  const [open, setOpen] = useState<boolean>()
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
    }
  }, [open, id, toast])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Informações sobre o curso</DialogTitle>
          <DialogDescription>
            Visualize as informações detalhadas sobre o curso abaixo.
          </DialogDescription>
        </DialogHeader>
        {course ? (
          <FormFieldsCourse course={course} readOnly />
        ) : (
          <FormFieldsCourse readOnly />
        )}
      </DialogContent>
    </Dialog>
  )
}