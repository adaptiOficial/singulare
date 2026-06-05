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
import { ResponseErrorType } from '@/services/api'
import { createFacilitator } from '@/actions/facilitator'
import FormFieldsFacilitator from './form-fields-facilitator'

interface DialogCreateFacilitatorProps {
  children: React.ReactNode
}

export function DialogCreateFacilitator({ children}: DialogCreateFacilitatorProps) {
  const [open, setOpen] = useState<boolean>()
  const [error, setError] = useState<ResponseErrorType | null>(null)
  const { toast } = useToast()

  useEffect ( () => {
    if (!open) {
      setError(null)
    }
  }, [open])

  const submit = async (form: FormData) => {
    setError(null)
    const newForm = await filterFormData(form)
    const { error } = await JSON.parse(await createFacilitator(newForm))

    if (error) {
      setError(error)
      toast({
        title: 'Não foi possível criar o facilitador!',
      })
    } else {
      toast({
        title: 'Facilitador criado com sucesso!',
      })
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar facilitador</DialogTitle>
          <DialogDescription>
            Preencha as informações do facilitador abaixo e clique em
            "Salvar" para incluí-lo no sistema.
          </DialogDescription>
        </DialogHeader>

        <form action={submit}>
          <FormFieldsFacilitator error={error} />
        </form>
      </DialogContent>
    </Dialog>
  )
}
