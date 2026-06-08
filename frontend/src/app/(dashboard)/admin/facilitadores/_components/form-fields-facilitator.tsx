'use client'

import { Button } from '@/components/button'
import {
  FormFieldsGroup,
  FormField,
  ImageForm,
  handleImageChange,
} from '@/components/dashboard/form'
import { DialogFooter } from '@/components/dialog'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import { cn } from '@/lib/utils'
import { ResponseErrorType } from '@/services/api'
import { facilitatorType } from '@/types/facilitator'
import { useState } from 'react'
import { useFormStatus } from 'react-dom'

interface FormFieldsFacilitatorProps {
  facilitator?: facilitatorType | null
  readOnly?: boolean
  error?: ResponseErrorType | null
}

export default function FormFieldsFacilitator({
  facilitator,
  readOnly,
  error,
}: FormFieldsFacilitatorProps) {
  const { pending } = useFormStatus()
  const [updateImage, setUpdateImage] = useState<string | undefined>()

  return (
    <>
      <FormFieldsGroup>
        {facilitator && (
          <Input defaultValue={facilitator.id} type="text" name="id" hidden />
        )}
        <FormField>
          <Label
            htmlFor="name"
            required={!facilitator}
            hidden={readOnly && !facilitator?.image}
          >
            Nome
          </Label>
          <Input
            name="name"
            id="name"
            placeholder="Insira o nome do facilitador"
            defaultValue={facilitator?.name}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.name}
          />
        </FormField>
        <FormField>
          <Label
            htmlFor="description"
            required={!facilitator}
            hidden={readOnly && !facilitator?.image}
          >
            Descrição
          </Label>
          <Input
            name="description"
            id="description"
            placeholder="Insira a descrição"
            defaultValue={facilitator?.description}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.description}
          />
        </FormField>
        <FormField>
          <Label
            htmlFor="image"
            hidden={readOnly && !facilitator?.image}
            required={!facilitator}
          >
            Imagem
          </Label>
          <Input
            name="image"
            id="image"
            type="file"
            accept="image/*"
            disabled={pending}
            hidden={readOnly}
            onChange={(e) => handleImageChange(e, setUpdateImage)}
            error={error?.errors?.image}
          />
          <ImageForm
            className="aspect-square size-40"
            src={updateImage || facilitator?.image}
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
