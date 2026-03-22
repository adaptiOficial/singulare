'use client'

import { Button } from '@/components/button'
import {
  FormFieldsGroup,
  FormField,
} from '@/components/dashboard/form'
import { DialogFooter } from '@/components/dialog'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import { cn } from '@/lib/utils'
import { ResponseErrorType } from '@/services/api'
import { companyInformationType } from '@/types/company-information'
import { useFormStatus } from 'react-dom'

interface FormFieldsCompanyInformationProps {
  companyInformation?: companyInformationType
  readOnly?: boolean
  error?: ResponseErrorType | null
}

export default function FormFieldsCompanyInformation({
  companyInformation,
  readOnly,
  error,
}: FormFieldsCompanyInformationProps) {
  const { pending } = useFormStatus()

  return (
    <>
      <FormFieldsGroup>
        {companyInformation && (
          <Input
            defaultValue={companyInformation.id}
            type="text"
            name="id"
            hidden
          />
        )}

        <FormField>
          <Label htmlFor="address" required={!companyInformation}>
            Endereço
          </Label>
          <Input
            name="address"
            id="address"
            placeholder="Digite o endereço da empresa"
            defaultValue={companyInformation?.address}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.address}
          />
        </FormField>

        <FormField>
          <Label htmlFor="instagram">
            Instagram
          </Label>
          <Input
            name="instagram"
            id="instagram"
            placeholder="https://instagram.com/empresa"
            defaultValue={companyInformation?.instagram}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.instagram}
          />
        </FormField>

        <FormField>
          <Label htmlFor="email">
            E-mail
          </Label>
          <Input
            name="email"
            id="email"
            type="email"
            placeholder="contato@empresa.com"
            defaultValue={companyInformation?.email}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.email}
          />
        </FormField>

        <FormField>
          <Label htmlFor="phone" required={!companyInformation}>
            Telefone
          </Label>
          <Input
            name="phone"
            id="phone"
            placeholder="(27) 99999-9999"
            defaultValue={companyInformation?.phone}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.phone}
          />
        </FormField>
      </FormFieldsGroup>

      <DialogFooter className={cn({ hidden: readOnly })}>
        <Button type="submit" pending={pending}>
          Salvar
        </Button>
      </DialogFooter>
    </>
  )
}