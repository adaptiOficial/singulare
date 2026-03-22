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
import { bannerType } from '@/types/banner'
import { api } from '@/services/api'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'

interface DialogInformationBannerProps {
  id: string
  children: React.ReactNode
  isInformation?: boolean
}

export function DialogInformationBanner({
  id,
  children,
}: DialogInformationBannerProps) {
  const [banner, setBanner] = useState<bannerType | null>(null)
  const [open, setOpen] = useState<boolean>()
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
    }
  }, [open, id, toast])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Informações do banner</DialogTitle>
          <DialogDescription>
            Visualize as informações detalhadas do banner abaixo.
          </DialogDescription>
        </DialogHeader>
        {banner ? (
          <FormFieldsBanner banner={banner} readOnly />
        ) : (
          <FormFieldsBanner readOnly />
        )}
      </DialogContent>
    </Dialog>
  )
}