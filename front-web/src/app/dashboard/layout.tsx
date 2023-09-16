import Navbar from '@/components/Navbar'
import React, { ReactElement } from 'react'

interface Props {
  children: ReactElement
}

function Layout({ children }: Props) {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  )
}

export default Layout
