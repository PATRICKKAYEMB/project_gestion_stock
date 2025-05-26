import { BellIcon } from 'lucide-react'
import React from 'react'
import { BiUser } from 'react-icons/bi'

const Navbar = ({name}) => {
  return (
    <div className='flex-1 flex justify-between bg-blue-900 px-5 py-1 h-[60px] ml-1 items-center ' >
        <h3 className='text-white text-2xl font-bold'>{name}</h3> 
        
        <div className='flex items-center justify-center gap-3'>
          
          <div className='relative '>
              <BellIcon size={35} color='white' />
              <p className='absolute -top-1 right-0 px-1 text-sm text-white rounded-full py-0.5 bg-red-600'>4</p>
          </div>
            <BiUser size={35} color='white'/>
           
        </div>
        
    </div>
  )
}

export default Navbar