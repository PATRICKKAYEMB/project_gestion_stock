import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { useMutation, useQuery } from '@tanstack/react-query'
import { detailCategorie, modifier_categorie } from '@/api/apiCategorie'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

const ModifierCategoriePage = () => {



const {register,handleSubmit,setValue}= useForm()
    const navigate=useNavigate()
    const {id}= useParams()
    const {data:categories}= useQuery({
        queryKey:["categorie",id],
        queryFn:()=> detailCategorie(id),
        enabled: !!id,
    })
    console.log("id from useParams:", id)

    useEffect(
        ()=>{
            if(categories){
                console.log( "voici le detail categorie",categories)
                setValue("name",categories.name)
                setValue("image",categories.image)
            }
        },[categories,setValue]
    )

    const mutation = useMutation({
        mutationFn:(categorieData)=>modifier_categorie(categorieData),
        onSuccess:()=>{
                navigate("/categorie")
        }
    })

    function onSubmit(data) {
        const formData = new FormData()

        formData.append("name",data.name)
         if (data.image && data.image.lengh > 0) {
              formData.append("image", data.image[0])
            }
        formData.append("categorie",id)
        mutation.mutate({formData:formData,id:id})
    }
    
    
  return (
     <main className='flex w-full'>  
            <Sidebar/>
            <div className='flex-1 h-screen bg-[#F5F5F5] relative overflow-auto'>
                <Navbar/>

                 <div className="w-full flex items-center justify-between mt-8 px-6 mb-2 py-2">
                         <h3 className="text-3xl font-bold text-blue-900">categorie</h3>
                 </div>

                <div className='items-center justify-center flex w-full'>

               
                        <div className=' max-w-md  w-full bg-white p-6 mt-6 rounded-2xl shadow-lg'>
                                         <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Modifier une Categorie</h2>
                
                                <form  className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                                                
    
                                                    <div>
                                                    <Label htmlFor="quantite">nom:</Label>
                                                    <Input
                                                        id="quantite"
                                                        type="text"
                                                        {...register("name",{required:true})}
                                                        step="0.01"
                                                        
                                                        className="mt-2 mb-4"
                                                    />
                                                    </div>
                                
                                                    <div>
                                                    <Label htmlFor="">image:</Label>
                                                    <Input
                                                        id="image"
                                                        type="file"
                                                        step="0.01"
                                                        {...register("image",{required:false})}
                                                        className="mt-2 mb-4"
                                                    />
                                                    </div>
                                
                                
                                                    <button
                                                    type="submit"
                                                    className="w-full mt-2 bg-blue-900 text-white py-2 rounded hover:bg-blue-700 transition"
                                                    
                                                    >
                                                       {
                                                        mutation.isPending?"en cours..":"valider"
                                                       }
                                                    </button>
                                </form>
                        </div>

                 </div>

            </div>
        </main>
  )
}

export default ModifierCategoriePage