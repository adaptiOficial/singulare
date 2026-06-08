'use client'

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/dialog'
import { filterFormData } from '@/services/filter-form-data'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'
import { api, ResponseErrorType } from '@/services/api'
import { updateFacilitator } from '@/actions/facilitator'
import FormFieldsFacilitator from './form-fields-facilitator'
import { facilitatorType } from '@/types/facilitator'
import SkeletonFormFieldsFacilitator from './skeleton-facilitator'

interface DialogUpdateFacilitatorProps {
  id: string
  children: React.ReactNode
}

export function DialogUpdateFacilitator({
  id,
  children,
}: DialogUpdateFacilitatorProps) {
  const [facilitator, setFacilitator] = useState<facilitatorType | null>(null)
  const [open, setOpen] = useState<boolean>()
  const [error, setError] = useState<ResponseErrorType | null>(null)
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

    requestData()

    return () => {
      setFacilitator(null)
      setError(null)
    }
  }, [open, id, toast])

  const submit = async (form: FormData) => {
    const newForm = await filterFormData(form)
    const { error } = await JSON.parse(await updateFacilitator(newForm))

    if (error) {
      setError(error)
      toast({
        title: 'Não foi possível editar o facilitador!',
      })
    } else {
      toast({
        title: 'Facilitador editado com sucesso!',
      })
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar facilitador</DialogTitle>
          <DialogDescription>
            Atualize as informações do facilitador abaixo e clique em
            "Salvar" para aplicar as alterações.
          </DialogDescription>
        </DialogHeader>
        <form action={submit}>
          {facilitator ? (
            <FormFieldsFacilitator facilitator={facilitator} error={error} />
          ) : (
            <SkeletonFormFieldsFacilitator />
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}
