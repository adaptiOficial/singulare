import { DashboardContainer } from '@/components/dashboard/dashboard-items'
import { Pagination } from '@/components/dashboard/pagination'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/dashboard/table'
import { api } from '@/services/api'
import { paginationResponseType } from '@/types/pagination-response'
import { Button } from '@/components/button'
import { LuCheck, LuMail, LuMessageCircle } from 'react-icons/lu'
import { PerPage } from '@/components/dashboard/per_page'
import { InscriptionData } from '@/types/inscription'
import { DialogInscriptionDone } from './dialog-update-inscription'
import { InscriptionStatusFilter } from './filter-inscriptions'

interface ListInscriptionsProps {
  page?: number
  perPage?: number
  search?: string
  done?: string
}

export default async function ListInscriptions({
  page,
  perPage,
  search,
  done
}: ListInscriptionsProps) {
  const { response } = await api<paginationResponseType<any[]>>(
    'GET',
    '/inscriptions',
    {
      params: {
        page,
        per_page: perPage,
        search,
        done
      },
    },
  )

  if (!response) {
    return (
      <DashboardContainer className="text-destructive">
        Não foi possível obter as inscrições.
      </DashboardContainer>
    )
  }

  // Map backend "nome" to frontend "nome_completo"
  const inscriptions: InscriptionData[] = response.data.map((item: any) => ({
    id: item.id,
    nome_completo: item.nome,
    email: item.email,
    telefone: item.telefone,
    cpf_cnpj: item.cpf_cnpj,
    quantidade_inscricoes: Number(item.quantidade_inscricoes),
    ramo_atividade: item.ramo_atividade || undefined,
    done: item.done,
    created_at: item.created_at,
    updated_at: item.updated_at,
  }))

  return (
    <>
      <DashboardContainer>
        <InscriptionStatusFilter />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome Completo</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>CPF/CNPJ</TableHead>
              <TableHead>Qtd. Inscrições</TableHead>
              <TableHead>Ramo de Atividade</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {inscriptions?.map((inscription: InscriptionData) => (
              <TableRow key={inscription.id}>
                <TableCell className="font-medium">{inscription.nome_completo}</TableCell>
                <TableCell>{inscription.email}</TableCell>
                <TableCell>{inscription.telefone}</TableCell>
                <TableCell>{inscription.cpf_cnpj}</TableCell>
                <TableCell className="text-center">{inscription.quantidade_inscricoes}</TableCell>
                <TableCell className="max-w-xs truncate">
                  {inscription.ramo_atividade || '-'}
                </TableCell>

                <TableCell>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium
                    ${inscription.done === '1'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {inscription.done === '1' ? 'Confirmada' : 'Pendente'}
                  </span>
                </TableCell>

                <TableCell className="flex justify-end gap-2">
                  {/* enviar e-mail */}
                  <a
                    href={`mailto:${inscription.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="default-inverse" size="icon">
                      <LuMail />
                    </Button>
                  </a>

                  {inscription.telefone && (
                    <a
                      href={`https://wa.me/55${inscription.telefone.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="default-inverse" size="icon">
                        <LuMessageCircle />
                      </Button>
                    </a>
                  )}

                  {/* marcar como confirmada */}
                  {inscription.done === '0' && inscription.id && (
                    <DialogInscriptionDone id={inscription.id}>
                      <Button variant="secondary-inverse" className='bg-green-200 hover:bg-green-300' size="icon">
                        <LuCheck />
                      </Button>
                    </DialogInscriptionDone>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          {!inscriptions.length && (
            <TableCaption>Nenhuma inscrição encontrada.</TableCaption>
          )}
        </Table>
      </DashboardContainer>

      <DashboardContainer className="flex justify-between space-x-0 gap-y-2.5 max-sm:flex-col max-sm:items-center">
        <PerPage total={response.total} />
        <Pagination lastPage={response.last_page} />
      </DashboardContainer>
    </>
  )
}
