import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { Delete, DeleteIcon } from 'lucide-react'

const NotificationPage = () => {
  return (
    <div className='w-full flex'>
      <Sidebar/>
      <main className='flex-1 w-full bg-[#F1F1F1] '>
           <Navbar/>

           <h3 className='text-center text-blue-900 font-bold text-3xl  mt-10'>notification</h3>

           <div className='w-full px-20 '>

          

                  <div className='flex w-full px-1 mt-10 items-center  mb-3 py-1 bg-white shadow shadow-black  justify-between'>
                            <p className='' >eviter la rupture de stock du savon dont la quantite est devenu faible de puis le 12/02/2025</p>
                            
                            <span><Delete color='red' size={30}/></span>
                  </div>

                  <div className='flex w-full px-1  items-center  mb-3 py-1 bg-white shadow shadow-black justify-between'>
                            <p className='' >eviter la rupture de stock du savon dont la quantite est devenu faible de puis le 12/02/2025</p>
                            
                            <span><Delete color='red' size={30}/></span>
                  </div>

                  <div className='flex w-full px-1  items-center  mb-3 py-1 bg-white shadow shadow-black justify-between'>
                            <p className='' >eviter la rupture de stock du savon dont la quantite est devenu faible de puis le 12/02/2025</p>
                            
                            <span><Delete color='red' size={30}/></span>
                  </div>

           </div>
      </main>


    </div>
  )
}

export default NotificationPage