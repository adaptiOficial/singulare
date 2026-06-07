import {
  DashboardHeader,
  DashboardHeaderDescription,
  DashboardHeaderTitle,
  DashboardMain,
} from '@/components/dashboard/dashboard-items'
import { LuDollarSign } from 'react-icons/lu'
import ListPrices from './_components/list-price'
import { Suspense } from 'react'
import { SkeletonPrice } from './_components/skeleton-price'

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
          <LuDollarSign />
          Tabela de Preços
        </DashboardHeaderTitle>

        <DashboardHeaderDescription>
          Edite e visualize as imagens da tabela de preços.
        </DashboardHeaderDescription>
      </DashboardHeader>

      <DashboardMain>
        <Suspense fallback={<SkeletonPrice />}>
          <ListPrices
            page={Number(page)}
            perPage={Number(perPage)}
          />
        </Suspense>
      </DashboardMain>
    </>
  )
}