import { ChildrenProps } from '@/app/types'
import React from 'react'

const Container = ({children} : ChildrenProps ) => {
  return (
    <div className='max-6xl lg:mx-12 md:mx-8 sm:mx-6 mx-4 py-4 pb-20'>
        {children}
    </div>
  )
}

export default Container