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
import { myhistoryType } from '@/types/myhistory'
import { useState } from 'react'
import { useFormStatus } from 'react-dom'

interface FormFieldsMyHistoryProps {
  myhistory?: myhistoryType | null
  readOnly?: boolean
  error?: ResponseErrorType | null
}

export default function FormFieldsMyHistory ({
  myhistory,
  readOnly,
  error,
}: FormFieldsMyHistoryProps) {
  const { pending } = useFormStatus()
  const [updateImage, setUpdateImage] = useState<string | undefined>()

  return (
    <>
      <FormFieldsGroup>
        {myhistory && (
          <Input defaultValue={myhistory.id} type="text" name="id" hidden />
        )}
        <FormField>
          <Label htmlFor="text">Título</Label>
          <Input
            name="text"
            id="text"
            placeholder="Insira o texto da história"
            defaultValue={myhistory?.text}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.text}
          />
        </FormField>
        <FormField>
          <Label htmlFor="mission">Missão</Label>
          <Input
            name="mission"
            id="mission"
            type="mission"
            placeholder="Insira a missão da história"
            defaultValue={myhistory?.mission}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.mission}
          />
        </FormField>
        <FormField>
          <Label htmlFor="vision">Visão da história</Label>
          <Input
            name="vision"
            id="vision"
            type="vision"
            placeholder="Insira a visão da história"
            defaultValue={myhistory?.vision}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.vision}
          />
        </FormField>
        <FormField>
          <Label htmlFor="value">Insira o valor da história</Label>
          <Input
            name="value"
            id="value"
            type="values"
            placeholder="Insira o valor da história"
            defaultValue={myhistory?.value}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.value}
          />
        </FormField>
        <FormField>
          <Label
            htmlFor="image"
            hidden={readOnly && !myhistory?.image}
            required={!myhistory}
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
            src={updateImage || myhistory?.image}
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