import React, { useContext, useState } from 'react'


import { useMutation } from "@tanstack/react-query"
import { connexion, creationCompte } from '../api/userApi'
import { AppContext } from '../Context/AppContext'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const [state, setState] = useState("Sign Up")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const navigate= useNavigate()

  
  const { handleSucces, handleUser } = useContext(AppContext)

  const connexionMutation = useMutation({
    mutationFn: (formData) => connexion(formData),
    onSuccess: (data) => {
      handleSucces(data)
      handleUser(data)
    },
    onError: () => {
    setErrorMessage("Email ou mot de passe incorrect")
  }

  })

  const creationCompteMutation = useMutation({
    mutationFn: (formData) => creationCompte(formData),
    onSuccess: (data) => {
      navigate("/home")
      console.log("Compte créé avec succès", data)
      // redirige ou change d'état si besoin
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

  const onSubmitCreationCompte = (event) => {
    event.preventDefault()

    if (!/\S+@\S+\.\S+/.test(email)) {
    setErrorMessage("Email invalide")
    return
  }
    const formData = new FormData()
    formData.append("name", name)

    formData.append("email", email)
    formData.append("password", password)
    creationCompteMutation.mutate(formData)
  }

  return (
    <form className='min-h-[90vh] flex items-center bg-[#F1F1F1]' onSubmit={state === "Sign Up" ? onSubmitCreationCompte : onSubmitConnexion}>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] bg-white  rounded-xl text-zinc-600 text-sm  shadow-lg'>
        <p className='text-2xl mb-4 font-semibold'>{state === "Sign Up" ? "Créer un compte" : "Se connecter"}</p>
  

         
          <div className='w-full'>
            <p>Nom complet</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1'
              type="text"
              onChange={(e) => setName(e.target.value)}
             
              required />
          </div>
          
        

         {state === "Sign Up" && (
        <div className='w-full'>
          <p>Email</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1'
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            
            required />
        </div>

         )}
       

        <div className='w-full'>
          <p>Mot de passe</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1'
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required />
        </div>

        <button type="submit" className='border bg-orange-600 text-white py-2 w-full rounded-md text-base'>
          {state === "Sign Up" ? "Valider" : "Connexion"}
        </button>
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}


        {state === "Sign Up"
          ? <p>J'ai déjà un compte ? <span onClick={() => setState("Login")} className='text-primary underline cursor-pointer'>Se connecter ici</span></p>
          : <p>Créer un compte ? <span onClick={() => setState("Sign Up")} className='text-primary underline cursor-pointer'>Cliquer ici</span></p>
        }
      </div>
    </form>
  )
}

export default LoginPage
