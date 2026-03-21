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
import { useFormStatus } from 'react-dom'
import { faqType } from '@/types/faq'


interface FormFieldsFaqProps {
  faq?: faqType
  readOnly?: boolean
  error?: ResponseErrorType | null
}

export default function FormFieldsFaq({
  faq,
  readOnly,
  error,
}: FormFieldsFaqProps) {
  const { pending } = useFormStatus()

  return (
    <>
      <FormFieldsGroup>
        {faq && <Input defaultValue={faq.id} type="text" name="id" hidden />}

        <FormField>
          <Label htmlFor="question" required={!faq}>
            Pergunta
          </Label>
          <Input
            name="question"
            id="question"
            placeholder="Digite a pergunta"
            defaultValue={faq?.question}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.question}
          />
        </FormField>

        <FormField>
          <Label htmlFor="answer" required={!faq}>
            Resposta
          </Label>
          <Input
            name="answer"
            id="answer"
            placeholder="Digite a resposta"
            defaultValue={faq?.answer}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.answer}
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