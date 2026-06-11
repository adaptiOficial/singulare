import {
  DashboardHeader,
  DashboardHeaderDescription,
  DashboardHeaderTitle,
  DashboardMain,
} from '@/components/dashboard/dashboard-items'
import { LuMessageCircle } from 'react-icons/lu'
import ListFeedbacks from './_components/list-feedbacks'
import { Suspense } from 'react'
import { SkeletonUsers } from '../usuarios/_components/skeleton-users'

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { page, per_page: perPage, username } = searchParams

  return (
    <>
      <DashboardHeader>
        <DashboardHeaderTitle>
          <LuMessageCircle />
          Feedbacks
        </DashboardHeaderTitle>

        <DashboardHeaderDescription>
          Cadastre, edite, visualize e exclua feedbacks dos usuários.
        </DashboardHeaderDescription>
      </DashboardHeader>

      <DashboardMain>
        <Suspense fallback={<SkeletonUsers />}>
          <ListFeedbacks
            page={Number(page)}
            perPage={Number(perPage)}
            name={username as string}
          />
        </Suspense>
      </DashboardMain>
    </>
  )
}