// 8. src/auth/LoginPage.jsx
import { useState } from 'react';
import axios from 'axios';
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { connexion } from "../api/login"


import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

import SmallSpinnerText from '@/components/SmallSpinnerText';

import { Lock, LogIn, User } from 'lucide-react';

import React from 'react'
import SmallSpinner from '@/components/SmallSpinner';
import { toast } from 'react-toastify';

const Login = () => {

    
  const {register, handleSubmit, formState} =useForm()
  const {errors}=formState
  const navigate=useNavigate()

  const mutation=useMutation({
    mutationFn:(data)=>connexion(data),
    onSuccess: (data) => {
      console.log("Réponse du backend :", data); 
      if (data && data.access && data.refresh) { // Vérifie si `access` et `refresh` existent
          localStorage.setItem("access", data.access);
          localStorage.setItem("refresh", data.refresh);
         toast.success("vous etes connecter")
          navigate("/DashBord");
      } else {
          toast.error("Données manquantes dans la réponse");
          console.error("Données manquantes dans la réponse", data);
      }
  },
    onError:(error)=>{
          toast.error(error.message)
    }

  })

  function onsubmit(data){
    mutation.mutate(data)
  }
  return (
    <div className='w-full h-screen flex items-center justify-center bg-[#E6D5D0]'>
    
    <form onSubmit={handleSubmit(onsubmit)} 
      className="px-4 py-6 flex flex-col mx-auto my-9 
      items-center gap-4 w-fit rounded-lg bg-[#FFFFFF] shadow-xl 
      dark:text-white dark:bg-[#141624]"
    >
      <div className="flex flex-col gap-2 justify-center items-center mb-2">
        <h3 className="font-semibold text-2xl" >connexion</h3>
        
      </div>

      <div>
        <Label className="text-base md:text-lg font-medium mb-3">
          Nom d'utilisateur:

        </Label>
          <div  className='flex items-center justify-center gap-2'>
                <User/>
                <Input type="text"
                className="md:w-[300px] w-[200px]"
                id="username" 
                disabled={mutation.isPending}
                placeholder="veiller entre le nom"
                {...register("username",{required:"nom obligaatoire"})} />
                

          </div>
       
      </div>

      <div>
        <Label className="text-base md:text-lg font-medium mb-3">Mot de passe:</Label>

        <div className='flex items-center justify-center gap-2'>

        <Lock/>
        <Input type="password"
         id="password"
         className="md:w-[300px] w-[200px]"
         placeholder="mot de passe obligatoire"
         disabled={mutation.isPending}
         {...register("password",{required:"mot de pass obligatoire"})} />
        
        </div>
       
      </div>

      <div className='w-full flex items-center justify-center flex-col my-4'>
        <button disabled={mutation.isPending}  className="bg-[#4B6BFB] text-white w-full py-3 px-2 rounded-md flex items-center justify-center gap-2" >
        {mutation.isPending?(
          <>
          <SmallSpinner/>
          <SmallSpinnerText text={"connexion..."}/>
          
          </>
        ):<SmallSpinnerText text={"se connecter"}/>}
        </button>
      </div>
      
    </form>
    
    </div>
  )
}

export default Login