'use client'

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/dialog'
import FormFieldsPrice from './form-fields-price'
import { priceType } from '@/types/price'
import { api } from '@/services/api'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'

interface DialogInformationPriceProps {
  id: string
  children: React.ReactNode
  isInformation?: boolean
}

export function DialogInformationPrice({
  id,
  children,
}: DialogInformationPriceProps) {
  const [price, setPrice] = useState<priceType | null>(null)
  const [open, setOpen] = useState<boolean>()
  const { toast } = useToast()

  useEffect(() => {
    const requestData = async () => {
      const { response } = await api<priceType>('GET', `/prices/${id}`)

      if (response) {
        setPrice(response)
      } else {
        setPrice(null)
        toast({
          title: 'Imagem de preço não encontrada!',
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
          <DialogTitle>Informações da imagem de preço</DialogTitle>
          <DialogDescription>
            Visualize a imagem cadastrada abaixo.
          </DialogDescription>
        </DialogHeader>

        {price ? (
          <FormFieldsPrice price={price} readOnly />
        ) : (
          <FormFieldsPrice readOnly />
        )}
      </DialogContent>
    </Dialog>
  )
}