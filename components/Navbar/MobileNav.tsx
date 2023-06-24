"use client"


import React from 'react'
import { FaCar, FaList } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg'
import { SlHome } from 'react-icons/sl';
import { BsBookmarks, BsListCheck } from 'react-icons/bs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const navigationItems = [
    { link: '/cars', name: 'My Cars', icon: FaCar },
    { link: '/bookmarks', name: 'Bookmarks', icon: BsBookmarks },
    { link: '/rents', name: 'Rents', icon: BsListCheck },
    { link: '/profile', name: 'Profile', icon: CgProfile },

  ];

const MobileNav = () => {
    const pathname = usePathname();
    const isMainPage = pathname === '/'


  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 flex justify-between items-center">
          <Link href='/' className={`${isMainPage && 'text-orange font-bold'} flex flex-col items-center`}>
            <SlHome size={20} />
            <span className="text-xs mt-1">Home</span>
        </Link>
      {navigationItems.map((item, index) => {
        const isActive = pathname?.match(item.link)
        return (
            <Link href={`${item.link}`} key={index} className={` ${isActive && 'text-orange'} flex flex-col items-center`}>
                {React.createElement(item.icon, { size: 20 })}
                <span className="text-xs mt-1">{item.name}</span>
            </Link>
        )
      })}
    </nav>
  )
}

export default MobileNav