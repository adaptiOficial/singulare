import Image from 'next/image'
import { api } from '@/services/api'
import { paginationResponseType } from '@/types/pagination-response'
import { priceType } from '@/types/price'

export default async function Preco() {
  const { response } = await api<paginationResponseType<priceType[]>>(
    'GET',
    '/prices'
  )

  const price = response?.data?.[0]

  if (!price) {
    return null
  }

  return (
    <div className=" lg:my-20 my-8 mx-[10%] flex flex-col">
      <h1 className="lg:text-[48px] md:text-[36px] max-md:text-[22px] font-semibold self-start">
        Investimento
      </h1>

      <Image
        src={price.image}
        alt="Imagem do Investimento"
        className="self-center"
        width={1114}
        height={774}
      />
    </div>
  )
}