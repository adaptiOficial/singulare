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
import { feedbackType } from '@/types/feedback'
import SkeletonFormFieldsUser from '../../usuarios/_components/skeleton-users'
import { api } from '@/services/api'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'

interface DialogInformationFeedbackProps {
  id: string
  children: React.ReactNode
  isInformation?: boolean
}

export function DialogInformationFeedback({
  id,
  children,
}: DialogInformationFeedbackProps) {
  const [feedback, setFeedback] = useState<feedbackType | null>(null)
  const [open, setOpen] = useState<boolean>()
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

    return () => setFeedback(null)
  }, [id, open, toast])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Informações do feedback</DialogTitle>
          <DialogDescription>
            Visualize os detalhes do feedback abaixo.
          </DialogDescription>
        </DialogHeader>

        {feedback ? (
          <FormFieldsFeedback feedback={feedback} readOnly />
        ) : (
          <SkeletonFormFieldsUser readOnly />
        )}
      </DialogContent>
    </Dialog>
  )
}