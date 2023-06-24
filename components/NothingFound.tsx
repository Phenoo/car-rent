"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NothingFound = () => {
  return (
    <div className='w-full h-full'>
      <div className='flex items-center justify-center mt-16 flex-col gap-8'>
        <Image src={'/accident.png'} alt='crash' width={50} height={50} className='object-contain'/>
      <div className='text-xl font-bold'>
        Ouch!, Nothing is here yet.
      </div>
      <Link href='/' className='border-4 p-3 px-8 capitalize'>
        Refresh
      </Link>
      </div>

    </div>
  )
}

export default NothingFound