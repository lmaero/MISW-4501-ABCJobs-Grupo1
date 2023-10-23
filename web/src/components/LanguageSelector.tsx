'use client'

import classNames from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Flag from 'react-world-flags'

const locales = [
  {
    code: 'en',
    label: 'English',
    icon: <Flag code='us' width={30} />,
  },
  {
    code: 'es',
    label: 'Español',
    icon: <Flag code='mx' width={30} />,
  },
]

export function LanguageSelector() {
  const path = usePathname()
  const [selectedLocale, setSelectedLocale] = useState<string>(locales[0].code)

  useEffect(() => {
    setSelectedLocale(path.slice(1, 3))
  }, [path])

  return (
    <div className='absolute right-4 top-4 flex items-center space-x-2'>
      {locales.map((locale) => (
        <Link
          className={classNames({
            'overflow-hidden rounded-md p-0.5': true,
            'border-4 border-blue-500': selectedLocale === locale.code,
          })}
          aria-label={locale.label}
          title={locale.label}
          key={locale.code}
          onClick={() => setSelectedLocale(locale.code)}
          href={path.replace(`${selectedLocale}`, locale.code)}
        >
          {locale.icon}
        </Link>
      ))}
    </div>
  )
}
