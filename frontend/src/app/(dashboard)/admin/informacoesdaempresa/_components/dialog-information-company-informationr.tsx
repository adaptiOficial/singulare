'use client'

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/dialog'
import FormFieldsCompanyInformation from './form-fields-company-information'

import SkeletonFormFieldsUser from './skeleton-users'
import { api } from '@/services/api'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'
import { companyInformationType } from '@/types/company-information'

interface DialogInformationUserProps {
  id: string
  children: React.ReactNode
  isInformation?: boolean
}

export function DialogInformationCompanyInformation({
  id,
  children,
}: DialogInformationUserProps) {
  const [companyInformation, setCompanyInformation] = useState<companyInformationType | null>(null)
  const [open, setOpen] = useState<boolean>()
  const { toast } = useToast()

  useEffect(() => {
    const requestData = async () => {
      const { response } = await api<companyInformationType>('GET', '/companyinformation')

      if (response) {
        setCompanyInformation(response)
      } else {
        setCompanyInformation(null)
        toast({
          title: 'Usuário não encontrado!',
        })
        setOpen(false)
      }
    }

    requestData()

    return () => setCompanyInformation(null)
  }, [id, open, toast])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Informações do usuário</DialogTitle>
          <DialogDescription>
            Visualize as informações detalhadas do usuário abaixo.
          </DialogDescription>
        </DialogHeader>
        {companyInformation ? (
          <FormFieldsCompanyInformation companyInformation={companyInformation} readOnly />
        ) : (
          <SkeletonFormFieldsUser readOnly />
        )}
      </DialogContent>
    </Dialog>
  )
}
