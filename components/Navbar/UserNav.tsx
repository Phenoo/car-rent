"use client"

import React, { useCallback, useState } from 'react'
import { VscMenu } from 'react-icons/vsc'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'


import Avatar from './Avatar'
import MenuItem from './MenuItem'

import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'
import { SafeUser } from '@/app/types'
import useRentModal from '@/app/hooks/useRentModal'
import { toast } from 'react-hot-toast'

interface UserNavProps {
  currentUser: SafeUser | null
}

const UserNav: React.FC<UserNavProps> = ({currentUser}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router  = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const rentModal = useRentModal();

  const onToggle = useCallback(() => {
    setIsOpen((value) => !value)
  }, [])

  const onRent = useCallback(() => {
    if(!currentUser) {
      return loginModal.onOpen()
    }
    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);




  return (
    <div className='flex items-center gap-2 relative'> 
      <button className='hidden md:flex py-2 px-4 rounded-3xl text-sm bg-orange text-white hover:opacity-75 transition animate-pulse'
        onClick={onRent}
      >
        Rent your car
      </button>

      <div className='md:p-2 flex flex-row items-center gap-3 rounded-full border cursor-pointer'>
        <button onClick={onToggle} className='hidden md:flex'>
          <VscMenu  /> 
        </button>
        <Avatar imageSrc={currentUser?.image} 
            currentUser={currentUser} 
            isOpen={isOpen}
            onToggle={onToggle}
            />
      </div>
      {isOpen && (
        <div 
          className="
            hidden
            md:block
            absolute 
            rounded-xl 
            shadow-md
            w-[20vw]
            bg-primary
            text-primary
            overflow-hidden 
            right-0 
            top-12 
            text-sm
            z-10
            "
        >
          <div className="flex flex-col cursor-pointer" onClick={onToggle}>
            {currentUser ? (
              <>
 
                <MenuItem 
                  label="My Bookmarks" 
                  onClick={() => router.push('/bookmarks')}
                />
                <MenuItem 
                  label="My Rents" 
                  onClick={() => router.push('/rents')}
                />
                <MenuItem 
                  label="My Rentals" 
                  onClick={() => router.push('/rentals')}
                />
                <MenuItem 
                  label="My Cars" 
                  onClick={() => router.push('/cars')}
                />
                <MenuItem 
                  label="My Profile" 
                  onClick={() => router.push('/profile')}
                />
                <MenuItem 
                  label="Logout" 
                  onClick={() => signOut()}
                />
              </>
            ) : (
              <>
                <MenuItem 
                  label="Login" 
                  onClick={loginModal.onOpen}
                />
                <MenuItem 
                  label="Sign up" 
                  onClick={registerModal.onOpen}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserNav