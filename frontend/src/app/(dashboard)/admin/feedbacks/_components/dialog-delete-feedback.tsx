'use client'

import { destroyFeedback } from '@/actions/feedback'
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

interface DialogDeleteFeedbackProps {
  id: string
  children: React.ReactNode
}

export function DialogDeleteFeedback({
  id,
  children,
}: DialogDeleteFeedbackProps) {
  const [open, setOpen] = useState<boolean>()
  const { toast } = useToast()

  const submit = async () => {
    const { error } = await JSON.parse(await destroyFeedback(id))

    if (error) {
      toast({
        title: 'Não foi possível excluir o feedback!',
      })
    } else {
      toast({
        title: 'Feedback deletado com sucesso!',
      })
    }

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar exclusão de feedback</DialogTitle>
          <DialogDescription>
            Tem certeza de que deseja excluir este feedback? Esta ação é
            irreversível e removerá permanentemente o feedback do sistema.
            Deseja continuar com a exclusão?
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

            <Button variant="destructive" type="submit">
              Excluir
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}