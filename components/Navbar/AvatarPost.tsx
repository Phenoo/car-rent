"use client"

import Image from 'next/image'
import React from 'react'


interface AvatarProps {
  imageSrc?: string | null | undefined;
}

const AvatarPost:React.FC<AvatarProps> = ({imageSrc}) => {
  return (
    <div className='w-10 h-10 rounded-full flex items-center cursor-pointer relative'>
          <Image src={imageSrc|| '/user.jpg'} alt="avatar" width="40" height="40" className='rounded-full' />
    </div>
  )
}

export default AvatarPost