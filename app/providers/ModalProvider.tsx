"use client"


import LoginModal from '@/components/modals/LoginModal'
import RegisterModal from '@/components/modals/RegisterModal'
import RentModal from '@/components/modals/RentModal'
import SearchModal from '@/components/modals/SearchModal'
import React from 'react'
import { Toaster } from 'react-hot-toast'

const ModalProvider = () => {
  return (
    <>
      <Toaster
       toastOptions={{
        className: '',
        style: {
            background: 'black',
            color: 'white',
            padding: '16px',
            width: '250px'
          },
        }}
        />
        <LoginModal />
        <RegisterModal />
        <RentModal />
        <SearchModal />
    </>
  )
}

export default ModalProvider