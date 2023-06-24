"use client"

import React from 'react'
import { SafeUser } from '../types'
import Container from '@/components/Container'
import useLoginModal from '../hooks/useLoginModal'
import Image from 'next/image'
import Header from '@/components/Header'
import Link from 'next/link'
import { BsArrowUpRightCircleFill } from 'react-icons/bs'
import { VscVerifiedFilled } from 'react-icons/vsc'


interface ProfileContainerPRops {
    currentUser?: SafeUser | null
}

const navigationItems = [
  { link: '/cars', name: 'My Cars',  },
  { link: '/bookmarks', name: 'My Bookmarks',  },
  { link: '/rents', name: 'My Rents',  },
  { link: '/rentals', name: 'Rentals' },


];

const ProfileContainer:React.FC<ProfileContainerPRops> = ({currentUser}) => {
  const loginModal = useLoginModal();

  if (!currentUser){
    return <Container>
      <Header 
        title='My Profile'
        subtitle=''
      />
      <button onClick={loginModal.onOpen} className='hidden md:flex py-2 px-4 rounded-3xl text-sm bg-orange text-white hover:opacity-75 transition'>
        Log in
      </button>
    </Container>;
  }

  return (
    <Container>

      <div className='flex items-center gap-4 mb-12'>
        <div className='rounded-full border'>
           <Image src={currentUser.image|| '/user.jpg'} alt="avatar" width="60" height="60"
             className='rounded-full w-[70px] h-[70px]' 
           />

        </div>
        <div>
          <div className='text-xl md:text-2xl flex gap-4 items-center'>{currentUser.name} <VscVerifiedFilled /> </div>
          <div className='text-xs md:text-sm text-accent-4'>{currentUser.email}</div>
        </div>
      </div>
      
      <hr />

      <div className='flex flex-col gap-6 mt-10'>
        {navigationItems.map((item, index) => {
          return (
            <Link href={`${item.link}`} key={index} className={` flex items-center gap-2 underline hover:font-bold transition`}>
                <span className="text-base md:text-lg">{item.name}</span>
                <span><BsArrowUpRightCircleFill /> </span>
            </Link>
        )
      })}
      </div>

      <div className="mt-8">
        <div className='capitalize font-bold text-xl'>
          Watch some video
        </div>
        <br />
        <video className="w-full h-auto max-w-3xl md:h-64" controls>
          <source src="https://res.cloudinary.com/dnir0cslk/video/upload/v1687320766/pexels-free-videos-853908-1920x1080-25fps_n5twdi.mp4" type="video/mp4" />
        </video>
      </div>

    </Container>
  )
}

export default ProfileContainer