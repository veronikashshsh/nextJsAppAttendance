import React from 'react'
import SideNav from './_components/SideNav'
import Header from './_components/Header'
import { ThemeProvider } from '../ThemeProvider'

function layout({children}) {
  return (
    <div>
      <div className='w-64 fixed md:block'>
        <SideNav/>
      </div>
      <div className='md:ml-64'>
        <Header/>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
      </ThemeProvider>
      </div>
    </div>
  )
}

export default layout