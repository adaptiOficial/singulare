'use client'

import { Course } from '@/app/(site)/_components/course'
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
import { courseType } from '@/types/course'
import { useState } from 'react'
import { useFormStatus } from 'react-dom'

interface FormFieldsCourseProps {
  course?: courseType | null
  readOnly?: boolean
  error?: ResponseErrorType | null
}

export default function FormFieldsCourse({
  course,
  readOnly,
  error,
}: FormFieldsCourseProps) {
  const { pending } = useFormStatus()
  const [primaryImage, setUpdatePrimaryImage] = useState<string | undefined>()
  const [secondaryImage, setUpdateSecondaryImage] = useState<string | undefined>()


  return (
    <>
      <FormFieldsGroup>
        {course && (
          <Input defaultValue={course.id} type="text" name="id" hidden />
        )}
        <FormField>
          <Label htmlFor="title">Título</Label>
          <Input
            name="title"
            id="title"
            placeholder="Insira o título"
            defaultValue={course?.title}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.text}
          />
        </FormField>

        <FormField>
          <Label htmlFor="primary_text">Texto</Label>
          <Input
            name="primary_text"
            id="primary_text"
            placeholder="Insira o texto"
            defaultValue={course?.primary_text}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.text}
          />
        </FormField>

        <FormField>
          <Label
            htmlFor="primary_image"
            hidden={readOnly && !course?.primary_image}
            required={!course}
          >
            Imagem
          </Label>
          <Input
            name="primary_image"
            id="primary_image"
            type="file"
            accept="image/*"
            disabled={pending}
            hidden={readOnly}
            onChange={(e) => handleImageChange(e, setUpdatePrimaryImage)}
            error={error?.errors?.image}
          />
          <ImageForm
            className="aspect-square size-40"
            src={primaryImage || course?.primary_image}
          />
        </FormField>

        <FormField>
          <Label htmlFor="secondary_text">Texto</Label>
          <Input
            name="secondary_text"
            id="secondary_text"
            placeholder="Insira o texto"
            defaultValue={course?.secondary_text ?? ""}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.text}
          />
        </FormField>

        <FormField>
          <Label
            htmlFor="secondary_image"
            hidden={readOnly && !course?.secondary_image}
            required={!course}
          >
            Imagem
          </Label>
          <Input
            name="secondary_image"
            id="secondary_image"
            type="file"
            accept="image/*"
            disabled={pending}
            hidden={readOnly}
            onChange={(e) => handleImageChange(e, setUpdateSecondaryImage)}
            error={error?.errors?.image}
          />
          <ImageForm
            className="aspect-square size-40"
            src={secondaryImage || (course?.secondary_image ?? "")}
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