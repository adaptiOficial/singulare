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
import { myhistoryType } from '@/types/myhistory'
import { Button } from '@/components/button'
import { LuInfo, LuPen, LuPlusCircle } from 'react-icons/lu'
import { DialogUpdateMyHistory } from './dialog-update-my-history'
import { DialogInformationMyHistory } from './dialog-information-my-history'
import { PerPage } from '@/components/dashboard/per_page'
import { FilterMyHistories } from './filter-my-histories'

interface ListMyHistoriesProps {
  page?: number
  perPage?: number
  text?: string
  mission?: string
}

export default async function ListMyHistories({
  page,
  perPage,
  text,
  mission,
}: ListMyHistoriesProps) {
  const { response } = await api<paginationResponseType<myhistoryType[]>>(
    'GET',
    '/my-histories',
    {
      params: {
        page,
        per_page: perPage,
        text,
        mission,
      },
    },
  )

  if (!response) {
    return (
      <DashboardContainer className="text-destructive">
        Não foi possível obter as histórias.
      </DashboardContainer>
    )
  }

  const myhistories: myhistoryType[] = response?.data

  return (
    <>
     
      <DashboardContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imagem</TableHead>
              <TableHead>Texto</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {myhistories?.map((myhistory: myhistoryType) => (
              <TableRow key={myhistory.id}>
                <TableCell>
                  <TabbleCellImage src={myhistory.image} />
                </TableCell>

                <TableCell>{myhistory.text}</TableCell>

                <TableCell className="flex justify-end gap-2">
                  <DialogInformationMyHistory id={myhistory.id}>
                    <Button variant="default-inverse" size="icon">
                      <LuInfo />
                    </Button>
                  </DialogInformationMyHistory>
                  <DialogUpdateMyHistory id={myhistory.id}>
                    <Button variant="secondary-inverse" size="icon">
                      <LuPen />
                    </Button>
                  </DialogUpdateMyHistory>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {!myhistories?.length && (
            <TableCaption> Nenhuma história encontrada.</TableCaption>
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