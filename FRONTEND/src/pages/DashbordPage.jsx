import React from 'react'
import CountNotification from '../components/CountNotification'
import CountPerte from '../components/CountPerte'
import CountVente from '../components/CountVente'
import CountProduits from '../components/CountProduits'
import Sidebar from '../components/Sidebar'

const DashbordPage = () => {
  return (
    <div className='w-full flex bg-[#F5F5F5]'>
        <Sidebar/>

        <main className='flex-1 px-5 '>
            <div className='gap-8 grid grid-cols-4 px-10 pt-15 w-full'>
                <CountNotification/>
                <CountPerte/>
                <CountVente/>
                <CountProduits/>
            </div>

            <div className='w-full shadow-md bg-white mt-8 h-screen relative'>
                <h3 className='text-center bg-white px-2 py-2 text-2xl absolute -top-6 left-[38%]'> Mes transations</h3>


           </div>   



        </main>
        
    </div>
  )
}

export default DashbordPage