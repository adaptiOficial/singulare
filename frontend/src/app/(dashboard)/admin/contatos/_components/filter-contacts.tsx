'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/button'

export function ContactStatusFilter() {
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
    <div className="flex gap-2 mb-10">
      <Button
        size="sm"
        variant={!currentStatus ? 'default' : 'outline'}
        onClick={() => setFilter(null)}
      >
        Todos
      </Button>

      <Button
        size="sm"
        variant={currentStatus === '0' ? 'default' : 'outline'}
        onClick={() => setFilter('0')}
      >
        Pendentes
      </Button>

      <Button
        size="sm"
        variant={currentStatus === '1' ? 'default' : 'outline'}
        onClick={() => setFilter('1')}
      >
        Resolvidos
      </Button>
    </div>
  )
}