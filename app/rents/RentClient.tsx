"use client"

import React, { useCallback, useState } from 'react'
import { SafeRent, SafeUser } from '../types'
import ListingCard from '../listings/ListingCard'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface RentClientProps {
    rents: SafeRent[];
    currentUser?: SafeUser | null
}

const RentClient:React.FC<RentClientProps> = ({
    rents, currentUser
}) => {
    const router = useRouter()
    const [cancelId, setCancelId] = useState('')


    const handleCancel = useCallback((id: string) => {
        setCancelId(id);

        axios.delete(`/api/rents/${id}`)
        .then(() => {
            toast.success('Success');
            router.refresh();
        })
        .catch((err) => {
            toast.error(err)
        })
        .finally(() => {
            setCancelId('')
        })
    }, [router]);


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 gap-y-6">
    {
            rents.map((rent) => (
                <ListingCard 
                    rent={rent}
                    key={rent.id}
                    data={rent.listing}
                    currentUser={currentUser}
                    actionId={rent.id}
                    handleDelete={handleCancel}
                    disabled={cancelId === rent.id}
                />
            ))
        }
    </div>
  )
}

export default RentClient