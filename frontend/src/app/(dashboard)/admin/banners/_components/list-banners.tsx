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
import { bannerType } from '@/types/banner'
import { Button } from '@/components/button'
import { LuInfo, LuPen, LuPlusCircle, LuTrash } from 'react-icons/lu'
import { DialogUpdateBanner } from './dialog-update-banner'
import { DialogInformationBanner } from './dialog-information-banner'
import { PerPage } from '@/components/dashboard/per_page'
import { DialogCreateBanner } from './dialog-create-banner'
import { FilterBanners } from './filter-banners'

interface ListBannersProps {
  page?: number
  perPage?: number
  text?: string
}

export default async function ListBanners({
  page,
  perPage,
  text,
}: ListBannersProps) {
  const { response } = await api<paginationResponseType<bannerType[]>>(
    'GET',
    '/banners',
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
        Não foi possível obter os banners.
      </DashboardContainer>
    )
  }

  const banners: bannerType[] = response?.data

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
            {banners?.map((banner: bannerType) => (
              <TableRow key={banner.id}>
                <TableCell>
                  <TabbleCellImage src={banner.image} />
                </TableCell>

                <TableCell>{banner.text}</TableCell>

                <TableCell className="flex justify-end gap-2">
                  <DialogInformationBanner id={banner.id}>
                    <Button variant="default-inverse" size="icon">
                      <LuInfo />
                    </Button>
                  </DialogInformationBanner>
                  <DialogUpdateBanner id={banner.id}>
                    <Button variant="secondary-inverse" size="icon">
                      <LuPen />
                    </Button>
                  </DialogUpdateBanner>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {!banners?.length && (
            <TableCaption> Nenhum banner encontrado.</TableCaption>
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