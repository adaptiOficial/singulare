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
import { linkWppType } from '@/types/linkWpp'
import { useFormStatus } from 'react-dom'

interface FormFieldsLinkWppProps {
  linkWpp?: linkWppType | null
  readOnly?: boolean
  error?: ResponseErrorType | null
}

export default function FormFieldsLinkWpp   ({
  linkWpp,
  readOnly,
  error,
}: FormFieldsLinkWppProps) {
  const { pending } = useFormStatus()

  return (
    <>
      <FormFieldsGroup>
        {linkWpp && (
          <Input defaultValue={linkWpp.id} type="text" name="id" hidden />
        )}
        <FormField>
          <Label htmlFor="link">Link</Label>
          <Input
            name="link"
            id="link"
            placeholder="Insira o link"
            defaultValue={linkWpp?.link}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.link}
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