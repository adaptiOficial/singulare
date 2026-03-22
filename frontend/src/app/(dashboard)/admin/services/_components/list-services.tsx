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
import { serviceType } from '@/types/service'
import { Button } from '@/components/button'
import { LuInfo, LuPen, LuPlusCircle, LuTrash } from 'react-icons/lu'
import { DialogUpdateService } from './dialog-update-service'
import { DialogServiceDelete } from './dialog-delete-service'
import { DialogInformationService } from './dialog-information-service'
import { PerPage } from '@/components/dashboard/per_page'
import { DialogCreateService } from './dialog-create-service'
import { FilterServices } from './filter-services'

interface ListServicesProps {
  page?: number
  perPage?: number
  title?: string
  content?: string
}

export default async function ListServices({
  page,
  perPage,
  title,
  content,
}: ListServicesProps) {
  const { response } = await api<paginationResponseType<serviceType[]>>(
    'GET',
    '/services',
    {
      params: {
        page,
        per_page: perPage,
        title,
        content,
      },
    },
  )

  if (!response) {
    return (
      <DashboardContainer className="text-destructive">
        Não foi possível obter os serviços.
      </DashboardContainer>
    )
  }

  const services: serviceType[] = response?.data

  return (
    <>
      <DashboardContainer className="flex h-min justify-end space-x-0 gap-y-2.5 max-sm:flex-col">
        
        <DialogCreateService>
          <Button size="sm">
            <LuPlusCircle />
            Novo serviço
          </Button>
        </DialogCreateService>
      </DashboardContainer>
      <DashboardContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imagem</TableHead>
              <TableHead>Título</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services?.map((service: serviceType) => (
              <TableRow key={service.id}>
                <TableCell>
                  <TabbleCellImage src={service.image} />
                </TableCell>

                <TableCell>{service.title}</TableCell>

                <TableCell className="flex justify-end gap-2">
                  <DialogInformationService id={service.id}>
                    <Button variant="default-inverse" size="icon">
                      <LuInfo />
                    </Button>
                  </DialogInformationService>
                  <DialogUpdateService id={service.id}>
                    <Button variant="secondary-inverse" size="icon">
                      <LuPen />
                    </Button>
                  </DialogUpdateService>
                  <DialogServiceDelete id={service.id}>
                    <Button variant="destructive-inverse" size="icon">
                      <LuTrash />
                    </Button>
                  </DialogServiceDelete>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {!services?.length && (
            <TableCaption> Nenhum serviço encontrado.</TableCaption>
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