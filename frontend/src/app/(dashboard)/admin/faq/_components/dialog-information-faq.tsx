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
import { api } from '@/services/api'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'
import SkeletonFormFieldsUser from '../../usuarios/_components/skeleton-users'

interface FaqType {
  id: string
  question: string
  answer: string
}

interface DialogInformationFaqProps {
  id: string
  children: React.ReactNode
  isInformation?: boolean
}

export function DialogInformationFaq({
  id,
  children,
}: DialogInformationFaqProps) {
  const [faq, setFaq] = useState<FaqType | null>(null)
  const [open, setOpen] = useState<boolean>()
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

    return () => setFaq(null)
  }, [id, open, toast])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Informações da FAQ</DialogTitle>
          <DialogDescription>
            Visualize a pergunta e a resposta cadastradas abaixo.
          </DialogDescription>
        </DialogHeader>

        {faq ? (
          <FormFieldsFaq faq={faq} readOnly />
        ) : (
          <SkeletonFormFieldsUser readOnly />
        )}
      </DialogContent>
    </Dialog>
  )
}