import React from 'react'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { approvisionner } from '@/api/apiAprovisionner'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import SpinnerPost from './SpinnerPost'




const ApprovisionnerPage = () => {

  const {register,handleSubmit} = useForm()

  const {id} = useParams()
  const navigate = useNavigate()


   const mutation= useMutation({
        mutationFn:approvisionner,
        onSuccess: ()=>{
                toast.success("c'est fait")
                navigate("/produits")
        },
        onError:()=>{
          toast.error("erreur lors de reapprovisionnement")
        }
   })

   function onSubmit(data){
   

    const form_data =new FormData()

    const date = new Date(data.date_achat)
    const formattedDate = date.toISOString().split("T")[0]
    form_data.append("date_achat", formattedDate)

    form_data.append("quantite",data.quantite)
   
    form_data.append("total",data.total)
    form_data.append("produit",id)
    mutation.mutate({formData:form_data, id:id})
   }
  return (
    <div className='flex w-full'>
    <Sidebar/>

     <main className="   flex-1 h-[100vh] bg-[#F1F1F1]">
  
        <Navbar/>

        <div className='w-full flex items-center justify-center'>


       
              <div className='w-full max-w-md  bg-white p-6 mt-6 rounded-2xl shadow-lg'>

              <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Aprovisionner produit</h2>
                  <form  onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  

                    <div>
                      <Label htmlFor="quantite">quantite:</Label>
                      <Input
                        id="quantite"
                        type="number"
                        step="0.01"
                        {...register("quantite",{required:true})}
                        className="mt-2 mb-4"
                      />
                    </div>

                    <div>
                      <Label htmlFor="">date d'approvisionnement:</Label>
                      <Input
                        id="date_achat"
                        type="date"
                        step="0.01"
                        {...register("date_achat",{required:true})}
                        className="mt-2 mb-4"
                      />
                    </div>

                    <div>
                      <Label htmlFor="total">total:</Label>
                      <Input
                        id="total"
                        type="number"
                        step="0.01"
                        {...register("total",{required:true})}
                        className="mt-2 mb-4"
                      />
                    </div>

                    

                    <button
                      type="submit"
                      className="w-full mt-2 bg-blue-900 text-white py-2 rounded hover:bg-blue-700 transition"
                      disabled={mutation.isPending}
                    >
                       {mutation.isPending?<SpinnerPost/>:"Ajouter"}   
                    </button>
                  </form>
            </div>

         </div>
 </main>
  </div>
  )
}

export default ApprovisionnerPage