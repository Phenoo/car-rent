"use client"

import React, { useCallback, useMemo, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'

import useSearchModal from '@/app/hooks/useSearchModal'


import Modal from './Modal'
import CategoryInput from '../inputs/CategoryInput'
import { cars } from '../Categories'
import YearSelect from '../inputs/SelectButton'
import CarSelectButton from '../Navbar/Cars'




const SearchModal = () => {
  const router = useRouter();
  const params = useSearchParams();
  const searchModal = useSearchModal();


  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState(0);
  const [year, setYear] = useState<Number>() ?? '';


  const onSubmit = useCallback(async() => {
    let currentQuery = {};

    if(params){
      currentQuery = qs.parse(params.toString())
    }

    const updateQuery: any = {
      ...currentQuery,
      brand,
      price,
      year,
    };



    const url = qs.stringifyUrl({
      url: '/',
      query: updateQuery,
    }, { skipNull: true});

    searchModal.onClose();
    router.push(url);

  }, [searchModal, router, brand, price, year, params])

  const actionLabel = useMemo(() => {
    return 'Search'
  }, []);

 
  



   let bodyContent = (
      <div className='flex flex-col gap-12'>
        <div>
          <label className='text-xl font-semibold mt-4'>Price <span></span></label>
          <input
            type='number'
            placeholder='Enter your price'
            onChange={(e : any) => setPrice(e.target.value)}
            className='w-full p-4 mt-2 border-2 border-neutral-400 rounded-md '
          />
        </div>
        <YearSelect year={year} setYear={setYear} />
          
          <CarSelectButton brand={brand} setBrand={setBrand} />
      </div>
    )

  return (
    <Modal 
      isOpen={searchModal.isOpen}
      title='Filter your seach'
      actionLabel={actionLabel}
      onSubmit={onSubmit}
      onClose={searchModal.onClose}
      body={bodyContent}
    />
  )
}

export default SearchModal