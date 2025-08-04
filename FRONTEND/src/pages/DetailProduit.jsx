import { Detail_produit, supprimer_produit } from '@/api/apiProduit'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaTrash } from 'react-icons/fa'
import { BASEUrl } from '@/api/api'
import { AppContext } from '@/context/AppContext'
import useAuth from '@/hooks/useAuth'


const DetailProduit = () => {

  const{ajouterAuPanier}=useContext(AppContext)
  const {user} =useAuth()
    const {id} = useParams()
   
    const navigate=useNavigate()

    const {data: detail_produit={}} = useQuery({
        queryKey:["id_produit",id],
        queryFn: ()=> Detail_produit(id)
    })

    const mutate = useMutation({
        mutationFn: ({ id }) => supprimer_produit(id),
        onSuccess: () => {
          navigate("/produits");
          toast.success("Le produit a été supprimé");
        },

      }
    );

     function verificationModification(detail_produit) {

       navigate(`/modifierProduit/${detail_produit.id}/`);
       {/***
         if (!user || user.role !== "admin") {
              alert("Seul l'admin a le droit de modifier un produit");
            }
        
        */}
           
            
      }
      const statusColors = {
        red: "bg-red-500",
        green: "bg-green-500",
        yellow: "bg-yellow-500",
        blue: "bg-blue-500",
        gray: "bg-gray-500",
        // Ajoute d'autres couleurs si nécessaire
    };
 
      function onSubmit(id) {

         if (window.confirm("Voulez-vous vraiment supprimer ce produit ?")) {
          mutate.mutate({ id });

            }

          }

        {/** 
           if (!user || user.role !== "admin") {
          alert("Seul l'admin a le droit de supprimer un produit");
        
          
          */}

       

        

        
       
    

      
   
  return (
    <div className='flex w-full'>
        <Sidebar/>
        <main className='w-full flex-1 h-[100vh] bg-[#F1F1F1]'>
            <Navbar name={"Detail"} />

            <h2 className="text-2xl font-bold text-center mt-10 text-gray-800 ">Detail produit</h2>

            <div className='w-full flex items-center justify-center px-[15%] h-[80vh]'>

           

            <div    className='w-full '>
                    <div className=' flex items-center justify-between gap-2 py-1 '>
                           
                           <div className='flex gap-2'>
                                 
                                <button className='flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded shadow' onClick={() => onSubmit(id)}>
                                <FaTrash /> Supprimer
                                </button>
                                

                           </div>
                           <div className='flex gap-2'>
  

                                <button  className='px-2 py-2 bg-yellow-500 shadow-md rounded-md' onClick={()=>verificationModification(detail_produit.id)}>modification</button>
                            
                           </div>
                           
                    </div>
                <div className='  bg-white shadow-md w-full h-[320px] mt-5 flex items-center justify-center'>
                   
                     
                      <div className=' pl-5 pr-3 w-[40%] bg-blue-900 h-[100%] pt-3'>
                        <div className='flex items-center justify-between'> 
                            <h3 className='text-white text-lg'>produit:</h3> 
                            <span className='text-white text-lg font-semibold'>{detail_produit.name}</span>
                            
                        </div>
                       
                        <div className='flex items-center justify-between'> 
                            <h3 className='text-white text-lg '>prix:</h3> 
                            <span className='text-white text-lg  font-semibold'>{detail_produit.prix}</span>
                        </div>
                        <div className='flex items-center justify-between'> 
                            <h3 className='text-white text-lg'>Stock:</h3> 
                            <span className='text-white text-lg font-semibold'>{detail_produit.quantite}</span>
                        </div>

                        <div className='flex items-center justify-between'> 
                            <h3 className='text-white text-lg '>Status:</h3> 
                            <span className={`w-8 h-4 rounded-full inline-block ${statusColors[detail_produit.status] || "bg-gray-300"}`}></span>
                        </div>
                        
                        <div className='flex items-center justify-between'> 
                            <h3 className='text-white text-lg'>date ajout:</h3> 
                            <span className='text-white text-lg  font-semibold'>{detail_produit.date_ajout}</span>
                        </div>
                        <div className='flex items-center justify-between'> 
                            <h3 className='text-white text-lg '>date d'expiration:</h3> 
                            <span className='text-white text-lg  font-semibold'>{detail_produit.date_expiration}</span>
                        </div>
                        <div className='mt-4'> 
                            <h3 className='text-white text-lg  text-center'>Description:</h3> 
                            <span className='text-sm text-white '>{detail_produit.description}</span>
                        </div>
                        
                      </div>
                        <div className='w-[60%] h-[100%]'>
                              <img src={`${BASEUrl}${detail_produit.image}`} className='w-full bg-blue-900 h-[100%]' />

                        </div>
                     

                </div>
            </div>

        </div>
        </main>

        

    </div>
  )
}

export default DetailProduit




