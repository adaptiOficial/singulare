import {
  DashboardHeader,
  DashboardHeaderDescription,
  DashboardHeaderTitle,
  DashboardMain,
} from '@/components/dashboard/dashboard-items'
import ListLinkWpp from './_components/list-linkWpp'
import { Suspense } from 'react'
import { SkeletonLinkWpp } from './_components/skeleton-linkWpp'
import { FaWhatsapp } from 'react-icons/fa'

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { page, per_page: perPage, link } = searchParams

  return (
    <>
      <DashboardHeader>
        <DashboardHeaderTitle>
          <FaWhatsapp />
          Links do WhatsApp
        </DashboardHeaderTitle>
        <DashboardHeaderDescription>
          Edite e visualize links.
        </DashboardHeaderDescription>
      </DashboardHeader>
      <DashboardMain>
        <Suspense fallback={<SkeletonLinkWpp />}>
          <ListLinkWpp
            page={Number(page)}
            perPage={Number(perPage)}
            link={link as string}
          />
        </Suspense>
      </DashboardMain>
    </>
  )
}