'use client'

import { useJWT } from '@/hooks/useToken'

export default function DashboardPage() {
  const payload = useJWT()

  if (!payload) return null

  return (
    <main className='mx-auto max-w-7xl p-8'>
      <h1 className='text-xl'>
        <span data-cy='dashboard-title' className='font-semibold'>
          {payload?.type as string}
        </span>
      </h1>
    </main>
  )
}
