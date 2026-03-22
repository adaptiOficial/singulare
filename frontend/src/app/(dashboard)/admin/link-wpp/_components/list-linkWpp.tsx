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
import { linkWppType } from '@/types/linkWpp'
import { Button } from '@/components/button'
import { LuInfo, LuPen, LuPlusCircle, LuTrash } from 'react-icons/lu'
import { DialogUpdateLinkWpp } from './dialog-update-linkWpp'
import { DialogInformationLinkWpp } from './dialog-information-linkWpp'
import { PerPage } from '@/components/dashboard/per_page'
import { DialogCreateLinkWpp } from './dialog-create-linkWpp'
import { FilterLinkWpp } from './filter-linkWpp'

interface ListLinkWppProps {
  page?: number
  perPage?: number
  link?: string
}

export default async function ListLinkWpp({
  page,
  perPage,
  link,
}: ListLinkWppProps) {
  const { response } = await api<paginationResponseType<linkWppType[]>>(
    'GET',
    '/link-wpp',
    {
      params: {
        page,
        per_page: perPage,
        link,
      },
    },
  )

  if (!response) {
    return (
      <DashboardContainer className="text-destructive">
        Não foi possível obter os links.
      </DashboardContainer>
    )
  }

  const links: linkWppType[] = response?.data

  return (
    <>
    
      <DashboardContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Link</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {links?.map((link: linkWppType) => (
              <TableRow key={link.id}>

                <TableCell>{link.link}</TableCell>

                <TableCell className="flex justify-end gap-2">
                  <DialogInformationLinkWpp id={link.id}>
                    <Button variant="default-inverse" size="icon">
                      <LuInfo />
                    </Button>
                  </DialogInformationLinkWpp>
                  <DialogUpdateLinkWpp id={link.id}>
                    <Button variant="secondary-inverse" size="icon">
                      <LuPen />
                    </Button>
                  </DialogUpdateLinkWpp>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {!links?.length && (
            <TableCaption> Nenhum link encontrado.</TableCaption>
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