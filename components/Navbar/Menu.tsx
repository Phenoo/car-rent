"use client"

import useSearchModal from '@/app/hooks/useSearchModal'
import { differenceInDays } from 'date-fns'
import { useSearchParams } from 'next/navigation'
import React, { useMemo } from 'react'

import { ImEqualizer } from 'react-icons/im'

const Menu = () => {
  const searchModal = useSearchModal()
  const params = useSearchParams();

  const brandValue = params?.get('brand');
  const priceValue = params?.get('price');
  const year = params?.get('year')

  const brandLabel = useMemo(() => {
    if(brandValue){
      return `${brandValue}`
    }

    return 'Add Brand'
  }, [brandValue])

  const priceLabel = useMemo(() => {
    if(priceValue){
      return `$${priceValue}`
    }

    return 'Add Price'
  }, [priceValue]);

  const yearLabel = useMemo(() => {
    if(year){
      return `${year}`
    }

    return 'Model Year'
  }, [year]);
  

  const handleClick = () => {
    searchModal.onOpen()
  }
  
  return (
    <div className='w-full md:w-fit shadow-sm border rounded-3xl hover:shadow-lg transition p-4 flex gap-4 items-center justify-between cursor-pointer' onClick={handleClick}>
      <div className='flex justify-between gap-4'>
        <div className='md:hidden text-sm'>Search</div>
        <div className='hidden md:block px-2 md:px-6 text-xs md:text-sm'>{brandLabel}</div>
        <div className='hidden md:block  px-2 md:px-6 text-xs md:text-sm'>{yearLabel}</div>
        <div className='hidden md:block px-2 md:px-6 text-xs md:text-sm'>{priceLabel}</div>
      </div>
      <div className='pr-4 cursor-pointer' onClick={handleClick}>
        <ImEqualizer color='orange' size={20} />
      </div>
    </div>
  )
}

export default Menu