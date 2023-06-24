import React, { Suspense } from 'react'
import getCurrentUser from '../actions/getCurrentUser'
import Container from '@/components/Container'
import ProfileContainer from './ProfileContainer'
import NothingFound from '@/components/NothingFound'

const ProfilePage = async () => {

  const currentUser = await getCurrentUser()

  return (
    <div>
      <Container>
      <Suspense fallback={<NothingFound />}>

        <ProfileContainer
          currentUser={currentUser}
        />
      </Suspense>

      </Container>
    </div>
  )
}

export default ProfilePage