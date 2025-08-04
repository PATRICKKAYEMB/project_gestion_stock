import React, { useContext, useState } from 'react'


import { useMutation } from "@tanstack/react-query"
import { connexion,} from '../api/userApi'
import { AppContext } from '../Context/AppContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import SpinnerPost from '../components/SpinnerPost'
import SmallSpinnerText from '../components/SmallSpinnerText'
import SmallSpinner from '../components/SmallSpinner'

const LoginPage = () => {
 
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
 const   [State, isState ]=useState(false)
 const [message,setIsMessage]= useState("")
  const navigate= useNavigate()

  
  const { handleSuccess, handleUser } = useContext(AppContext)

  const connexionMutation = useMutation({
    mutationFn: (formData) => connexion(formData),
    onSuccess:(data) => {
     
      handleSuccess(data)
      handleUser(data)
       toast.success("Connexion réussie")
      
      
      
     
    },
    onError: () => {
      toast.error("Erreur lors de la connexion")
     
    navigate("/login")
  }

  })


  const onSubmitConnexion = (event) => {
    event.preventDefault()

   
      const data ={
        username:name,
        password:password
      }

      connexionMutation.mutate(data)
  }

 

  return (
    <form className='min-h-[90vh] flex items-center bg-[#F1F1F1]' onSubmit={onSubmitConnexion}>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] bg-white  rounded-xl text-zinc-600 text-sm  shadow-lg'>
        <p className='text-2xl mb-4 font-semibold'>Se connecter</p>
  

         
          <div className='w-full'>
            <p>Nom complet</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1'
              type="text"
              onChange={(e) => setName(e.target.value)}
             
              required />
          </div>
          
        

        
       

        <div className='w-full'>
          <p>Mot de passe</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1'
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required />
        </div>
         
          
           <button type="submit" className='border items-center flex justify-center bg-orange-900 text-white py-2 w-full rounded-md text-base'>
              {connexionMutation.isPending?
              <>
              <SmallSpinner/>
              <SmallSpinnerText text="Connexion..."/>
              </>
              :<SmallSpinnerText text="Se connecter" />
            
            }     
           </button>
         
       
        {State && <p className='text-red-500 text-base'>{message}</p>}
        


        
         
           <p>Créer un compte <span onClick={() => navigate("/enregistrerUser")} className='text-primary underline cursor-pointer'>Cliquer ici</span></p>
        
      </div>
    </form>
  )
}

export default LoginPage
