import {
  DashboardHeader,
  DashboardHeaderDescription,
  DashboardHeaderTitle,
  DashboardMain,
} from '@/components/dashboard/dashboard-items'
import { LuPresentation } from 'react-icons/lu'
import ListFacilitator from './_components/list-facilitator'
import { Suspense } from 'react'
import { SkeletonFacilitator } from './_components/skeleton-facilitator'


export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { page, per_page: perPage, name } = searchParams

  return (
    <>
      <DashboardHeader>
        <DashboardHeaderTitle>
          <LuPresentation />
          Facilitadores
        </DashboardHeaderTitle>

        <DashboardHeaderDescription>
          Edite e visualize os facilitadores.
        </DashboardHeaderDescription>
      </DashboardHeader>

      <DashboardMain>
        <Suspense fallback={<SkeletonFacilitator />}>
          <ListFacilitator
            page={Number(page)}
            perPage={Number(perPage)}
            name={name as string}
          />
        </Suspense>
      </DashboardMain>
    </>
  )
}
