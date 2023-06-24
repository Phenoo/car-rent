import React from 'react'
import { Anton } from 'next/font/google'
import Image from 'next/image'


import Img1 from '@/components/images/car.png'
import Link from 'next/link'

const Logo = () => {
  return (
    <Link href='/' className=' hidden md:block'>
        <div className='w-[40px] h-[40px]'>
            <Image src={Img1} alt='logo' width={30} height={30} />
        </div>
    </Link>
  )
}

export default Logo