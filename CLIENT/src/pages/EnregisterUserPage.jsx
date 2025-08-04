
import React, { useState } from 'react'
import { useMutation } from "@tanstack/react-query"
import { creationCompte } from '../api/userApi'
import { AppContext } from '../Context/AppContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import SmallSpinner from '../components/SmallSpinner'
import SmallSpinnerText from '../components/SmallSpinnerText'
const EnregisterUserPage = () => {
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
     const navigate= useNavigate() 


  const creationCompteMutation = useMutation({
    mutationFn: (formData) => creationCompte(formData),
    onSuccess: (data) => {
      navigate("/login")
      toast.success("Compte créé avec succès")
      console.log("Compte créé avec succès", data)
      // redirige ou change d'état si besoin
    }
  })

 
  const onSubmitCreationCompte = (event) => {
    event.preventDefault()

    if (!/\S+@\S+\.\S+/.test(email)) {
   
    return
  }
    const formData = new FormData()
    formData.append("name", name)

    formData.append("email", email)
    formData.append("password", password)
    creationCompteMutation.mutate(formData)
  }
  return (
    <form className='min-h-[90vh] flex items-center bg-[#F1F1F1]'  onSubmit={onSubmitCreationCompte}>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] bg-white  rounded-xl text-zinc-600 text-sm  shadow-lg'>
        <p className='text-2xl mb-4 font-semibold'> Créer un compte</p>
  

         
          <div className='w-full'>
            <p>Nom complet</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1'
              type="text"
              onChange={(e) => setName(e.target.value)}
             
              required />
          </div>
          
        

      
        <div className='w-full'>
          <p>Email</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1'
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            
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
          Valider
        {creationCompteMutation.isPending?
          <>
          <SmallSpinner/>
          <SmallSpinnerText text="Création..."/>
          </>
          :<SmallSpinnerText text="Créer un compte" />}
        
        </button>
        
        
        


       
           <p>J'ai déjà un compte ? <span onClick={() => navigate("/login")} className='text-primary underline cursor-pointer'>Se connecter ici</span></p>
         
      
      </div>
    </form>
  )
}

export default EnregisterUserPage