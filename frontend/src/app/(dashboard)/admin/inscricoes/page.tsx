import {
  DashboardHeader,
  DashboardHeaderDescription,
  DashboardHeaderTitle,
  DashboardMain,
} from '@/components/dashboard/dashboard-items'
import { LuMail } from 'react-icons/lu'
import { Suspense } from 'react'
import { SkeletonInscriptions } from './_components/skeleton-inscriptions'
import ListInscriptions from './_components/list-inscriptions'

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { page, per_page: perPage, done } = searchParams

  return (
    <>
      <DashboardHeader>
        <DashboardHeaderTitle>
          <LuMail />
          Inscrições
        </DashboardHeaderTitle>

        <DashboardHeaderDescription>
          Visualize e gerencie as inscrições realizadas no sistema.
        </DashboardHeaderDescription>
      </DashboardHeader>
      <DashboardMain>
        <Suspense fallback={<SkeletonInscriptions />}>
          <ListInscriptions
            done={done as string}
            page={Number(page)}
            perPage={Number(perPage)}
          />
        </Suspense>
      </DashboardMain>
    </>
  )
}
