'use client'

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/dialog'
import FormFieldsLinkWpp from './form-fields-linkWpp'
import { linkWppType } from '@/types/linkWpp'
import { api } from '@/services/api'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'

interface DialogInformationLinkWppProps {
  id: string
  children: React.ReactNode
  isInformation?: boolean
}

export function DialogInformationLinkWpp({
  id,
  children,
}: DialogInformationLinkWppProps) {
  const [linkWpp, setLinkWpp] = useState<linkWppType | null>(null)
  const [open, setOpen] = useState<boolean>()
  const { toast } = useToast()

  useEffect(() => {
    const requestData = async () => {
      const { response } = await api<linkWppType>('GET', `/link-wpp/${id}`)

      if (response) {
        setLinkWpp(response)
      } else {
        setLinkWpp(null)
        toast({
          title: 'Link não encontrado!',
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
          <DialogTitle>Informações do link</DialogTitle>
          <DialogDescription>
            Visualize as informações detalhadas do link abaixo.
          </DialogDescription>
        </DialogHeader>
        {linkWpp ? (
          <FormFieldsLinkWpp linkWpp={linkWpp} readOnly />
        ) : (
          <FormFieldsLinkWpp readOnly />
        )}
      </DialogContent>
    </Dialog>
  )
}