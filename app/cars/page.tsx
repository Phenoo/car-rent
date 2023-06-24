import Container from '@/components/Container'
import Header from '@/components/Header'
import React, { Suspense } from 'react'
import CarsContainer from './CarsContainer'
import getListings from '../actions/getListings'
import getCurrentUser from '../actions/getCurrentUser'
import NothingFound from '@/components/NothingFound'

const CarPage = async () => {
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return <div>sign up</div>
      }

    const cars = await getListings({
        userId: currentUser.id
    })

    if(cars.length === 0){
        return<NothingFound />
    }
    
  return (
    <Container>
        <Header 
            title='Outlook of my cars'
            subtitle='List of my cars available for rent'
        />
        <Suspense fallback={<NothingFound />}>

            <CarsContainer
                cars={cars}
                currentUser={currentUser}
            />
        </Suspense>

    </Container>
  )
}

export default CarPage