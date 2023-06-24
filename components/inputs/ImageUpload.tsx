"use client"

import React, { useCallback} from 'react'
import { CldUploadWidget} from 'next-cloudinary'
import Image from 'next/image'
import { TbPhotoPlus } from 'react-icons/tb'
import { on } from 'events'

declare global {
    var cloudinary : any;
}
// 
interface ImageUploadProps {
    onChange: (value: string) => void;
    value: string;
}

const ImageUpload: React.FC<ImageUploadProps>  = ({
    value, onChange
}) => {
    const handleUpload = useCallback((result : any) => {
        onChange(result.info.secure_url)
    }, [onChange]);
    
  return (
    <CldUploadWidget
        onUpload={handleUpload}
        uploadPreset='vptljusu'
        options={{
            maxFiles: 1
        }}
    >
        {({ open}) => {
            return (
                <div onClick={() => open?.()}
                    className='relative cursor-pointer
                       hover:opacity-70
                        transition
                        border-dashed
                        border-2
                        p-20
                        border-accent-4
                        flex flex-col
                        justify-center
                        items-center
                        gap-4
                        text-primary
                    '
                >
                    <TbPhotoPlus size={30} />
                    <div className='font-semibold text-lg'>
                        Click to upload
                    </div>
                    {
                        value && (
                            <div className='absolute inset-0 w-full h-full'>
                                <Image src={value} alt='car' fill style={{ objectFit: 'cover'}} />
                            </div>
                        )
                    }
                </div>
            )
        }}

    </CldUploadWidget>
  )
}

export default ImageUpload