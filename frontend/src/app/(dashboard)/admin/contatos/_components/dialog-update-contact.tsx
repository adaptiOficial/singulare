'use client'

import { updateContactDone } from '@/actions/contact'
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

interface DialogContactDoneProps {
  id: string
  children: React.ReactNode
}

export function DialogContactDone({ id, children }: DialogContactDoneProps) {
  const [open, setOpen] = useState<boolean>()
  const { toast } = useToast()

  const submit = async () => {
     const newForm = new FormData()
     newForm.append('id',id);
     newForm.append('done','1');
    const { error } = await JSON.parse(await updateContactDone(newForm))

    if (error) {
      toast({
        title: 'Não foi possível atualizar o contato!',
      })
    } else {
      toast({
        title: 'Contato marcado como resolvido!',
      })
    }

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Marcar contato como resolvido</DialogTitle>
          <DialogDescription>
            Tem certeza de que deseja marcar este contato como resolvido? Após
            confirmar, ele será marcado como concluído no sistema.
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