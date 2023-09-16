import Link from 'next/link'
import React from 'react'

const people = [
  {
    name: 'ERP for aviation',
    email: 'This is to manage the whole FAA process',
    role: '$1.200',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: 'Deadline: 2023-01-23',
    lastSeenDateTime: 'Fullstack Developer',
  },
  {
    name: 'Medicine app',
    email: 'Register patients on the go',
    role: '$1.300',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: 'Deadline: 2023-01-23 ',
    lastSeenDateTime: 'Solutions Architect',
  },
  {
    name: 'Restaurant Menu',
    email: 'The whole menu accesible with 3D dishes',
    role: '$2.000',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: 'Deadline: 2023-01-23',
    lastSeenDateTime: 'DevOps Engineer',
  },
]

export default function ProjectsPage() {
  return (
    <div className='p-8 mx-auto max-w-2xl'>
      <Link
        href='/dashboard/projects/create'
        type='button'
        className='px-3 relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
      >
        <span className='absolute -inset-1.5' />
        <span className='sr-only'>View notifications</span>
        Add Project
      </Link>

      <ul role='list' className='divide-y divide-gray-100'>
        {people.map((person) => (
          <li key={person.email} className='flex justify-between gap-x-6 py-5'>
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
              <p className='text-sm leading-6 text-gray-900'>{person.role}</p>
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
              <p>Required profile: {person.lastSeenDateTime}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
