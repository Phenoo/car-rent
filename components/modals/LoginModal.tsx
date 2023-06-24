"use client"

import React, {useCallback, useState} from 'react'
import { toast } from 'react-hot-toast'
import { signIn } from 'next-auth/react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { FcGoogle} from 'react-icons/fc'
import { useRouter } from 'next/navigation'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'
import Button from '../Button'
import Input from '../inputs/Input'
import Header from '../Header'
import Modal from './Modal'
import AuthButton from './AuthButton'



const LoginModal = () => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState : {
        errors,
    }} = useForm<FieldValues>({
        defaultValues : {
            email: '',
            password: '',
        },
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        signIn('credentials', {
            ...data,
            redirect: false
        })
        .then((callback) => {
            setIsLoading(false);

            if(callback?.ok) {
                toast.success('Logged In');
                router.refresh()
                loginModal.onClose()
            }

            if(callback?.error) {
                toast.error(callback.error)
            }
        });
    }

    const onToggle = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen()
    }, [loginModal, registerModal])


    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Header title='Welcome back to CarsbyDesco'
                subtitle='Login'
            />
            <Input 
                id='email'
                label='Email'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                disabled={isLoading}
                label='Password'
                type='password'
                id='password'
                errors={errors}
                register={register}
                required 
             />
        </div>
    )

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <AuthButton />
            <div className='text-primary text-center mt-4 font-light'>
                <p>First time? 
                    <span onClick={onToggle} className='ml-2 text-primary font-bold hover:underline cursor-pointer'>
                        Sign Up
                    </span></p>
            </div>
        </div>
    )
  return (
    <Modal 
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        title='Login'
        actionLabel='Continue'
        onClose={loginModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
        />
  )
}

export default LoginModal