import {
  DashboardHeader,
  DashboardHeaderDescription,
  DashboardHeaderTitle,
  DashboardMain,
} from '@/components/dashboard/dashboard-items'
import { LuContact  } from 'react-icons/lu'
import ListCompanyInformation from './_components/list-company-information'
import { Suspense } from 'react'
import { SkeletonUsers } from './_components/skeleton-users'


export default async function Page() {
  return (
    <>
      <DashboardHeader>
        <DashboardHeaderTitle>
          <LuContact  />
          Informações da Empresa
        </DashboardHeaderTitle>
        <DashboardHeaderDescription>
           Edite e visualize as informações da empresa.
        </DashboardHeaderDescription>
      </DashboardHeader>
      <DashboardMain>
        <Suspense fallback={<SkeletonUsers />}>
          <ListCompanyInformation />
        </Suspense>
      </DashboardMain>
    </>
  )
}
