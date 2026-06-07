'use client'

import { updateInscriptionDone } from '@/actions/inscription'
import { Button } from '@/components/button'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
  DialogFooter,
} from '@/components/dialog'
import { useToast } from '@/components/use-toast'
import { useState } from 'react'

interface DialogInscriptionDoneProps {
  id: string
  children: React.ReactNode
}

export function DialogInscriptionDone({ id, children }: DialogInscriptionDoneProps) {
  const [open, setOpen] = useState<boolean>()
  const { toast } = useToast()

  const submit = async () => {
     const newForm = new FormData()
     newForm.append('id', id);
     newForm.append('done', '1');
     const { error } = await JSON.parse(await updateInscriptionDone(newForm))

    if (error) {
      toast({
        title: 'Não foi possível confirmar a inscrição!',
      })
    } else {
      toast({
        title: 'Inscrição confirmada com sucesso!',
      })
    }

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar inscrição</DialogTitle>
          <DialogDescription>
            Tem certeza de que deseja confirmar esta inscrição? Após
            confirmar, ela será marcada como confirmada no sistema.
          </DialogDescription>
        </DialogHeader>

        <form action={submit}>
          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>

            <Button type="submit">
              Confirmar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
