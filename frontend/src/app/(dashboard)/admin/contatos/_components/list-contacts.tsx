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
import { contactType } from '@/types/contact'
import { DialogContactDone } from './dialog-update-contact'
import { ContactStatusFilter } from './filter-contacts'



interface ListContactsProps {
  page?: number
  perPage?: number
  search?: string
  done?:string
}

export default async function ListContacts({
  page,
  perPage,
  search,
  done
}: ListContactsProps) {
  const { response } = await api<paginationResponseType<contactType[]>>(
    'GET',
    '/contacts',
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
        Não foi possível obter os contatos.
      </DashboardContainer>
    )
  }

  const contacts: contactType[] = response.data

  return (
    <>
      <DashboardContainer>
        <ContactStatusFilter />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Mensagem</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {contacts?.map((contact: contactType) => (
              <TableRow key={contact.id}>
                <TableCell>{contact.username}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.phone}</TableCell>
                <TableCell className="max-w-xs truncate">
                  {contact.message}
                </TableCell>

                <TableCell>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium
                    ${contact.done === '1'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                >
                    {contact.done === '1' ? 'Resolvido' : 'Pendente'}
                </span>
                </TableCell>

                <TableCell className="flex justify-end gap-2">
                  {/* abrir gmail */}
                  <a
                    href={`mailto:${contact.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="default-inverse" size="icon">
                      <LuMail />
                    </Button>
                  </a>

                    {contact.phone && (
<a
                    href={`https://wa.me/55${contact.phone.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    <Button variant="default-inverse" size="icon">
                        <LuMessageCircle />
                    </Button>
                </a>
                    )}
                  

                  {/* marcar como resolvido */}
                  {contact.done === '0' && (
                  <DialogContactDone id={contact.id}>
                    <Button variant="secondary-inverse" className='bg-green-200' size="icon">
                    <LuCheck />
                    </Button>
                </DialogContactDone>
                  )}
                  
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          {!contacts.length && (
            <TableCaption>Nenhum contato encontrado.</TableCaption>
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