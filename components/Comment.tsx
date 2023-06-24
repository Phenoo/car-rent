"use client";

import useLoginModal from '@/app/hooks/useLoginModal';
import { SafeUser } from '@/app/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import Avatar from './Navbar/Avatar';
import Input from './inputs/Input';
import TextArea from './inputs/TextArea';

interface CommentProps {
    currentUser? : SafeUser | null;
    listingId?: string;
}

const Comment:React.FC<CommentProps> = ({
    currentUser, listingId
}) => {
    const loginModal = useLoginModal();
    const router = useRouter();

    const { register, handleSubmit, setValue, 
        watch, formState: {errors},
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            bodyPost: '',
        },
    })

    const bodyPost = watch('body')
    const setCustomValue = ( id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        });
    };

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (!currentUser){
            return loginModal.onOpen()
        }
        axios.post(`/api/comment/${listingId}`, data)
        .then(() => {
            toast.success('You commented')
            router.refresh()
        })
        .catch(() => {
            toast.error('Something went wrong');
        })
        .finally(() => {
            reset();
        })
    }
  return (
    <div>
        <div className='flex flex-row gap-4 max-w-xl'>
            <Avatar 
                imageSrc={currentUser?.image}
                currentUser={currentUser}
            />
            <div>

            <TextArea
                id='bodyPost'
                label='comment'
                register={register}
                disabled={false}
                errors={errors}
                    />
               
            </div>
            <div className='flex items-end justify-end'>
                <button onClick={handleSubmit(onSubmit)} className=' rounded-2xl py-2 px-4 bg-orange text-white'>
                    send
                </button>
            </div>
        </div>
    </div>
  )
}

export default Comment