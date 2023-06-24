"use client"

import React from 'react'
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs'
import { SafeUser } from '../types'
import useBookmark from '../hooks/useBookmark';

interface BookmarkProps{
    currentUser?: SafeUser | null;
    listingId: string;
}

const Bookmark:React.FC<BookmarkProps> = ({
    currentUser, listingId
}) => {

  const { hasFavorited, toggleFavorite } = useBookmark({
    listingId,
    currentUser
  })

    
  return (
    <div 
        onClick={toggleFavorite}
        className='relative
            hover:opacity-80
            transition
            cursor-pointer
        '>
            <BsBookmark 
                size={28}
                className="absolute -top-[2px] -right-[2px] fill-white"/>
                <BsBookmarkFill 
                    size={24}
                    className={`${hasFavorited ? 'fill-orange' : 'fill-neutral-600'}`}
                />
    </div>
  )
}

export default Bookmark