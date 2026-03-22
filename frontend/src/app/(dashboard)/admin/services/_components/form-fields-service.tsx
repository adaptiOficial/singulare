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
import { serviceType } from '@/types/service'
import { useState } from 'react'
import { useFormStatus } from 'react-dom'

interface FormFieldsServiceProps {
  service?: serviceType | null
  readOnly?: boolean
  error?: ResponseErrorType | null
}

export default function FormFieldsService({
  service,
  readOnly,
  error,
}: FormFieldsServiceProps) {
  const { pending } = useFormStatus()
  const [updateImage, setUpdateImage] = useState<string | undefined>()

  return (
    <>
      <FormFieldsGroup>
        {service && (
          <Input defaultValue={service.id} type="text" name="id" hidden />
        )}
        <FormField>
          <Label htmlFor="title">Título</Label>
          <Input
            name="title"
            id="title"
            placeholder="Insira o título do serviço"
            defaultValue={service?.title}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.title}
          />
        </FormField>
        <FormField>
          <Label htmlFor="content">Subtítulo</Label>
          <Input
            name="content"
            id="content"
            type="content"
            placeholder="Insira o subtítulo do serviço"
            defaultValue={service?.content}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.content}
          />
        </FormField>
        <FormField>
          <Label
            htmlFor="image"
            hidden={readOnly && !service?.image}
            required={!service}
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
            src={updateImage || service?.image}
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