import React from 'react'
import {logo} from '../assets/index';

const Navbar = () => {
  return (
    <nav className='md:h-[88px] h-[64px] bg-white border-b border-[#D6D6D6] px-4 py-6 md:py-7 md:px-10 flex justify-start items-center'>
        <div className='flex items-baseline gap-3'>
            <img src={logo} alt="Toyota Connected" className='object-contain'/>
            <h1 className='text-sm text-[#333333] font-semibold leading-none'>大統領と話す</h1>
        </div>
    </nav>
  )
}

export default Navbar