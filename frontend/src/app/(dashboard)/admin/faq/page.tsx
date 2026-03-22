import {
  DashboardHeader,
  DashboardHeaderDescription,
  DashboardHeaderTitle,
  DashboardMain,
} from '@/components/dashboard/dashboard-items'
import { LuMessageCircle } from 'react-icons/lu'
import ListFaqs from './_components/list-faq'
import { Suspense } from 'react'
import { SkeletonUsers } from '../usuarios/_components/skeleton-users'

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { page, per_page: perPage } = searchParams

  return (
    <>
      <DashboardHeader>
        <DashboardHeaderTitle>
          <LuMessageCircle />
          FAQs
        </DashboardHeaderTitle>

        <DashboardHeaderDescription>
          Cadastre, edite, visualize e exclua perguntas e respostas frequentes.
        </DashboardHeaderDescription>
      </DashboardHeader>

      <DashboardMain>
        <Suspense fallback={<SkeletonUsers />}>
          <ListFaqs
            page={Number(page)}
            perPage={Number(perPage)}
          />
        </Suspense>
      </DashboardMain>
    </>
  )
}