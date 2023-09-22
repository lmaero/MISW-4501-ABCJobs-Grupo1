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
        <h2 className='font-bold text-2xl'>Last Test Results</h2>
        <div className='p-8 mx-auto max-w-2xl'>
          <ul role='list' className='divide-y divide-gray-100'>
            {people.map((person) => (
              <li
                key={person.email}
                className='flex justify-between gap-x-6 py-5 cursor-pointer hover:bg-gray-100'
              >
                <div className='flex min-w-0 gap-x-4'>
                  <div className='min-w-0 flex-auto'>
                    <p className='text-sm font-semibold leading-6 text-gray-900'>
                      {person.name}
                    </p>
                    <p className='mt-1 truncate text-xs leading-5 text-gray-500'>
                      {person.email}
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

      <div className='p-8 mx-auto max-w-xl flex justify-between'>
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
    </>
  )
}