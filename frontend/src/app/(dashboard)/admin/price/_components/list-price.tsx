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
import { priceType } from '@/types/price'
import { Button } from '@/components/button'
import { LuInfo, LuPen } from 'react-icons/lu'
import { DialogUpdatePrice } from './dialog-update-price'
import { DialogInformationPrice } from './dialog-information-price'
import { PerPage } from '@/components/dashboard/per_page'

interface ListPricesProps {
  page?: number
  perPage?: number
}

export default async function ListPrices({
  page,
  perPage,
}: ListPricesProps) {
  const { response } = await api<paginationResponseType<priceType[]>>(
    'GET',
    '/prices',
    {
      params: {
        page,
        per_page: perPage,
      },
    },
  )

  if (!response) {
    return (
      <DashboardContainer className="text-destructive">
        Não foi possível obter as imagens de preço.
      </DashboardContainer>
    )
  }

  const prices: priceType[] = response.data

  return (
    <>
      <DashboardContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imagem</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {prices?.map((price: priceType) => (
              <TableRow key={price.id}>
                <TableCell>
                  <TabbleCellImage src={price.image} />
                </TableCell>

                <TableCell className="flex justify-end gap-2">
                  <DialogInformationPrice id={price.id}>
                    <Button variant="default-inverse" size="icon">
                      <LuInfo />
                    </Button>
                  </DialogInformationPrice>

                  <DialogUpdatePrice id={price.id}>
                    <Button variant="secondary-inverse" size="icon">
                      <LuPen />
                    </Button>
                  </DialogUpdatePrice>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          {!prices?.length && (
            <TableCaption>
              Nenhuma imagem de preço encontrada.
            </TableCaption>
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