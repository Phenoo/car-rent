import React from 'react'
import { useTheme } from 'next-themes'
import { BsMoon, BsSun} from 'react-icons/bs'


const Switch = () => {
    const { theme, setTheme} = useTheme();
    const icon = theme === 'dark' ? <BsMoon size={24} /> : <BsSun size={24} />

    const handleClick = () => {
        if(theme === 'dark'){
            setTheme('light');
        }else{
            setTheme('dark');
        }
    }
  return (
    <div>
        <button className='border border-secondary  text-secondary-2 transition-all hover:scale-95 p-2 rounded-full' onClick={handleClick}>
            {icon}
        </button>
    </div>
  )
}

export default Switch