'use client'

import Logo from '@/app/[lang]/components/Logo'
import { useJWT } from '@/hooks/useToken'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import React, { Fragment } from 'react'
import { v4 } from 'uuid'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface Props {
  params: { lang: string }
}

export function Navbar({ params }: Props) {
  const t = useTranslations('Navbar')
  const payload = useJWT()

  if (!payload) return null

  const candidateMenus = [
    // { label: t('projects'), link: `/${params.lang}/projects/create` },
    { label: t('interviews'), link: `/${params.lang}/interviews` },
    { label: t('tests'), link: `/${params.lang}/tests/perform` },
  ]

  const companyMenus = [
    { label: t('projects'), link: `/${params.lang}/projects` },
    { label: t('tests'), link: `/${params.lang}/tests` },
  ]

  const menus = payload.type === 'Candidate' ? candidateMenus : companyMenus

  return (
    <Disclosure as='nav' className='bg-white shadow'>
      {({ open }) => (
        <>
          <div className='mx-auto max-w-7xl px-2 sm:px-4 lg:px-8'>
            <div className='flex h-16 justify-between'>
              <div className='flex px-2 lg:px-0'>
                <div className='flex flex-shrink-0 items-center'>
                  <Link href={`/${params.lang}/dashboard`}>
                    <Logo className='h-8 w-auto' />
                  </Link>
                </div>
                <div className='hidden lg:ml-6 lg:flex lg:space-x-8'>
                  {menus.map((menu) => (
                    <Link
                      key={menu.label}
                      href={menu.link}
                      className='inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:border-b hover:border-blue-500 active:font-bold'
                    >
                      {menu.label}
                    </Link>
                  ))}
                </div>
              </div>

              {payload?.type === 'Company' && (
                <div className='flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end'>
                  <p className='sr-only'>{t('search')}</p>
                  <Link
                    href={`/${params.lang}/candidate/search`}
                    className='relative inline-flex items-center gap-x-1.5 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                  >
                    {t('search')}
                  </Link>
                </div>
              )}

              <div className='flex items-center lg:hidden'>
                {/* Mobile menu button */}
                <Disclosure.Button className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500'>
                  <span className='absolute -inset-0.5' />
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
              <div className='hidden lg:ml-4 lg:flex lg:items-center'>
                {/* Profile dropdown */}
                <Menu as='div' className='relative ml-4 flex-shrink-0'>
                  <div>
                    <Menu.Button
                      data-cy='nav-profile'
                      className='relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                    >
                      <span className='absolute -inset-1.5' />
                      <span className='sr-only'>Open user menu</span>
                      <Image
                        className='h-8 w-8 rounded-full'
                        src='/photo-placeholder.webp'
                        alt=''
                        height={32}
                        width={32}
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                      <Menu.Item>
                        {({ active }) => (
                          <Menu.Button
                            onClick={() => {
                              localStorage.removeItem('token')
                              window.location.href = `/${params.lang}/login`
                            }}
                            data-cy='signOut'
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700 w-full',
                            )}
                          >
                            {t('signOut')}
                          </Menu.Button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className='lg:hidden'>
            <div className='space-y-1 pb-3 pt-2'>
              {menus.map((menu) => (
                <Disclosure.Button
                  key={v4()}
                  as={Link}
                  href={menu.link}
                  className='block border-l-4 border-blue-500 bg-blue-50 py-2 pl-3 pr-4 text-base font-medium text-blue-700'
                >
                  {menu.label}
                </Disclosure.Button>
              ))}
            </div>

            <div className='border-t border-gray-200 pb-3 pt-4'>
              <div className='flex items-center px-4'>
                <div className='flex-shrink-0'>
                  <Image
                    className='h-10 w-10 rounded-full'
                    src='/photo-placeholder.webp'
                    alt=''
                    height={40}
                    width={40}
                  />
                </div>
              </div>

              <div className='mt-3 space-y-1'>
                <Disclosure.Button
                  as='a'
                  onClick={() => {
                    localStorage.removeItem('token')
                    window.location.href = `/${params.lang}/login`
                  }}
                  className='block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800'
                >
                  {t('signOut')}
                </Disclosure.Button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
