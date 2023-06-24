"use client"

import React, { useCallback, useState } from 'react'
import { SafeListing, SafeUser } from '../types'
import ListingCard from '../listings/ListingCard'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface CarsContainerProps {
    cars: SafeListing[];
    currentUser?: SafeUser | null
}

const CarsContainer:React.FC<CarsContainerProps> = ({cars, currentUser}) => {
    const [deleteId, setDeleteId] = useState('')
    const router =useRouter()
    
    const handleDelete = useCallback((id: string) => {
        setDeleteId(id)

        axios.delete(`/api/listings/${id}`)
        .then(() => {
            toast.success('Deleted')
            router.refresh();
        })
        .catch((err) => {
            toast.error(err)
        })
        .finally(() => {
            setDeleteId('')
        })
    }, [router])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 gap-y-6">
        {
            cars.map((car) => (
                <ListingCard 
                    key={car.id}
                    data={car}
                    currentUser={currentUser}
                    handleDelete={handleDelete}
                    actionId={car.id}
                    disabled={deleteId === car.id}
                />
            ))
        }
    </div>
  )
}

export default CarsContainer