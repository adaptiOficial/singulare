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
import { bannerType } from '@/types/banner'
import { useState } from 'react'
import { useFormStatus } from 'react-dom'

interface FormFieldsBannerProps {
  banner?: bannerType | null
  readOnly?: boolean
  error?: ResponseErrorType | null
}

export default function FormFieldsBanner({
  banner,
  readOnly,
  error,
}: FormFieldsBannerProps) {
  const { pending } = useFormStatus()
  const [updateImage, setUpdateImage] = useState<string | undefined>()

  return (
    <>
      <FormFieldsGroup>
        {banner && (
          <Input defaultValue={banner.id} type="text" name="id" hidden />
        )}
        <FormField>
          <Label htmlFor="text">Texto</Label>
          <Input
            name="text"
            id="text"
            placeholder="Insira o texto do banner"
            defaultValue={banner?.text}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.text}
          />
        </FormField>
        <FormField>
          <Label
            htmlFor="image"
            hidden={readOnly && !banner?.image}
            required={!banner}
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
            src={updateImage || banner?.image}
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