"use client"

import { cars } from '@/components/Categories';

import Image from 'next/image';
import React, { useCallback, useMemo, useState } from 'react'

import {  FaUserAlt } from 'react-icons/fa'
import { GiCarDoor, GiCheckMark, GiSteeringWheel } from 'react-icons/gi'
import { BiDotsVertical } from 'react-icons/bi'
import { GrManual } from 'react-icons/gr'

import Bookmark from './Bookmark';
import { BsLightningCharge } from 'react-icons/bs';
import { SafeRent, SafeUser } from '../types';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';


interface ListingCardProps {
    data: {
        id: string;
        title: string;
        imageSrc: string;
        brand: string;
        seatCount: number;
        windowCount: number;
        maxSpeed: string;
        available: boolean;
        price: number;
        year: number;
    };
    handleDelete?: (id: string) => void;
    rent?: SafeRent;
    currentUser?: SafeUser | null;
    disabled?: boolean;
    actionId?: string;
}

const ListingCard:React.FC<ListingCardProps> = ({
    data, currentUser, rent, handleDelete, disabled, actionId=''
}) => {
    const [isLoading, setLoading] = useState(true);
    const router = useRouter();


    const brandCat = useMemo(() => {
        return cars.find((car) => 
            car.name === data.brand
        )
    }, [data.brand]);


    const rentDate = useMemo(() => {
        if(!rent) {
            return null;
        }

        const start = new Date(rent.startDate);
        const end = new Date(rent.endDate);

        return `${format(start, 'PP')} - ${format(end, "PP")}`
    },[rent]);

    const handleClick = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();

            if(disabled){
                return;
            }

            handleDelete?.(actionId)

        }, [disabled, handleDelete, actionId])

    const { id, title, imageSrc, brand, seatCount, windowCount, maxSpeed, available, price, year } = data;

  return (
    <div className='flex flex-col gap-4 rounded-md shadow-md bg-white'>
        <div 
            onClick={() => router.push(`/listings/${id}`)}
            className='aspect-square w-full h-[220px] relative cursor-pointer overflow-hidden'>
            <Image src={imageSrc} alt={title} fill  
                className={`object-cover w-full h-full hover:scale-105 hover:opacity-90  transition rounded-t-md
                    duration-300 ease-in-out group-hover:opacity-75
                    ${
                    isLoading
                        ? "scale-110 blur-2xl grayscale"
                        : "scale-100 blur-0 grayscale-0"
                    })`}
                    onLoadingComplete={() => setLoading(false)}
                    loading='lazy'
             />
            <div className='absolute bg-white p-2 top-4 left-4 rounded-xl font-semibold'>
                ${price} <sub className='font-light'>/day</sub>
            </div>

            { handleDelete &&
                <button className='absolute bg-white p-2 top-4 right-4 rounded-xl' 
                    onClick={handleClick}>
                {
                    rent ? 'cancel' : 'delete'
                }
                </button>
            }
        </div>
        <div className='w-full flex flex-col gap-4 px-4'>
            <div>
                <div>
                    <Image src={brandCat!.logo} alt='brand' width={30} height={30} />
                </div>

                <div className='flex flex-row justify-between'>
                    <div className='text-base font-semibold'>
                        {title}
                    </div>
                        <Bookmark
                            listingId={id}
                            currentUser={currentUser}
                        />
                </div>
            </div>


            <div className='flex flex-row justify-between gap-3 pb-4'>
                <div className='flex flex-col items-center gap-2 text-[#6b6b6b]'>
                    <GiCarDoor />
                    <span className='text-sm'>{windowCount} Doors</span>
                 </div>
                <div className='flex flex-col items-center gap-2 text-[#6b6b6b] opacity-80'>
                    <FaUserAlt className='text-sky-500' />
                    <span className='text-sm'> {seatCount} Seats</span>
                </div>
                <div className='flex flex-col items-center gap-2 text-[#6b6b6b]'>
                    <BsLightningCharge color='orange' />
                    <span className='text-sm'>{maxSpeed} Km/hr</span>
                </div>
                    {
                        available ? <div className='flex flex-col items-center gap-2 text-[#6b6b6b] opacity-90'>
                            <GiSteeringWheel />
                            <span className='text-sm'>Auto</span>
                        </div>
                        :
                        <div className='flex flex-col items-center gap-2 text-[#6b6b6b] opacity-90'>
                            <GrManual  />
                            <span className='text-sm'>Manual</span>
                        </div>
                    }
            </div>
        </div>
        {
            rent &&(
                <div className='p-4 flex items-center gap-2 text-sm text-green'>
                  Rented:  {rentDate} <GiCheckMark />
                </div>
            )
        }
       
    </div>
  )
}

export default ListingCard