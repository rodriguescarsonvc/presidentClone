import React from 'react'
import {logo} from '../assets/index';

const Navbar = () => {
  return (
    <nav className='md:h-[88px] h-[74px] bg-white border-b border-[#D6D6D6] px-4 py-5 md:py-7 md:px-10 flex justify-start items-center'>
        <div className='flex items-baseline md:gap-3 gap-2'>
            <img src={logo} alt="Toyota Connected" className='object-contain'/>
            <h1 className='md:text-sm text-xs text-[#333333] font-semibold leading-none'>社長と話す</h1>
        </div>
    </nav>
  )
}

export default Navbar