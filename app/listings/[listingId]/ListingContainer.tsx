"use client"

import { SafeListing, SafeRent, SafeUser } from '@/app/types'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import ListingHead from './ListingHead';
import Container from '@/components/Container';
import ListingBody from './ListingBody';
import { cars } from '@/components/Categories';
import ListingReservation from '../ListingReservation';
import { Range } from 'react-date-range';
import useLoginModal from '@/app/hooks/useLoginModal';
import { differenceInDays, eachDayOfInterval } from 'date-fns';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Comment from '@/components/Comment';
import ListingComments from './ListingComments';


const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
};

interface ListingContainerProps {
    currentUser?: SafeUser | null;
    listing: SafeListing
    rent?: SafeRent[];
}

const ListingContainer:React.FC<ListingContainerProps> = ({
    currentUser, listing, rent = []
}) => {
    
    const loginModal = useLoginModal();

    const disabledDates = useMemo(() => {
        let dates: Date[] = [];

        rent.forEach((item : any) => {
            const range = eachDayOfInterval({
                start: new Date(item.startDate),
                end: new Date(item.endDate)
            });

            dates = [...dates, ...range];
        }) ;

        return dates;
    }, [rent]);

    const brandCat = useMemo(() => {
        return cars.find((car) => car.name === listing.brand)
    }, [listing.brand])


    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);

    const router = useRouter()

    const onCreateRent = useCallback(() => {
        if(!currentUser){
            return loginModal.onOpen();
        }

        setIsLoading(true);

        axios.post(`/api/rents`, {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?.id
        })
        .then(() => {
            toast.success("Listing reserved");
            setDateRange(initialDateRange);
            router.refresh();
        })
        .catch(() => {
            toast.error("Error, try again")
        })
        .finally(()=>{
            setIsLoading(false)
        })
    }, [totalPrice, dateRange, listing?.id, router, currentUser, loginModal])

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
          const dayCount = differenceInDays(
            dateRange.endDate, 
            dateRange.startDate
          );
          
          if (dayCount && listing.price) {
            setTotalPrice(dayCount * listing.price);
          } else {
            setTotalPrice(listing.price);
          }
        }
      }, [dateRange, listing.price]);

  return (
    <Container>
        <ListingHead
            name={listing.title}
            brand={listing.brand}
            year={listing.year}
            brandCat={brandCat}
        />
        <ListingBody 
            listing={listing}
            currentUser={currentUser}
            brandCat={brandCat}
        />
        <ListingReservation 
            price={listing.price}
            totalPrice={totalPrice}
            onChangeDate={(value) => setDateRange(value)}
            dateRange={dateRange}
            onSubmit={onCreateRent}
            disabled={isLoading}
            disabledDates={disabledDates}
            currentUser={currentUser}
        />
        <Comment
            currentUser={currentUser}
            listingId={listing.id}
        />
        <ListingComments 
           post={listing.comments}
        />
    </Container>
  )
}

export default ListingContainer