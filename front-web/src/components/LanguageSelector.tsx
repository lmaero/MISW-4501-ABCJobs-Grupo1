'use client'

import { useRouter } from 'next/navigation'
import { SetStateAction, useEffect, useState } from 'react'

export default function LanguageSelector() {
  const router = useRouter()
  const [selected, setSelected] = useState('english')

  useEffect(() => {
    if (selected === 'spanish') router.push('/ingresar')
    if (selected === 'english') router.push('/login')
  }, [selected, setSelected])

  function handleChange(event: { target: { value: SetStateAction<string> } }) {
    setSelected(event.target.value)
  }

  return (
    <div className='sm:col-span-3 inline-block'>
      <div className='mt-2'>
        <select
          value={selected}
          onChange={handleChange}
          id='language'
          name='language'
          className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
        >
          <option value='english'>English</option>
          <option value='spanish'>Spanish</option>
        </select>
      </div>
    </div>
  )
}
