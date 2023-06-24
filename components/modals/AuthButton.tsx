"use client"

import { signIn } from 'next-auth/react'
import React from 'react'
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'

const AuthButton = () => {
  return (
    <div>
        <div className='grid grid-cols-2 gap-4'>
            <button className='flex items-center gap-4 border-2 py-2 px-6 md:py-4 md:px-9 rounded-md  
            text-center hover:font-bold hover:border-4 transition-all'
                onClick={() => signIn('google')}
            >
                Google Auth <FcGoogle size={24} />
            </button>
            <button className='flex items-center gap-4 border-2 py-2 px-6 md:py-4 md:px-9 rounded-md
             border-black text-center hover:font-bold hover:border-4 transition-all'
                onClick={() => signIn('github')}
             >
                Github Auth <AiFillGithub  size={24}/>
            </button>
        </div>

        <div className='flex items-center justify-center'>
            <button className='mt-4 flex items-center justify-center gap-4 border-2 py-2 px-6 md:py-4 md:px-9 rounded-md  hover:font-bold hover:border-4 transition-all
             border-sky-500 text-center text-sky-600'
                onClick={() => signIn('linkedin')}
             >
                Linkedin Auth <AiFillLinkedin  size={24}/>
            </button>
        </div>
    </div>
  )
}

export default AuthButton