"use client"

import useLoginModal from '@/app/hooks/useLoginModal'
import useRentModal from '@/app/hooks/useRentModal'
import { SafeUser } from '@/app/types'
import { usePathname } from 'next/navigation'
import React, { useCallback } from 'react'
import {FaPenSquare } from 'react-icons/fa'

interface RentButtonProps {
    currentUser?: SafeUser | null
}

const RentButton:React.FC<RentButtonProps> = ({currentUser}) => {
    const loginModal = useLoginModal();
    const rentModal = useRentModal();
    const pathname = usePathname();

    const onRent = useCallback(() => {
        if(!currentUser){
           return loginModal.onOpen();
        }

        rentModal.onOpen();

    }, [currentUser, loginModal, rentModal]);
    

    if (pathname === '/' || pathname === '/cars' || pathname === '/bookmarks' || pathname === '/rents'){
        return (
            <div className='md:hidden fixed top-3/4 right-8 bg-orange p-2 rounded-md cursor-pointer hover:scale-95 transition'
                onClick={onRent}
            >
                <FaPenSquare size={30} color='#fff' />
            </div>
        )
    } else{
        return null;
    }

}

export default RentButton