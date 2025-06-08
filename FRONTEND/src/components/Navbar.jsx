import { CountNotifications } from '@/api/apiNotification'
import { useQuery } from '@tanstack/react-query'
import { BellIcon } from 'lucide-react'
import React from 'react'
import { BiUser } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'


const Navbar = ({name}) => {

  const {data} = useQuery({
      queryKey:["notifications"],
      queryFn:CountNotifications
  })
const navigation = useNavigate()
  const notifications= data??0
  return (
    <div className='flex-1 flex justify-between bg-blue-900 px-5 py-1 h-[60px] ml-1 items-center ' >
        <h3 className='text-white text-2xl font-bold'>{name}</h3> 
        
        <div className='flex items-center justify-center gap-3'>
          
          <div className='relative cursor-pointer ' onClick={()=>navigation("/notification")}>
              <BellIcon size={35} color='white' />
              <p className='absolute -top-1 right-0 px-1 text-sm text-white rounded-full py-0.5 bg-red-600'>{notifications?.count}</p>
          </div>
            <BiUser size={35} color='white'/>
           
        </div>
        
    </div>
  )
}

export default Navbar