'use client'

import { PROJECT_HOST } from '@/lib/api'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { v4 } from 'uuid'

interface Props {
  params: {
    lang: string
  }
}

interface Project {
  id: number
  budget: number
  deadline: string
  description: string
  price: number
  team: string[]
  stakeholders: string
}

export default function Page({ params }: Props) {
  const t = useTranslations('ProjectsListPage')
  const [projects, setProjects] = useState([])

  useEffect(() => {
    async function getData() {
      const response = await fetch(`${PROJECT_HOST}/project`)
      const data = await response.json()

      if (!response.ok) setProjects([])
      else setProjects(data)
    }
    void getData()
  }, [])

  if (projects.length === 0)
    return (
      <div className='mx-auto max-w-7xl p-7 space-y-3'>
        <p className='font-semibold'>{t('notCreated')}</p>
        <Link
          className='relative max-w-fit inline-flex items-center gap-x-1.5 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
          href='/projects/create'
        >
          {t('createProject')}
        </Link>
      </div>
    )

  return (
    <div className='mx-auto max-w-2xl p-8'>
      <form className='space-y-6'>
        <header className='flex justify-between'>
          <h2 className='mb-3 text-2xl font-bold leading-7 tracking-tight text-gray-900'>
            {t('title')}
          </h2>

          <Link
            className='relative inline-flex items-center gap-x-1.5 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
            href='/projects/create'
          >
            {t('createProject')}
          </Link>
        </header>
        <hr className='border-b-1' />
        <section className='space-y-3'>
          {projects.map((project: Project) => (
            <article
              key={v4()}
              className='grid capitalize grid-cols-2 rounded-md border-2 border-gray-50 p-5'
            >
              <div className='space-y-2'>
                <h3 className='font-bold'>{project.stakeholders}</h3>
                <p className='text-sm text-gray-400'>{project.description}</p>
              </div>
              <div className='space-y-0.5 justify-self-end text-right'>
                <p className='font-medium'>Price: {project.price}</p>
                <p className='text-sm text-gray-400'>
                  Deadline: {project.deadline.split('T')[0]}
                </p>
              </div>
            </article>
          ))}
        </section>
      </form>
    </div>
  )
}
