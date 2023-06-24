import React, { Suspense } from 'react'
import getBookmarkListing from '../actions/getBookmarks'
import Container from '@/components/Container'
import BookmarkContainer from './BookmarkContainer'
import getCurrentUser from '../actions/getCurrentUser'
import Header from '@/components/Header'
import NothingFound from '@/components/NothingFound'

const BookmarkPage = async () => {
    const listings = await getBookmarkListing();
    const currentUser = await getCurrentUser();

    if(listings.length === 0) {
        return <NothingFound />
    }
  return (
    <Container>
        <Header 
            title='Bookmark Page'
            subtitle=' Bookmak car and come back when you need it'
        />
        <Suspense fallback={<NothingFound />}>

            <BookmarkContainer
                listings={listings}
                currentUser={currentUser}
            />
        </Suspense>

    </Container>
  )
}

export default BookmarkPage