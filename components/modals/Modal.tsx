"use client"

import React, { useCallback, useEffect, useState } from 'react'
import { IoMdClose} from 'react-icons/io'
import Button from '../Button';

interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?:React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
    stepsHead?: React.ReactElement;
}

const Modal:React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
    stepsHead,
    secondaryAction,
    secondaryActionLabel
}) => {
    const [showModal, setShowModal] = useState(isOpen);

    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);

    const handleClose = useCallback(() => {
        if(disabled){
            return;
        }
        setShowModal(false);
        setTimeout(() => {
            onClose();
        }, 300)
    }, [onClose, disabled]);

    const handleSubmit = useCallback(() => {
        if(disabled){
            return;
        }
        onSubmit()
    }, [onSubmit, disabled]);
    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) {
            return;
        }
        secondaryAction();
    }, [secondaryAction, disabled]);

    if (!isOpen){
        return null;
    }

  return (
    <div 
        className='flex justify-center items-center overflow-x-hidden overflow-y-auto
          fixed inset-0 outline-none bg-neutral-800/70 z-40'>
            <div className='relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto'>

                <div className={`
                   translate
                   duration-300
                   h-full
                   ${showModal ? 'translate-y-0' : 'translate-y-full'}
                   ${showModal ? 'opacity-100' : 'opacity-0'}`}>
                    <div className='translate  h-full  md:h-auto  border-0  rounded-lg  
                    shadow-lg  relative  flex  flex-col  bg-primary  outline-none  focus:outline-none'>

                        {/* header */}

                        <div className='flex items-center p-4 md:p-6 rounded-t justify-center relative border-b'>
                            <button className='p-1 border-0 hover:opacity-70 transition absolute left-9'
                                onClick={handleClose}
                            >
                                <IoMdClose size={20} />
                            </button>
                            <div className='text-xl capitalize font-semibold'>
                                {title}
                            </div>
                        </div>

                        {/* body */}

                        <div className='relative p-6 flex-auto'>
                            {stepsHead}
                            {body}
                        </div>

                        {/* footter */}

                        <div className='flex flex-col gap-2 px-6 py-3 md:p-6'>
                            <div className='flex flex-row items-center gap-4 w-full'>
                                {
                                    secondaryAction && secondaryActionLabel && (
                                        <Button 
                                            label={secondaryActionLabel}
                                            onClick={handleSecondaryAction}
                                        />
                                    )
                                }
                                <Button
                                    label={actionLabel}
                                    onClick={handleSubmit}
                                />
                            </div>
                            {footer}
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Modal