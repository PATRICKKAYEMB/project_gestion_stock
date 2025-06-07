import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { Delete, DeleteIcon } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { voir_notifications } from '@/api/apiNotification'

const NotificationPage = () => {
  const {data}= useQuery({
    queryKey:["voir_notification"],
    queryFn:voir_notifications
  })

  const notification= data || []
  return (
    <div className='w-full flex'>
      <Sidebar/>
      <main className='flex-1 w-full bg-[#F1F1F1] overflow-x-scroll h-[100vh] overflow-x-hidden'>
           <Navbar/>

           <h3 className='text-center text-blue-900 font-bold text-3xl  mt-10'>notifications</h3>

           <div className='w-full px-20 '>
          
              {
notification.map((items)=>(


                <div className='flex w-full px-1 mt-10 items-center  mb-3 py-1 bg-white shadow shadow-black  justify-between'>
                <p className='' key={items.id} >{items.description} </p>
                <p>{items.date_alerte}</p>

                </div>

       ))}

           </div>
      </main>


    </div>
  )
}

export default NotificationPage