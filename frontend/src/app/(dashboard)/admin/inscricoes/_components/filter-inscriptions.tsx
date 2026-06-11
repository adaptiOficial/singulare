'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/button'
import DownloadInscription from './download-inscriptions'

export function InscriptionStatusFilter() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const currentStatus = searchParams.get('done')

  function setFilter(value: string | null) {
    const params = new URLSearchParams(searchParams.toString())

    if (value === null) {
      params.delete('done')
    } else {
      params.set('done', value)
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex max-lg:flex-col mb-10 sm:items-start items-center gap-4">
      <div className="flex flex-row gap-2">
        <Button
          size="sm"
          className='h-10 max-sm:px-2'
          variant={!currentStatus ? 'default' : 'outline'}
          onClick={() => setFilter(null)}
        >
          Todos
        </Button>

        <Button
          size="sm"
          className='h-10 max-sm:px-2'
          variant={currentStatus === '0' ? 'default' : 'outline'}
          onClick={() => setFilter('0')}
        >
          Pendentes
        </Button>

        <Button
          size="sm"
          className='h-10 max-sm:px-2'
          variant={currentStatus === '1' ? 'default' : 'outline'}
          onClick={() => setFilter('1')}
        >
          Confirmadas
        </Button>
      </div>

      <div className="lg:ml-auto">
        <DownloadInscription/>
      </div>
    </div>
  )
}
