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
import { feedbackType } from '@/types/feedback'
import { Button } from '@/components/button'
import { LuInfo, LuPen, LuPlusCircle, LuTrash } from 'react-icons/lu'
import { DialogUpdateFeedback } from './dialog-update-feedback'
import { DialogDeleteFeedback } from './dialog-delete-feedback'
import { DialogInformationFeedback } from './dialog-information-feedback'
import { PerPage } from '@/components/dashboard/per_page'
import { DialogCreateFeedback } from './dialog-create-feedback'
import { FilterFeedbacks } from './filter-feedbacks'

interface ListFeedbacksProps {
  page?: number
  perPage?: number
  username?: string
}

export default async function ListFeedbacks({
  page,
  perPage,
  username,
}: ListFeedbacksProps) {
  const { response } = await api<paginationResponseType<feedbackType[]>>(
    'GET',
    '/feedbacks',
    {
      params: {
        page,
        per_page: perPage,
        username,
      },
    },
  )

  if (!response) {
    return (
      <DashboardContainer className="text-destructive">
        Não foi possível obter os feedbacks.
      </DashboardContainer>
    )
  }

  const feedbacks: feedbackType[] = response.data

  return (
    <>
      <DashboardContainer className="flex h-min justify-between space-x-0 gap-y-2.5 max-sm:flex-col">
        <FilterFeedbacks username={username} />

        <DialogCreateFeedback>
          <Button size="sm">
            <LuPlusCircle />
            Novo feedback
          </Button>
        </DialogCreateFeedback>
      </DashboardContainer>

      <DashboardContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imagem</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Feedback</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {feedbacks?.map((feedback: feedbackType) => (
              <TableRow key={feedback.id}>
                <TableCell>
                  <TabbleCellImage src={feedback.image} />
                </TableCell>

                <TableCell>{feedback.username}</TableCell>

                <TableCell className="max-w-[400px] truncate">
                  {feedback.content}
                </TableCell>

                <TableCell className="flex justify-end gap-2">
                  <DialogInformationFeedback id={feedback.id as string}>
                    <Button variant="default-inverse" size="icon">
                      <LuInfo />
                    </Button>
                  </DialogInformationFeedback>

                  <DialogUpdateFeedback id={feedback.id as string}>
                    <Button variant="secondary-inverse" size="icon">
                      <LuPen />
                    </Button>
                  </DialogUpdateFeedback>

                  <DialogDeleteFeedback id={feedback.id as string}>
                    <Button variant="destructive-inverse" size="icon">
                      <LuTrash />
                    </Button>
                  </DialogDeleteFeedback>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          {!feedbacks.length && (
            <TableCaption>Nenhum feedback encontrado.</TableCaption>
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