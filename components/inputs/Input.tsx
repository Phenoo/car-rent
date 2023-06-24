import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister} from 'react-hook-form'
 
interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
}

const Input:React.FC<InputProps> = ({
    id, label, type="text", disabled, register, required, errors
}) => {
  return (
    <div className='w-full relative'>
        <input 
            id={id}
            disabled={disabled}
            {...register(id, {required})}
            placeholder=''
            type={type}
            className={`
               peer 
               w-full
               p-4
               pt-6
               font-light
               bg-primary
               text-primary
               border-2
               rounded-md
               outline-none
               transition
               disabled:opacity-70
               disabled:cursor-not-allowed
               ${errors[id] ? 'border-rose-500' : 'border-secondary'}
               ${errors[id] ? 'focus:border-rose-500' : 'focus:border-secondary'}
            `}
            />
            <label className={`
                absolute
                text-md
                text-primary
                duration-150
                transform
                -translate-y-3
                top-5
                left-4
                z-10
                origin-[0]
                peer-placeholder-shown:scale-100
                peer-placeholder-shown:translate-y-0
                peer-focus:scale-75
                peer-focus:-translate-y-4
                ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
            `}>
                {label}
            </label>
    </div>
  )
}

export default Input