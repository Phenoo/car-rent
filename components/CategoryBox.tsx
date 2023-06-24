"use client"

import React, { useCallback } from 'react'
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string'

interface CategoryBoxProps {
    label: string;
    logo: any
    selected?: boolean;
}

const CategoryBox:React.FC<CategoryBoxProps> = ({label, logo, selected}) => {
    const router = useRouter()
    const params = useSearchParams()

    const handleClick = useCallback(() => {
        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString())
        }

        const updatedQuery: any = {
            ...currentQuery,
            brand: label
        } 

        if(params?.get('brand') === label){
            delete updatedQuery.brand;
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, {
            skipNull: true
        })
        router.push(url)
    },[label, router, params])


  return (
    <div onClick={handleClick} className={`
        flex flex-col items-center justify-center p-1 border-b-2 hover:opacity-80 hover:text-orange transition-all cursor-pointer
        ${selected ? 'border-b-orange font-bold' : 'border-b-transparent'}
        ${selected ? 'text-orange' : 'text-primary'}
    `}>
        <div className='w-[30px] h-[30px]'>
            <Image src={logo} alt={label} width={30} height={30} className='object-contain' />
        </div>
        <div className='text-xs'>
            {label}
        </div>
    </div>
  )
}

export default CategoryBox