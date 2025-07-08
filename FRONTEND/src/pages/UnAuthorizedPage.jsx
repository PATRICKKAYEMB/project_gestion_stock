import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'

import React from 'react'

const UnAuthorizedPage = () => {
  return (
    <main className='flex w-full'>
        <Sidebar/>
        {/* Sidebar for navigation */}

        <div className='flex-1 h-screen bg-[#F5F5F5] relative overflow-auto' >
            <Navbar/>
            <div className='w-full h-full flex items-center justify-center bg-[#E6D5D0]'>
                 <p className='text-2xl text-red-500'>seul l'admin a le droit d'access
                 </p>


            </div>
        </div>
    </main>
  )
}

export default UnAuthorizedPage