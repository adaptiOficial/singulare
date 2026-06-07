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
import { contentType } from '@/types/content'
import { api } from '@/services/api'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'

interface DialogInformationContentProps {
  id: string
  children: React.ReactNode
  isInformation?: boolean
}

export function DialogInformationContent({
  id,
  children,
}: DialogInformationContentProps) {
  const [content, setContent] = useState<contentType | null>(null)
  const [open, setOpen] = useState<boolean>()
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
    }
  }, [open, id, toast])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Informações do conteúdo</DialogTitle>
          <DialogDescription>
            Visualize as informações detalhadas do conteúdo abaixo.
          </DialogDescription>
        </DialogHeader>
        {content ? (
          <FormFieldsContent content={content} readOnly />
        ) : (
          <FormFieldsContent readOnly />
        )}
      </DialogContent>
    </Dialog>
  )
}