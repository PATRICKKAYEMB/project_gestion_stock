import React from 'react'
import CountNotification from '../components/CountNotification'
import CountPerte from '../components/CountPerte'
import CountVente from '../components/CountVente'
import CountProduits from '../components/CountProduits'
import Sidebar from '../components/Sidebar'
import SideBarMobile from '@/components/SideBarMobile'
import Navbar from '@/components/Navbar'

const DashbordPage = () => {
  return (
    <div className='w-full flex bg-[#F1F1F1]'>
        <Sidebar/>

        <main className='flex-1 px-5 '>
          <Navbar/>
          <SideBarMobile/>
            <div className='gap-8 grid lg:grid-cols-3  md:grid-cols-3 px-10 pt-10 w-full'>
                <CountNotification/>
               
                <CountVente/>
                <CountProduits/>
            </div>

            <div className='grid lg:grid-cols-2 gap-5'>
                       <div className='w-full shadow-md rounded-2xl shadow-gray-400  bg-white mt-8 h-[300px] relative'>
              
                      </div> 

                       <div className='w-full shadow-md rounded-2xl shadow-gray-400  bg-white mt-8 h-[300px] relative'>
                          
                       </div> 


            </div>
             



        </main>
        
    </div>
  )
}

export default DashbordPage