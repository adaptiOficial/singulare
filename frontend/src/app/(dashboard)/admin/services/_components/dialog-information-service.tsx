'use client'

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/dialog'
import FormFieldsService from './form-fields-service'
import { serviceType } from '@/types/service'
import { api } from '@/services/api'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'

interface DialogInformationServiceProps {
  id: string
  children: React.ReactNode
  isInformation?: boolean
}

export function DialogInformationService({
  id,
  children,
}: DialogInformationServiceProps) {
  const [service, setService] = useState<serviceType | null>(null)
  const [open, setOpen] = useState<boolean>()
  const { toast } = useToast()

  useEffect(() => {
    const requestData = async () => {
      const { response } = await api<serviceType>('GET', `/services/${id}`)

      if (response) {
        setService(response)
      } else {
        setService(null)
        toast({
          title: 'Serviço não encontrado!',
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
          <DialogTitle>Informações do serviço</DialogTitle>
          <DialogDescription>
            Visualize as informações detalhadas do serviço abaixo.
          </DialogDescription>
        </DialogHeader>
        {service ? (
          <FormFieldsService service={service} readOnly />
        ) : (
          <FormFieldsService readOnly />
        )}
      </DialogContent>
    </Dialog>
  )
}