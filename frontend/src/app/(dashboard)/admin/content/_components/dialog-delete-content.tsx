'use client'

import { destroyContent } from '@/actions/content'
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

interface DialogCreateContentProps {
  id: string
  children: React.ReactNode
}

export function DialogContentDelete({ id, children }: DialogCreateContentProps) {
  const [open, setOpen] = useState<boolean>()
  const { toast } = useToast()

  const submit = async () => {
    try {
      await destroyContent(id)
      toast({
        title: 'Conteúdo deletado com sucesso!',
      })
    } catch (e) {
      toast({
        title: 'Não foi possível excluir o conteúdo!',
      })
    }
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar exclusão do conteúdo</DialogTitle>
          <DialogDescription>
            Tem certeza de que deseja excluir este conteúdo? Esta ação é
            irreversível e removerá permanentemente o conteúdo do sistema. Deseja
            continuar com a exclusão?
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