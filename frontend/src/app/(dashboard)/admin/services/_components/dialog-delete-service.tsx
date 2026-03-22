'use client'

import { destroyService } from '@/actions/services'
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

interface DialogCreateServiceProps {
  id: string
  children: React.ReactNode
}

export function DialogServiceDelete({ id, children }: DialogCreateServiceProps) {
  const [open, setOpen] = useState<boolean>()
  const { toast } = useToast()

  const submit = async () => {
    try {
      await destroyService(id)
      toast({
        title: 'Serviço deletado com sucesso!',
      })
    } catch (e) {
      toast({
        title: 'Não foi possível excluir o serviço!',
      })
    }
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar exclusão do serviço</DialogTitle>
          <DialogDescription>
            Tem certeza de que deseja excluir este serviço? Esta ação é
            irreversível e removerá permanentemente o serviço do sistema. Deseja
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