"use client"

import React from 'react'
import { SafeListing, SafeUser } from '../types'
import ListingCard from '../listings/ListingCard';

interface BookmarkContainerProps{
    listings: SafeListing[];
    currentUser?: SafeUser | null;
    comments?: []
}

const BookmarkContainer:React.FC<BookmarkContainerProps> = (
    {listings, currentUser}
) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 gap-y-6 mt-8">
    {
        listings.map((listing) => (
            <ListingCard
                data={listing}
                currentUser={currentUser}
                key={listing.id}
            />
        ))
       }
    </div>
  )
}

export default BookmarkContainer