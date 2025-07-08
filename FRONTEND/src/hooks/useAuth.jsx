import { AppContext } from '@/context/AppContext'
import React, { useContext } from 'react'

const useAuth = () => {

    const context = useContext(AppContext)

    if(!context){
        throw new Error("useAuth doit être utilisé à l’intérieur de <ContextProvider>")
    }
  return context
   
  
}

export default useAuth