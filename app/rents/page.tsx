import React, { Suspense } from 'react'
import getRents from '../actions/getRents'
import getCurrentUser from '../actions/getCurrentUser'
import Container from '@/components/Container'
import RentClient from './RentClient'
import Header from '@/components/Header'
import NothingFound from '@/components/NothingFound'

const RentPage = async () => {
  const currentUser = await getCurrentUser()
  
  if(!currentUser){
    return <div>sign up</div>
  }

  const rents = await getRents({
    authorId: currentUser.id})


  return (
    <Container>
        <Header
            title='Rented Cars'
            subtitle='Bookings on your properties'
        />
        <Suspense fallback={<NothingFound />}>
          <RentClient
            rents={rents}
            currentUser={currentUser}
          />
        </Suspense>

    </Container>
  )
}

export default RentPage