import {
  DashboardHeader,
  DashboardHeaderDescription,
  DashboardHeaderTitle,
  DashboardMain,
} from '@/components/dashboard/dashboard-items'
import { LuMail } from 'react-icons/lu'
import ListContacts from './_components/list-contacts'
import { Suspense } from 'react'
import { SkeletonUsers } from './_components/skeleton-contacts'

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
    Contatos
  </DashboardHeaderTitle>

  <DashboardHeaderDescription>
    Visualize e gerencie as mensagens enviadas pelo formulário de contato.
  </DashboardHeaderDescription>
</DashboardHeader>
      <DashboardMain>
        <Suspense fallback={<SkeletonUsers />}>
          <ListContacts
            done={done as string}
            page={Number(page)}
            perPage={Number(perPage)}
            
          />
        </Suspense>
      </DashboardMain>
    </>
  )
}
