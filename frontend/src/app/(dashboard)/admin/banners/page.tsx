import {
  DashboardHeader,
  DashboardHeaderDescription,
  DashboardHeaderTitle,
  DashboardMain,
} from '@/components/dashboard/dashboard-items'
import { LuImage } from 'react-icons/lu'
import ListBanners from './_components/list-banners'
import { Suspense } from 'react'
import { SkeletonBanners } from './_components/skeleton-banners'

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
          Banners
        </DashboardHeaderTitle>
        <DashboardHeaderDescription>
          Edite e visualize banners.
        </DashboardHeaderDescription>
      </DashboardHeader>
      <DashboardMain>
        <Suspense fallback={<SkeletonBanners />}>
          <ListBanners
            page={Number(page)}
            perPage={Number(perPage)}
            title={text as string}
          />
        </Suspense>
      </DashboardMain>
    </>
  )
}