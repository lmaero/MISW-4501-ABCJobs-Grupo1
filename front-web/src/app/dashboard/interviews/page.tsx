import Link from 'next/link'
import React from 'react'

export default function ProjectsPage() {
  const upcoming = [
    {
      name: 'Johnson & Johnson',
      email: 'ERP for aviation',
      role: 'First Interview',
      lastSeen: 'Dec 21, 2024',
      lastSeenDateTime: '09:00am',
    },
    {
      name: 'Coca-Cola',
      email: 'Medicine App',
      role: 'Technical Interview',
      lastSeen: 'Sep 23, 2023',
      lastSeenDateTime: '10:00am',
    },
    {
      name: 'Globant',
      email: 'Restaurant Menu',
      role: 'Final Filter',
      lastSeen: 'Sep 22, 2023',
      lastSeenDateTime: '1:00pm',
    },
  ]

  const presented = [
    {
      name: 'Johnson & Johnson',
      email: 'ERP for aviation',
      role: 'First Interview',
      lastSeen: 'Dec 21, 2024',
      lastSeenDateTime: '09:00am',
    },
    {
      name: 'Coca-Cola',
      email: 'Medicine App',
      role: 'Technical Interview',
      lastSeen: 'Sep 23, 2023',
      lastSeenDateTime: '10:00am',
    },
    {
      name: 'Globant',
      email: 'Restaurant Menu',
      role: 'Final Filter',
      lastSeen: 'Sep 22, 2023',
      lastSeenDateTime: '1:00pm',
    },
  ]

  return (
    <>
      <div className='mx-auto max-w-xl mt-10'>
        <div className='mb-8 mx-auto max-w-xl flex justify-between'>
          <Link
            href='/dashboard/interviews/results/publish'
            type='button'
            className='text-white right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Publish Result
          </Link>
        </div>

        <h2 className='font-bold text-2xl'>Finished Interviews</h2>
        <div className='p-8 mx-auto max-w-2xl'>
          <ul role='list' className='divide-y divide-gray-100'>
            {presented.map((person) => (
              <li
                key={person.email}
                className='flex justify-between gap-x-6 py-5'
              >
                <div className='flex min-w-0 gap-x-4'>
                  <div className='min-w-0 flex-auto'>
                    <p className='text-sm font-semibold leading-6 text-gray-900'>
                      Company: {person.name}
                    </p>
                    <p className='mt-1 truncate text-xs leading-5 text-gray-500'>
                      Project: {person.email}
                    </p>

                    <Link
                      href='/dashboard/interviews/results'
                      className='flex items-center mt-2 gap-2'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='icon icon-tabler icon-tabler-report'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        strokeWidth='2'
                        stroke='currentColor'
                        fill='none'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      >
                        <title>Icon</title>
                        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                        <path d='M8 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h5.697' />
                        <path d='M18 14v4h4' />
                        <path d='M18 11v-4a2 2 0 0 0 -2 -2h-2' />
                        <path d='M8 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z' />
                        <path d='M18 18m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0' />
                        <path d='M8 11h4' />
                        <path d='M8 15h3' />
                      </svg>
                      See results
                    </Link>
                  </div>
                </div>
                <div className='hidden shrink-0 sm:flex sm:flex-col sm:items-end'>
                  <p className='text-sm line-through leading-6 text-gray-900'>
                    {person.role}
                  </p>
                  {person.lastSeen ? (
                    <p className='mt-1 line-through text-xs leading-5 text-gray-500'>
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
                  <p className='line-through'>{person.lastSeenDateTime}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <h2 className='font-bold text-2xl'>Upcoming Interviews</h2>
        <div className='p-8 mx-auto max-w-2xl'>
          <ul role='list' className='divide-y divide-gray-100'>
            {upcoming.map((person) => (
              <li
                key={person.email}
                className='flex justify-between gap-x-6 py-5'
              >
                <div className='flex min-w-0 gap-x-4'>
                  <div className='min-w-0 flex-auto'>
                    <p className='text-sm font-semibold leading-6 text-gray-900'>
                      Company: {person.name}
                    </p>
                    <p className='mt-1 truncate text-xs leading-5 text-gray-500'>
                      Project: {person.email}
                    </p>
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
