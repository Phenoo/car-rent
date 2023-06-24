import getListingById from '@/app/actions/getListingById'
import React, { Suspense } from 'react'


import ListingContainer from './ListingContainer';
import getCurrentUser from '@/app/actions/getCurrentUser';
import getRents from '@/app/actions/getRents';
import NothingFound from '@/components/NothingFound';

interface IParams {
    listingId?: string
}

const ListingPage = async ({
    params
} : {params: IParams}) => {
    const listing = await getListingById(params);
    const currentUser = await getCurrentUser()
    const rents = await getRents(params)

    if(!listing) {
        return <NothingFound />
    }
  return (
    <div>
        <Suspense fallback={<NothingFound />}>

            <ListingContainer 
                currentUser={currentUser}
                rent={rents}
                listing={listing}
                
                />
        </Suspense>

    </div>
  )
}

export default ListingPage