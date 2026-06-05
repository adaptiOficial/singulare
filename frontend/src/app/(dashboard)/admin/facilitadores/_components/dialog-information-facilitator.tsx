'use client'

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/dialog'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'
import { api } from '@/services/api'
import FormFieldsFacilitator from './form-fields-facilitator'
import { facilitatorType } from '@/types/facilitator'

interface DialogInformationFacilitatorProps {
  id: string
  children: React.ReactNode
  isInformation?: boolean
}

export function DialogInformationFacilitator({
  id,
  children,
}: DialogInformationFacilitatorProps) {
  const [facilitator, setFacilitator] = useState<facilitatorType | null>(null)
  const [open, setOpen] = useState<boolean>()
  const { toast } = useToast()

  useEffect ( () => {
    const requestData = async () => {
      const { response } = await api<facilitatorType>('GET', `/facilitator/${id}`)

      if (response) {
        setFacilitator(response)
      } else {
        setFacilitator(null)
        toast({
          title: 'Facilitador não encontrado!',
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
          <DialogTitle>Informações do facilitador</DialogTitle>
          <DialogDescription>
            Visualize as informações do facilitador abaixo.
          </DialogDescription>
        </DialogHeader>
        {facilitator ? (
          <FormFieldsFacilitator facilitator={facilitator} readOnly />
        ) : (
          <FormFieldsFacilitator readOnly />
        )}
      </DialogContent>
    </Dialog>
  )
}
