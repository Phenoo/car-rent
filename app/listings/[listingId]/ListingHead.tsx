import { cars } from '@/components/Categories';
import Image from 'next/image';
import React, { useMemo } from 'react'

interface LisingHeadProps {
    name: string;
    brand: string;
    year: number;
    brandCat: any;
}

const ListingHead:React.FC<LisingHeadProps> = ({
    name, year, brandCat
}) => {
  return (
    <div>

        <div className='flex justify-between items-center mb-8'>
            <div className='flex flex-col gap-2'>
                <div className='text-lg sm:text-xl md:text-2xl font-bold'>{name}</div>
                <div className='text-accent-4'>{year}</div>
            </div>

            <div className='flex flex-col gap-2 items-end'>
                <div>
                    <Image src={brandCat!.logo} alt={brandCat!.name} width={30} height={30} className='object-contain' />
                </div>
                <div className='text-sm'>
                    {brandCat?.name}
                </div>
            </div>
        </div>

       

    </div>

  )
}

export default ListingHead