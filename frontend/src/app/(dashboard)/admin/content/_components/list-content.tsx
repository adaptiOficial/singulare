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
import { contentType } from '@/types/content'
import { Button } from '@/components/button'
import { LuInfo, LuPen, LuPlusCircle, LuTrash } from 'react-icons/lu'
import { DialogUpdateContent } from './dialog-update-content'
import { DialogContentDelete } from './dialog-delete-content'
import { DialogInformationContent } from './dialog-information-content'
import { PerPage } from '@/components/dashboard/per_page'
import { DialogCreateContent } from './dialog-create-content'
import { FilterContent } from './filter-content'

interface ListContentProps {
  page?: number
  perPage?: number
  title?: string
  content?: string
}

export default async function ListContent({
  page,
  perPage,
  title,
  content,
}: ListContentProps) {
  const { response } = await api<paginationResponseType<contentType[]>>(
    'GET',
    '/contents',
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
        Não foi possível obter os conteúdos.
      </DashboardContainer>
    )
  }

  const contents: contentType[] = response?.data

  return (
    <>
      <DashboardContainer className="flex h-min justify-end space-x-0 gap-y-2.5 max-sm:flex-col">
        
        <DialogCreateContent>
          <Button size="sm">
            <LuPlusCircle />
            Novo conteúdo
          </Button>
        </DialogCreateContent>
      </DashboardContainer>
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
            {contents?.map((content: contentType) => (
              <TableRow key={content.id}>
                <TableCell>
                  <TabbleCellImage src={content.image} />
                </TableCell>

                <TableCell>{content.text}</TableCell>

                <TableCell className="flex justify-end gap-2">
                  <DialogInformationContent id={content.id}>
                    <Button variant="default-inverse" size="icon">
                      <LuInfo />
                    </Button>
                  </DialogInformationContent>
                  <DialogUpdateContent id={content.id}>
                    <Button variant="secondary-inverse" size="icon">
                      <LuPen />
                    </Button>
                  </DialogUpdateContent>
                  <DialogContentDelete id={content.id}>
                    <Button variant="destructive-inverse" size="icon">
                      <LuTrash />
                    </Button>
                  </DialogContentDelete>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {!contents?.length && (
            <TableCaption> Nenhum conteúdo encontrado.</TableCaption>
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