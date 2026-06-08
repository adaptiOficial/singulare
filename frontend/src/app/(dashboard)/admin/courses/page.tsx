import {
  DashboardHeader,
  DashboardHeaderDescription,
  DashboardHeaderTitle,
  DashboardMain,
} from '@/components/dashboard/dashboard-items'
import { LuBookOpen } from 'react-icons/lu'
import ListCourse from './_components/list-course'
import { Suspense } from 'react'
import { SkeletonCourse } from './_components/skeleton-course'

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
          <LuBookOpen />
          Sobre o curso
        </DashboardHeaderTitle>
        <DashboardHeaderDescription>
          Edite, visualize e exclua sobre o curso.
        </DashboardHeaderDescription>
      </DashboardHeader>
      <DashboardMain>
        <Suspense fallback={<SkeletonCourse />}>
          <ListCourse
            page={Number(page)}
            perPage={Number(perPage)}
            text={text as string}
          />
        </Suspense>
      </DashboardMain>
    </>
  )
}