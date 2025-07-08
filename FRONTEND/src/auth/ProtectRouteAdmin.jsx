import { AppContext } from '@/context/AppContext'
import React, { useContext, useState } from 'react'

const ProtectRouteAdmin = ({children}) => {
    const [isAuthorized, setIsAuthorized]= useState(null)
    const  {user}= useContext(AppContext)

    if (user.role == "admin"){
        setIsAuthorized(true)
    }
    else {
        setIsAuthorized(false)
    }
  return (
     
        isAuthorized ? children : <div className='w-full h-screen flex items-center justify-center bg-[#E6D5D0]'>
            <h1 className='text-2xl font-semibold'> Accès interdit </h1>
        </div>
     
  )
}

export default ProtectRouteAdmin