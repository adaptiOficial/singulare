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
import { feedbackType } from '@/types/feedback'
import { useState } from 'react'
import { useFormStatus } from 'react-dom'


interface FormFieldsFeedbackProps {
  feedback?: feedbackType
  readOnly?: boolean
  error?: ResponseErrorType | null
}

export default function FormFieldsFeedback({
  feedback,
  readOnly,
  error,
}: FormFieldsFeedbackProps) {
  const { pending } = useFormStatus()
  const [updateImage, setUpdateImage] = useState<string | undefined>()

  return (
    <>
      <FormFieldsGroup>
        {feedback && (
          <Input defaultValue={feedback.id} type="text" name="id" hidden />
        )}

        <FormField>
          <Label htmlFor="username" required={!feedback}>
            Nome
          </Label>
          <Input
            name="username"
            id="username"
            placeholder="Digite o nome"
            defaultValue={feedback?.username}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.username}
          />
        </FormField>

        <FormField>
          <Label htmlFor="content" required={!feedback}>
            Feedback
          </Label>
          <Input
            name="content"
            id="content"
            placeholder="Digite o feedback"
            defaultValue={feedback?.content}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.content}
          />
        </FormField>

        <FormField>
          <Label htmlFor="image" hidden={readOnly && !feedback?.image}>
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
            src={updateImage || feedback?.image}
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