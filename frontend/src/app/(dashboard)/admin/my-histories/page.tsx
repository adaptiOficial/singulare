import {
  DashboardHeader,
  DashboardHeaderDescription,
  DashboardHeaderTitle,
  DashboardMain,
} from '@/components/dashboard/dashboard-items'
import { LuImage } from 'react-icons/lu'
import ListMyHistory from './_components/list-my-history'
import { Suspense } from 'react'
import { SkeletonMyHistories } from './_components/skeleton-my-histories'

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { page, per_page: perPage, text } = searchParams

  return (
    <>
      <DashboardHeader>
        <DashboardHeaderTitle>
          <LuImage />
          Historias
        </DashboardHeaderTitle>
        <DashboardHeaderDescription>
          Edite e visualize e historias.
        </DashboardHeaderDescription>
      </DashboardHeader>
      <DashboardMain>
        <Suspense fallback={<SkeletonMyHistories />}>
          <ListMyHistory
            page={Number(page)}
            perPage={Number(perPage)}
            text={text as string}
          />
        </Suspense>
      </DashboardMain>
    </>
  )
}