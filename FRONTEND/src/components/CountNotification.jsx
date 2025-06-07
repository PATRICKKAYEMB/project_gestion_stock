import { CountNotifications } from '@/api/apiNotification'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const CountNotification = () => {
  const {data} =useQuery({
    queryKey:["notifications"],
    queryFn:CountNotifications
  })

  const Notifications= data?? 0
  return (
    <div className='w-full bg-blue-900 shadow-md rounded-md h-[110px] items-center justify-center flex flex-col '>

        <h3 className='text-white text-2xl mb-3'>{Notifications?.count}</h3>
        <p className='text-white text-lg'>Notifications</p>
    </div>
  )
}

export default CountNotification