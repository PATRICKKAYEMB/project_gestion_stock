import React from 'react'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'
import { Textarea } from "@/components/ui/textarea"
import { useForm } from 'react-hook-form'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useMutation, useQuery } from '@tanstack/react-query'
import { Ajouter_produit } from '@/api/apiProduit'
import { toast } from 'react-toastify'
import { voir_categorie } from '@/api/apiCategorie'
import { useNavigate } from 'react-router-dom'



const AjouterProduitPage = () => {
  const navigation = useNavigate()
  const {register,handleSubmit,setValue}= useForm()
  const mutation = useMutation({
    mutationFn:Ajouter_produit,
    onSuccess:()=>{
      toast.success("produit ajouter")
      navigation("/produits")

    },
    onError:()=>{
      toast.error("erreur lors de l'ajout")
    }
  })

  const {data:categorieData} =useQuery({
    queryKey:["categorie"],
    queryFn:voir_categorie
  })

  function onSubmit(data){
    const form_data= new FormData()

    form_data.append("name",data.name)
    form_data.append("prix",data.prix)
    form_data.append("image",data.image[0])
    form_data.append("categorie",data.categorie)
    form_data.append("description",data.description)
    form_data.append("quantite",data.quantite)
    form_data.append("date_ajout",data.date_ajout)
    form_data.append("date_expiration",data.date_expiration)
    mutation.mutate(form_data)
  }

  const categorie= categorieData || []
  return (
    <div className='flex w-full'>
    <Sidebar/>

     <main className="   flex-1 h-[100vh] bg-[#F1F1F1]">
  
        <Navbar/>

        <div className='w-full flex items-center justify-center'>


       
              <div className='w-full max-w-md  bg-white p-6 mt-6 rounded-2xl shadow-lg'>

              <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Ajouter un produit</h2>
                  <form onSubmit={handleSubmit(onSubmit)}  className="space-y-5">
                  
                  <div className='flex items-center justify-center gap-2'>
                          <div>
                              <Label htmlFor="name">Produit:</Label>
                              <Input
                                id="name"
                                type="text"
                               
                                {...register("name",{required:true})}
                                className="mt-2 mb-4"
                              />
                            </div>

                             <div>
                              <Label htmlFor="image">Image:</Label>
                              <Input
                                id="image"
                                type="file"
                                {...register("image",{required:true})}
                                
                                className="mt-2 mb-4"
                              />
                            </div>
                  </div>
                    
                  <div className='flex items-center justify-center gap-2'>
                                      <div>
                      <Label htmlFor="categorie">Catégorie :</Label>

                      <Select
                        onValueChange={(value) => setValue("categorie", value)}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Choisir une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          {categorie.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id.toString()}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {/* Ce champ est requis pour que react-hook-form le détecte */}
                      <input type="hidden" {...register("categorie", { required: true })} />
                    </div>


                          <div>
                            <Label htmlFor="prix">Prix:</Label>
                            <Input
                              id="prix"
                              type="number"
                              step="0.01"
                              {...register("prix",{required:true})}
                              
                              className="mt-2 mb-4"
                            />
                          </div>  

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

                  </div>
                   

                   <div className='flex items-center justify-center gap-2'>
                      <div>
                          <Label htmlFor="date">Date ajout</Label>
                          <Input
                            id="date_ajout"
                            type="date"
                            {...register("date_ajout",{ required:true})}
                            className="mt-2 mb-4"
                          />
                        </div>

                        <div>
                      <Label htmlFor="date">Date expiration</Label>
                      <Input
                        id="date_expiration"
                        type="date"
                        {...register("date_expiration",{required:true})}
                      
                        className="mt-2 mb-4"
                      />
                    </div>

                   </div>
                  
                   
                   <div>
                     <Label htmlFor="description">description</Label>
                     <Textarea   className="mt-2 mb-4"
                      id='description'
                      type ="text"
                      {...register("description",{required:true})}
                      />
                    </div>
                    

                    <button
                      type="submit"
                      className="w-full mt-2 bg-blue-900 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                          Ajouter
                    </button>
                  </form>
            </div>

         </div>
 </main>
  </div>
  )
}

export default AjouterProduitPage