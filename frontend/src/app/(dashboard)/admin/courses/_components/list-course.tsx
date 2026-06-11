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
import { courseType } from '@/types/course'
import { Button } from '@/components/button'
import { LuInfo, LuPen, LuPlusCircle, LuTrash } from 'react-icons/lu'
import { DialogUpdateCourse } from './dialog-update-course'
import { DialogInformationCourse } from './dialog-information-course'
import { PerPage } from '@/components/dashboard/per_page'
import { DialogCreateCourse } from './dialog-create-course'
import { FilterCourse } from './filter-course'

interface ListCourseProps {
  page?: number
  perPage?: number
  text?: string
}

export default async function ListCourse({
  page,
  perPage,
  text,
}: ListCourseProps) {
  const { response } = await api<paginationResponseType<courseType[]>>(
    'GET',
    '/courses',
    {
      params: {
        page,
        per_page: perPage,
        text,
      },
    },
  )

  if (!response) {
    return (
      <DashboardContainer className="text-destructive">
        Não foi possível obter sobre o curso.
      </DashboardContainer>
    )
  }

  const course: courseType[] = response?.data

  return (
    <>
    
      <DashboardContainer className='flex h-min justify-end space-x-0 gap-y-2.5 max-sm:flex-col'>
        <DialogCreateCourse>
          <Button size="sm">
            <LuPlusCircle/>
            Novo Sobre Curso
          </Button>
        </DialogCreateCourse>
      </DashboardContainer>

      <DashboardContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imagem</TableHead>
              <TableHead>Texto</TableHead>
              <TableHead>Imagem</TableHead>
              <TableHead>Texto</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {course?.map((courseItem: courseType) => (
              <TableRow key={courseItem.id}>
                <TableCell>{courseItem.title}</TableCell>

                <TableCell>
                  <TabbleCellImage src={courseItem.primary_image} />
                </TableCell>

                <TableCell>{courseItem.primary_text}</TableCell>

                <TableCell>
                  <TabbleCellImage src={courseItem.secondary_image ?? ""} />
                </TableCell>

                <TableCell>{courseItem.secondary_text}</TableCell>

                <TableCell className="flex justify-end gap-2">
                  <DialogInformationCourse id={courseItem.id}>
                    <Button variant="default-inverse" size="icon">
                      <LuInfo />
                    </Button>
                  </DialogInformationCourse>
                  <DialogUpdateCourse id={courseItem.id}>
                    <Button variant="secondary-inverse" size="icon">
                      <LuPen />
                    </Button>
                  </DialogUpdateCourse>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {!course?.length && (
            <TableCaption> Nada sobre o curso foram encontrado.</TableCaption>
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