'use client'

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/dialog'
import FormFieldsBanner from './form-fields-banner'
import { updateBanner } from '@/actions/banners'
import { filterFormData } from '@/services/filter-form-data'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'
import { bannerType } from '@/types/banner'
import { ResponseErrorType, api } from '@/services/api'

interface DialogUpdateBannerProps {
  id: string
  children: React.ReactNode
}

export function DialogUpdateBanner({ id, children }: DialogUpdateBannerProps) {
  const [banner, setBanner] = useState<bannerType | null>(null)
  const [open, setOpen] = useState<boolean>()
  const [error, setError] = useState<ResponseErrorType | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const requestData = async () => {
      const { response } = await api<bannerType>('GET', `/banners/${id}`)

      if (response) {
        setBanner(response)
      } else {
        setBanner(null)
        toast({
          title: 'Banner não encontrado!',
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

    const error = await updateBanner(newForm)
    if (error) {
      setError(await JSON.parse(error))
      toast({
        title: 'Não foi possível editar o banner!',
      })
      return
    } else {
      toast({
        title: 'Banner editado com sucesso!',
      })
    }
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar banner</DialogTitle>
          <DialogDescription>
            Atualize as informações do banner abaixo e clique em
            &quot;Salvar&quot; para aplicar as alterações.
          </DialogDescription>
        </DialogHeader>
        <form action={submit}>
          <FormFieldsBanner error={error} banner={banner} />
        </form>
      </DialogContent>
    </Dialog>
  )
}