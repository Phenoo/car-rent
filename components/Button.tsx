import React from 'react'

interface ButtonProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) =>void;

}

const Button:React.FC<ButtonProps> = ({
    label, onClick
}) => {
  return (
    <button onClick={onClick}
        className={`
          relative
          disabled:opacity-70
          disabled:cursor-not-allowed
          rounded-lg
          hover:opacity-80
          transition
          w-full
          bg-orange
          border-orange
          text-white
          text-base
          font-semibold
          py-4
        `}
    >
        {label}
    </button>
  )
}

export default Button