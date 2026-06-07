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
import { updatePrice } from '@/actions/price'
import { filterFormData } from '@/services/filter-form-data'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'
import { priceType } from '@/types/price'
import { ResponseErrorType, api } from '@/services/api'

interface DialogUpdatePriceProps {
  id: string
  children: React.ReactNode
}

export function DialogUpdatePrice({
  id,
  children,
}: DialogUpdatePriceProps) {
  const [price, setPrice] = useState<priceType | null>(null)
  const [open, setOpen] = useState<boolean>()
  const [error, setError] = useState<ResponseErrorType | null>(null)
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
    } else {
      setError(null)
    }
  }, [open, id, toast])

  const submit = async (form: FormData) => {
    setError(null)

    const newForm = await filterFormData(form)

    const error = await updatePrice(newForm)

    if (error) {
      setError(JSON.parse(error))
      toast({
        title: 'Não foi possível editar a imagem de preço!',
      })
      return
    }

    toast({
      title: 'Imagem de preço editada com sucesso!',
    })

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar imagem de preço</DialogTitle>

          <DialogDescription>
            Atualize a imagem abaixo e clique em
            &quot;Salvar&quot; para aplicar as alterações.
          </DialogDescription>
        </DialogHeader>

        <form action={submit}>
          <FormFieldsPrice error={error} price={price} />
        </form>
      </DialogContent>
    </Dialog>
  )
}