import {
  DashboardHeader,
  DashboardHeaderDescription,
  DashboardHeaderTitle,
  DashboardMain,
} from '@/components/dashboard/dashboard-items'
import { LuLayers } from 'react-icons/lu'
import ListServices from './_components/list-content'
import { Suspense } from 'react'
import { SkeletonContent } from './_components/skeleton-content'

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
          Conteúdo
        </DashboardHeaderTitle>
        <DashboardHeaderDescription>
          Cadastre, edite, visualize e exclua conteúdo.
        </DashboardHeaderDescription>
      </DashboardHeader>
      <DashboardMain>
        <Suspense fallback={<SkeletonContent />}>
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