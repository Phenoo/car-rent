import React from 'react'


interface HeaderProps {
    title: string;
    subtitle: string
}

const Header: React.FC<HeaderProps> = ({title, subtitle}) => {
  return (
    <div className='flex flex-col gap-0 mb-6'>
        <div className='font-bold text-lg md:text-2xl'>
            {title}
        </div>
        <div className='text-neutral-700 text-base'>
            {subtitle}
        </div>
    </div>
  )
}

export default Header