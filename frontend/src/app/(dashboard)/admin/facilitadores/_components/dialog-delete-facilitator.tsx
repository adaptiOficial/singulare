'use client'

import { destroyFacilitator } from '@/actions/facilitator'
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

interface DialogDeleteFacilitatorProps {
  id: string
  children: React.ReactNode
}

export function DialogFacilitatorDelete({
  id,
  children,
}: DialogDeleteFacilitatorProps) {
  const [open, setOpen] = useState<boolean>()
  const { toast } = useToast()

  const submit = async () => {
    const { error } = await JSON.parse(await destroyFacilitator(id))

    if (error) {
      toast({
        title: 'Não foi possível excluir o facilitador!',
      })
    } else {
      toast({
        title: 'Facilitador deletado com sucesso!',
      })
    }

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar exclusão de facilitador</DialogTitle>
          <DialogDescription>
            Tem certeza de que deseja excluir este facilitador? Esta ação é
            irreversível e removerá permanentemente o facilitador do sistema.
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
            <Button
              variant="destructive"
              type="submit"
            >
              Excluir
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
