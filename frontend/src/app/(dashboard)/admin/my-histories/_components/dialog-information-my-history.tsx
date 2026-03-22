'use client'

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/dialog'
import FormFieldsMyHistory from './form-fields-my-history'
import { myhistoryType } from '@/types/myhistory'
import { api } from '@/services/api'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'

interface DialogInformationMyHistoryProps {
  id: string
  children: React.ReactNode
  isInformation?: boolean
}

export function DialogInformationMyHistory({
  id,
  children,
}: DialogInformationMyHistoryProps) {
  const [myhistory, setMyHistory] = useState<myhistoryType | null>(null)
  const [open, setOpen] = useState<boolean>()
  const { toast } = useToast()

  useEffect(() => {
    const requestData = async () => {
      const { response } = await api<myhistoryType>('GET', `/my-histories/${id}`)

      if (response) {
        setMyHistory(response)
      } else {
        setMyHistory(null)
        toast({
          title: 'História não encontrada!',
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
          <DialogTitle>Informações da história</DialogTitle>
          <DialogDescription>
            Visualize as informações detalhadas da história abaixo.
          </DialogDescription>
        </DialogHeader>
        {myhistory ? (
          <FormFieldsMyHistory myhistory={myhistory} readOnly />
        ) : (
          <FormFieldsMyHistory readOnly />
        )}
      </DialogContent>
    </Dialog>
  )
}