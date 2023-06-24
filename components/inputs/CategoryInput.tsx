"use client"

import Image from 'next/image';
import React from 'react'

interface CategoryInputProps {
    label: string;
    description?: string;
    logo: any
    selected: boolean;
    onClick: (value: string) => void;
}

const CategoryInput:React.FC<CategoryInputProps> = ({
    label, description, logo, selected, onClick
}) => {
  return (
    <div onClick={() => onClick(label)} 
      className={`
        rounded-xl
        border-2
        py-2
        px-4
        flex
        flex-col
        gap-1
        hover:border-secondary
        transition
        cursor-pointer
        ${selected ? 'border-secondary border-4' : 'border-accent-4'}
      `}
    >
         <div className='w-[30px] h-[30px]' >
            <Image src={logo} alt={label} width={30} height={30} className='object-contain' />
        </div>
        <div className='text-sm md:text-base'>
            {label}
        </div>
    </div>
  )
}

export default CategoryInput