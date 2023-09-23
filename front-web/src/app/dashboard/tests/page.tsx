import OrderBy from '@/components/OrderBy'
import Link from 'next/link'
import React from 'react'

export default function ProjectsPage() {
  const people = [
    {
      name: 'John Smith',
      email: 'Technical Test',
      role: 'React',
      lastSeen: 'Satisfactory',
      lastSeenDateTime: '80%',
    },
    {
      name: 'Mary Cool',
      email: 'Psychological Test',
      role: 'Soft-Skills',
      lastSeen: 'Needs review',
      lastSeenDateTime: '70%',
    },
    {
      name: 'Tim Cook',
      email: 'Technical Test',
      role: 'TypeScript',
      lastSeen: 'Altered',
      lastSeenDateTime: '100%',
    },
  ]

  return (
    <>
      <div className='mx-auto max-w-xl mt-10'>
        <div className='mb-8 mx-auto max-w-xl flex justify-between'>
          <Link
            href='/dashboard/tests/create'
            type='button'
            className='text-white right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Create New Test
          </Link>
          <Link
            href='/dashboard/tests/take'
            type='button'
            className='text-white right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Take test
          </Link>
        </div>
        <h2 className='font-bold text-2xl'>Last Test Results</h2>

        <OrderBy />

        <div className='p-8 mx-auto max-w-2xl'>
          <ul role='list' className='divide-y divide-gray-100'>
            {people.map((person) => (
              <li
                key={person.email}
                className='flex justify-between gap-x-6 py-5'
              >
                <div className='flex min-w-0 gap-x-4'>
                  <div className='min-w-0 flex-auto'>
                    <p className='text-sm font-semibold leading-6 text-gray-900'>
                      {person.name}
                    </p>
                    <p className='mt-1 truncate text-xs leading-5 text-gray-500'>
                      {person.email}
                    </p>

                    <Link
                      href='/dashboard/interviews/schedule'
                      className='flex items-center mt-2 gap-2 mb-4'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='inline icon icon-tabler icon-tabler-calendar-plus'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        strokeWidth='2'
                        stroke='currentColor'
                        fill='none'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      >
                        <title>Schedule icon</title>
                        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                        <path d='M12.5 21h-6.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v5' />
                        <path d='M16 3v4' />
                        <path d='M8 3v4' />
                        <path d='M4 11h16' />
                        <path d='M16 19h6' />
                        <path d='M19 16v6' />
                      </svg>
                      Schedule Interview
                    </Link>

                    <Link
                      href='/dashboard/tests/selected'
                      type='button'
                      className='text-white right-2.5 bottom-2.5 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800'
                    >
                      Select for project
                    </Link>
                  </div>
                </div>
                <div className='hidden shrink-0 sm:flex sm:flex-col sm:items-end'>
                  <p className='text-sm leading-6 text-gray-900'>
                    {person.role}
                  </p>
                  {person.lastSeen ? (
                    <p className='mt-1 text-xs leading-5 text-gray-500'>
                      <time dateTime={person.lastSeenDateTime}>
                        {person.lastSeen}
                      </time>
                    </p>
                  ) : (
                    <div className='mt-1 flex items-center gap-x-1.5'>
                      <div className='flex-none rounded-full bg-emerald-500/20 p-1'>
                        <div className='h-1.5 w-1.5 rounded-full bg-emerald-500' />
                      </div>
                      <p className='text-xs leading-5 text-gray-500'>Online</p>
                    </div>
                  )}
                  <p>{person.lastSeenDateTime}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
