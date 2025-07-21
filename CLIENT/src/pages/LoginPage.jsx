import React, { useState } from 'react'

const LoginPage = () => {
  const [state,setState] = useState("Sign Up")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [name,SetName] = useState("")
  const onSubmitHandler =async (event) =>{
      event.preventDefault()
  }
  return (
     <form className='min-h-[90vh] flex items-center bg-[#F1F1F1]'>
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] bg-white  rounded-xl text-zinc-600 text-sm  shadow-lg'>
              <p className='text-2xl mb-4 font-semibold'>{state === "Sign Up" ? "Creer compte":"Se connecter"}</p>
               {
                state === "Sign Up" && <div className='w-full'>
                <p>Nom complet</p>
                <input className='border border-zinc-300  rounded w-full p-2 mt-1' type="text" onChange={(e)=> SetName(e.target.name)} value={name}  required/>
              </div> 

               }

                

                <div  className='w-full'>
                  <p>Email</p>
                  <input className='border border-zinc-300  rounded w-full p-2 mt-1' type="email" onChange={(e)=> setEmail(e.target.email)} value={email}  required/>
                </div>

                <div  className='w-full'>
                  <p>Password</p>
                  <input className='border border-zinc-300  rounded w-full p-2 mt-1'  type="password" onChange={(e)=> setPassword(e.target.password)} value={password} required />
                </div>
                <button className='border bg-orange-600 text-white py-2 w-full rounded-md text-base'>{state=== "Sign Up"?"Valider" :"Connexion"}</button>
                {
                state=== "Sign Up"
                ? <p>j'ai deja un compte? <span onClick={()=>setState("Login")} className='text-primary underline cursor-pointer'> se connecter ici</span> </p>
                : <p>Creer un compte? <span onClick={()=>setState("Sign Up")}  className='text-primary underline cursor-pointer'>cliquer ici</span> </p>
                }
            </div>
      </form>
  )
}

export default LoginPage