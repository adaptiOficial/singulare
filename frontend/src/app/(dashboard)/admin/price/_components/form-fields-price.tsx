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
import { priceType } from '@/types/price'
import { useState } from 'react'
import { useFormStatus } from 'react-dom'

interface FormFieldsPriceProps {
  price?: priceType | null
  readOnly?: boolean
  error?: ResponseErrorType | null
}

export default function FormFieldsPrice({
  price,
  readOnly,
  error,
}: FormFieldsPriceProps) {
  const { pending } = useFormStatus()
  const [updateImage, setUpdateImage] = useState<string | undefined>()

  return (
    <>
      <FormFieldsGroup>
        {price && (
          <Input defaultValue={price.id} type="text" name="id" hidden />
        )}

        <FormField>
          <Label
            htmlFor="image"
            hidden={readOnly && !price?.image}
            required={!price}
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
            src={updateImage || price?.image}
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