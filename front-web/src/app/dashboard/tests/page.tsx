import Link from 'next/link'
import React from 'react'

export default function ProjectsPage() {
  return (
    <div className='p-8 mx-auto max-w-2xl'>
      <Link
        href='/dashboard/tests/create'
        type='button'
        className='px-3 relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
      >
        <span className='absolute -inset-1.5' />
        New Test
      </Link>
    </div>
  )
}
