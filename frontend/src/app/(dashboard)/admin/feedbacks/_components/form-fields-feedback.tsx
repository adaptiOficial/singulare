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
import { feedbackType } from '@/types/feedback'
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

  return (
    <>
      <FormFieldsGroup>
        {feedback && (
          <Input defaultValue={feedback.id} type="text" name="id" hidden />
        )}

        <FormField>
          <Label htmlFor="name" required={!feedback}>
            Nome
          </Label>
          <Input
            name="name"
            id="name"
            placeholder="Digite o nome"
            defaultValue={feedback?.name}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.name}
          />
        </FormField>

        <FormField>
          <Label htmlFor="role" required={!feedback}>
            Cargo
          </Label>
          <Input
            name="role"
            id="role"
            placeholder="Digite o cargo"
            defaultValue={feedback?.role}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.role}
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
      </FormFieldsGroup>

      <DialogFooter className={cn({ hidden: readOnly })}>
        <Button type="submit" pending={pending}>
          Salvar
        </Button>
      </DialogFooter>
    </>
  )
}