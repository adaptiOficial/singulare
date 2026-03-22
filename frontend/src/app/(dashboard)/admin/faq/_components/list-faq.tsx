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
import { LuInfo, LuPen, LuPlusCircle, LuTrash } from 'react-icons/lu'
import { DialogUpdateFaq } from './dialog-update-faq'
import { DialogFaqDelete } from './dialog-delete-faq'
import { DialogInformationFaq } from './dialog-information-faq'
import { PerPage } from '@/components/dashboard/per_page'
import { DialogCreateFaq } from './dialog-create-faq'
import {  faqType} from '@/types/faq'



interface ListFaqsProps {
  page?: number
  perPage?: number
}

export default async function ListFaqs({
  page,
  perPage,
}: ListFaqsProps) {
  const { response } = await api<paginationResponseType<faqType[]>>(
    'GET',
    '/faq',
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
        Não foi possível obter as FAQs.
      </DashboardContainer>
    )
  }

  const faqs: faqType[] = response.data

  return (
    <>
      <DashboardContainer className="flex h-min justify-end">
        <DialogCreateFaq>
          <Button size="sm">
            <LuPlusCircle />
            Nova FAQ
          </Button>
        </DialogCreateFaq>
      </DashboardContainer>

      <DashboardContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pergunta</TableHead>
              <TableHead>Resposta</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {faqs?.map((faq: faqType) => (
              <TableRow key={faq.id}>
                <TableCell>{faq.question}</TableCell>
                <TableCell className="max-w-[400px] truncate">
                  {faq.answer}
                </TableCell>

                <TableCell className="flex justify-end gap-2">
                  <DialogInformationFaq id={faq.id as string}>
                    <Button variant="default-inverse" size="icon">
                      <LuInfo />
                    </Button>
                  </DialogInformationFaq>

                  <DialogUpdateFaq id={faq.id as string}>
                    <Button variant="secondary-inverse" size="icon">
                      <LuPen />
                    </Button>
                  </DialogUpdateFaq>

                  <DialogFaqDelete id={faq.id as string}>
                    <Button variant="destructive-inverse" size="icon">
                      <LuTrash />
                    </Button>
                  </DialogFaqDelete>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          {!faqs.length && (
            <TableCaption>Nenhuma FAQ encontrada.</TableCaption>
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