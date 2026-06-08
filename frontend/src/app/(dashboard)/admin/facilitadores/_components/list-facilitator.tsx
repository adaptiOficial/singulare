import { DashboardContainer } from '@/components/dashboard/dashboard-items'
import { Pagination } from '@/components/dashboard/pagination'
import {
  TabbleCellImage,
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
import { facilitatorType } from '@/types/facilitator'
import { Button } from '@/components/button'
import { LuInfo, LuPen, LuPlusCircle, LuTrash } from 'react-icons/lu'
import { DialogUpdateFacilitator } from './dialog-update-facilitator'
import { DialogFacilitatorDelete } from './dialog-delete-facilitator'
import { DialogInformationFacilitator } from './dialog-information-facilitator'
import { PerPage } from '@/components/dashboard/per_page'
import { DialogCreateFacilitator } from './dialog-create-facilitator'
import { FilterFacilitator } from './filter-facilitator'

interface ListFacilitatorProps {
  page?: number
  perPage?: number
  name?: string
}

export default async function ListFacilitator({
  page,
  perPage,
  name,
}: ListFacilitatorProps) {
  const { response } = await api<paginationResponseType<facilitatorType[]>>(
    'GET',
    '/facilitator',
    {
      params: {
        page,
        per_page: perPage,
        name,
      },
    },
  )

  if (!response) {
    return (
      <DashboardContainer className="text-destructive">
        Não foi possível obter os facilitadores.
      </DashboardContainer>
    )
  }

  const facilitators: facilitatorType[] = response?.data

  return (
    <>
      <DashboardContainer className="flex h-min justify-between space-x-0 gap-y-2.5 max-sm:flex-col">
        <FilterFacilitator name={name} />
        <DialogCreateFacilitator>
          <Button size="sm">
            <LuPlusCircle />
            Novo facilitador
          </Button>
        </DialogCreateFacilitator>
      </DashboardContainer>
      <DashboardContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imagem</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {facilitators?.map((facilitator: facilitatorType) => (
              <TableRow key={facilitator.id}>
                <TableCell>
                  <TabbleCellImage src={facilitator.image} />
                </TableCell>

                <TableCell>{facilitator.name}</TableCell>

                <TableCell className="max-w-xs truncate">
                  {facilitator.description}
                </TableCell>

                <TableCell className="flex justify-end gap-2">
                  <DialogInformationFacilitator id={facilitator.id}>
                    <Button variant="default-inverse" size="icon">
                      <LuInfo />
                    </Button>
                  </DialogInformationFacilitator>
                  <DialogUpdateFacilitator id={facilitator.id}>
                    <Button variant="secondary-inverse" size="icon">
                      <LuPen />
                    </Button>
                  </DialogUpdateFacilitator>
                  <DialogFacilitatorDelete id={facilitator.id}>
                    <Button variant="destructive-inverse" size="icon">
                      <LuTrash />
                    </Button>
                  </DialogFacilitatorDelete>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {!facilitators?.length && (
            <TableCaption>Nenhum facilitador encontrado.</TableCaption>
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

