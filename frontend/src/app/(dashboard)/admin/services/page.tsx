import {
  DashboardHeader,
  DashboardHeaderDescription,
  DashboardHeaderTitle,
  DashboardMain,
} from '@/components/dashboard/dashboard-items'
import { LuLayers } from 'react-icons/lu'
import ListServices from './_components/list-services'
import { Suspense } from 'react'
import { SkeletonServices } from './_components/skeleton-services'

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { page, per_page: perPage, title } = searchParams

  return (
    <>
      <DashboardHeader>
        <DashboardHeaderTitle>
          <LuLayers />
          Serviços
        </DashboardHeaderTitle>
        <DashboardHeaderDescription>
          Cadastre, edite, visualize e exclua serviços.
        </DashboardHeaderDescription>
      </DashboardHeader>
      <DashboardMain>
        <Suspense fallback={<SkeletonServices />}>
          <ListServices
            page={Number(page)}
            perPage={Number(perPage)}
            title={title as string}
          />
        </Suspense>
      </DashboardMain>
    </>
  )
}