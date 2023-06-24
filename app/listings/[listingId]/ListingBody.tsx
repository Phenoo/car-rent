"use client"

import { SafeListing, SafeUser } from '@/app/types'
import Image from 'next/image'
import React from 'react'
import { BsLightningCharge } from 'react-icons/bs';
import { FaUserAlt } from 'react-icons/fa';
import { GiCarDoor, GiSteeringWheel } from 'react-icons/gi';
import Bookmark from '../Bookmark';
import AvatarPost from '@/components/Navbar/AvatarPost';
import { GrManual } from 'react-icons/gr';

interface ListingBodyProps{
    listing: SafeListing & {
        user?: SafeUser | null;
      };
    currentUser?: SafeUser | null;
    brandCat: any;
}

const ListingBody: React.FC<ListingBodyProps> = (
    {listing, currentUser,brandCat }
) => {
  return (
    <div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 gap-y-12'>
            <div>
                <div className='relative aspect-square h-[400px] w-full '>
                    <Image src={listing.imageSrc} alt='listing' fill className='object-contain rounded-lg' />
                </div>

                <div className='flex justify-between items-center my-4 md:mx-8'>
                    <div className='flex gap-2 border border-accent-4 rounded-xl w-fit p-2 px-4 cursor-pointer' >
                        <AvatarPost imageSrc={listing.user!.image} />
                        <div className='flex flex-col gap-0'>
                            <span className='font-semi-bold text-base'> {listing.user!.name}</span>
                            <span className='text-xs text-accent-4'>Owner</span>
                        </div>
                    
                    </div>
                    <Bookmark 
                        listingId={listing.id}
                        currentUser={currentUser}
                    />
                </div>
               
            </div>
           
            <div>
                <h3 className="text-2xl font-bold">Description</h3>
                <div className=' mb-2'>
                    {brandCat.description}
                </div>
                <h3 className="text-lg font-semibold mb-2 mt-4">Features</h3>
                <div className='flex flex-row justify-between gap-3 pb-4 my-4'>
                    <div className='flex flex-col items-center gap-2 text-[#6b6b6b]'>
                        <GiCarDoor />
                        <span className='text-sm'>{listing.windowCount} Doors</span>
                    </div>
                    <div className='flex flex-col items-center gap-2 text-[#6b6b6b] opacity-80'>
                        <FaUserAlt className='text-sky-500' />
                        <span className='text-sm'> {listing.seatCount} Seats</span>
                    </div>
                    <div className='flex flex-col items-center gap-2 text-[#6b6b6b]'>
                        <BsLightningCharge color='orange' />
                        <span className='text-sm'>{listing.maxSpeed} Km/hr</span>
                    </div>
                        {
                            listing.available ? <div className='flex flex-col items-center gap-2 text-[#6b6b6b] opacity-90'>
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
                <div className="p-4 border-t border-gray-200">
                    <ul className="list-disc list-inside ">
                        <li>Air Conditioning</li>
                        <li>Power Steering</li>
                        <li>ABS Brakes</li>
                        <li>Fuel Policy: Full to Full</li>
                        <li>Mileage allowance: unlimited</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ListingBody