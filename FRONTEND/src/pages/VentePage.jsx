import React from 'react'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { venteProduit } from '@/api/apiVente'
import { useForm } from 'react-hook-form'
import SpinnerPost from './SpinnerPost'

const VentePage = () => {
  const {register,handleSubmit}=useForm()
  const {id} =useParams()
  const navigate= useNavigate()

  const mutation = useMutation({

   
    mutationFn: venteProduit,
    onSuccess: ()=>{
      navigate("/produits")
    },
    onError:(error)=>{
      console.error("voici l'erreur",error)
    }
  })

  const onSubmit =(data)=>{
    const form_data = new FormData()
    form_data.append("client_name",data.client_name)
    form_data.append("quantite",data.quantite)
    form_data.append("date_vente",data.date_vente)
    form_data.append("produit",id)
    mutation.mutate({formData:form_data, id:id})
 }
  return (
    <div className='flex w-full'>
    <Sidebar/>

     <main className="   flex-1 h-[100vh] bg-[#F1F1F1]">
  
        <Navbar name={"vente"}/>

        <div className='w-full flex items-center justify-center'>


       
              <div className='w-full max-w-md  bg-white p-6 mt-6 rounded-2xl shadow-lg'>

              <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Vendre produit</h2>
                  <form  className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                  

                    <div>
                      <Label htmlFor="client">Client:</Label>
                      <Input
                        id="client_name"
                        type="text"
                        step="0.01"
                        {...register("client_name",{required:true})}
                        className="mt-2 mb-4"
                      />
                    </div>

                    <div>
                      <Label htmlFor="quantite">Quantite:</Label>
                      <Input
                        id="quantite"
                        type="number"
                        step="0.01"
                        {...register("quantite",{required:true})}
                        className="mt-2 mb-4"
                      />
                    </div>

                    <div>
                      <Label htmlFor="date">Date Vente</Label>
                      <Input
                        id="dateVente"
                        type="date"
                        {...register("date_vente",{required:true})}
                        className="mt-2 mb-4"
                      />
                    </div>

                  


                    <button
                      type="submit"
                      disabled={mutation.isPending}
                      className="w-full mt-2 bg-blue-900 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                      {mutation.isPending?<SpinnerPost/>:" Ajouter"}
                         
                    </button>
                  </form>
            </div>

         </div>
 </main>
  </div>
  )
}

export default VentePage