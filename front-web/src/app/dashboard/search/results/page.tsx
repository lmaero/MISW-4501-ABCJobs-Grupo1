import React from 'react'

const people = [
  {
    name: 'John Smith',
    email: 'USA',
    role: 'JavaScript, Python',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: 'Spanish, English',
    lastSeenDateTime: 'Fullstack Developer',
  },
  {
    name: 'Mary Cool',
    email: 'Ireland',
    role: 'Python, Java',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: 'Spanish, Russian',
    lastSeenDateTime: 'Solutions Architect',
  },
  {
    name: 'Tim Cook',
    email: 'Colombia',
    role: 'TypeScript, JavaScript',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: 'Russian, English',
    lastSeenDateTime: 'DevOps Engineer',
  },
]

export default function ResultsPage() {
  return (
    <div className='p-8 mx-auto max-w-2xl'>
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
              <p>Best as: {person.lastSeenDateTime}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
