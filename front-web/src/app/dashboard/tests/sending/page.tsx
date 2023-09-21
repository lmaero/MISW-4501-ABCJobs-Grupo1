'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

function SendingPage() {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      router.push('/dashboard/tests/sent')
    }, 3000)
  }, [])

  return (
    <div className='w-full h-screen grid grid-cols-1 bg-gray-200 place-items-center'>
      <h1 className='text-xl'>Sending your quiz to ABC Jobs...</h1>
    </div>
  )
}

export default SendingPage
