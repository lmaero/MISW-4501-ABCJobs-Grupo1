'use client'

import Logo from '@/components/Logo'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Home() {
  const router = useRouter()
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) setToken(token)
    else router.push('/register')
  }, [router])

  return (
    <main className='flex h-full flex-col items-center justify-center space-y-6'>
      <Logo className='h-20' />
      <h1 className='text-6xl font-bold'>ABC Jobs</h1>
    </main>
  )
}
