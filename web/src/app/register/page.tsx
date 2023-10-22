import Logo from '@/components/Logo'
import { BuildingOfficeIcon, UserIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

function RegisterPage() {
  return (
    <main className='flex h-full flex-col items-center justify-center space-y-6 bg-gray-100'>
      <Logo className='h-10' />
      <h1 className='text-3xl font-bold'>Register</h1>

      <div className='flex space-x-5'>
        <Link
          className='rounded-xl bg-white p-10 shadow-xl transition-all hover:scale-105 hover:bg-gray-100'
          href='/candidate/register'
        >
          <UserIcon className='text-zinc-300' />
          <h2>Candidate</h2>
        </Link>
        <Link
          className='rounded-xl bg-white p-10 shadow-xl transition-all hover:scale-105 hover:bg-gray-100'
          href='/company/register'
        >
          <BuildingOfficeIcon className='text-zinc-300' />
          <h2>Company</h2>
        </Link>
      </div>
    </main>
  )
}

export default RegisterPage
