import React, { useContext } from 'react'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'
import { useNavigate, useParams } from 'react-router-dom'

import { useForm } from 'react-hook-form'
import SpinnerPost from './SpinnerPost'
import { AppContext } from '@/context/AppContext'

const VentePage = () => {
  const {register,handleSubmit}=useForm()
  const {id} =useParams()
  const navigate= useNavigate()

 const {panier}= useContext(AppContext)

  const onSubmit =(data)=>{
    const form_data = new FormData()
    form_data.append("client_name",data.client_name)
    form_data.append("quantite",data.quantite)
    form_data.append("date_vente",data.date_vente)
    form_data.append("produit",id)
    panier({formData:form_data})
    navigate("/produits")
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
                      <Label htmlFor="quantite">Quantite:</Label>
                      <Input
                        id="quantite"
                        type="number"
                        step="0.01"
                        {...register("quantite",{required:true})}
                        className="mt-2 mb-4"
                      />
                    </div>

                   
                    <button
                      type="submit"
                     
                      className="w-full mt-2 bg-blue-900 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                     Ajouter au panier
                         
                    </button>
                  </form>
            </div>

         </div>
 </main>
  </div>
  )
}

export default VentePage