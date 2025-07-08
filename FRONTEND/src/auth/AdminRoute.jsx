import Spinner from '@/components/Spinner'
import useAuth from '@/hooks/useAuth'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const AdminRoute = ({children}) => {

    const[isAuthorized, setIsAuthorized]= useState(null)
    const navigation= useNavigate()

    const {user}= useAuth()

   useEffect(() => {
    
        if (!user){
            setIsAuthorized(false)
        }

        else if (user.role !== "admin"){
            setIsAuthorized(false)
        }
        else{
            setIsAuthorized(true)
        }
            
    }, [user])

    if (isAuthorized === null) {
        return <Spinner/>
    }
 
  return isAuthorized ? children: navigation("/unauthorized")

}

export default AdminRoute