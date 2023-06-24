"use client"

import { SafeUser } from '@/app/types'
import { signOut } from 'next-auth/react';
import Image from 'next/image'
import React from 'react'
import MenuItem from './MenuItem';
import useLoginModal from '@/app/hooks/useLoginModal';
import { useRouter } from 'next/navigation';

interface AvatarProps {
  currentUser?: SafeUser | null;
  imageSrc?: string | null | undefined;
  isOpen?: boolean;
  onToggle?: () => void
}

const Avatar:React.FC<AvatarProps> = ({imageSrc, currentUser, onToggle, isOpen}) => {
  const loginModal = useLoginModal()
  const router = useRouter();
  return (
    <div className='w-10 h-10 rounded-full flex items-center cursor-pointer relative' onClick={onToggle}>
      {
        currentUser ? 
          <Image src={imageSrc|| '/user.jpg'} alt="avatar" width="40" height="40" className='rounded-full' />
          :
          <Image src={'/question.jpg'} alt="avatar" width="30" height="30" className='rounded-full flex items-center justify-center' />        
      }

      {
          isOpen && (
          <div className='md:hidden absolute top-6 right-4 bg-primary cursor-pointer shadow-md'>
            {
              currentUser ?  
              <div className='flex flex-col gap-4 w-20'>

              <MenuItem 
                label="Logout" 
                onClick={() => signOut()}
              />
              <MenuItem 
              label="My Rentals" 
              onClick={() => router.push('/rentals')}
            />
              </div>

            :
            <MenuItem 
              label="Login" 
              onClick={loginModal.onOpen}
            />
            }
           
          </div>
         )
      }
    </div>
  )
}

export default Avatar