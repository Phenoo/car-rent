'use client'

import React from 'react'
import Logo from './Logo'
import UserNav from './UserNav'
import Menu from './Menu'
import Container from '../Container'
import { SafeUser } from '@/app/types'
import Categories from '../Categories'

interface NavigationProps {
  currentUser: SafeUser | null;
}

const Navigation:React.FC<NavigationProps> = ({currentUser}) => {
  return (
    <nav className=''>
    <div className='max-6xl lg:mx-12 md:mx-8 sm:mx-6 mx-4 py-4'>
            <header className='flex items-center justify-between w-full gap-4'>
                <Logo />
                <Menu />
                <UserNav currentUser={currentUser} />
            </header>
        </div>
        <hr />
        <Categories />
    </nav>
  )
}

export default Navigation