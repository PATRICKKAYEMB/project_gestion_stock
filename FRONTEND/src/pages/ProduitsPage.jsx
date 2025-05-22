import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Main from '../components/Main'
import Produits from '../components/Produits'
import Navbar from '../components/Navbar'
import { BiAbacus, BiCategory, BiFilter, BiFilterAlt, BiSearch } from 'react-icons/bi'
import { LiaStackExchange, LiaStarHalf } from 'react-icons/lia'
import { TbCategory } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select';
import { useQuery } from '@tanstack/react-query'
import { voir_categorie } from '@/api/apiCategorie'
import { voir_produict } from '@/api/apiProduit'
import { BASEUrl, BaseUrl } from '@/api/api'


const ProduitsPage = () => {
    const [filter,setFilter] = useState(false)
    const [categorie,setCategorie]= useState("")
    const [sort,setSort] = useState("")

    const {data:categoriesData} = useQuery({
        queryKey:["categorie_list",categorie,sort],
        queryFn: voir_categorie
    })

    const {data:produitsData} = useQuery({
        queryKey:["produit_list"],
        queryFn: (()=>voir_produict({
            categorie,sort
        }))
    })

    const statusColors = {
        red: "bg-red-500",
        green: "bg-green-500",
        yellow: "bg-yellow-500",
        blue: "bg-blue-500",
        gray: "bg-gray-500",
        // Ajoute d'autres couleurs si nécessaire
    };

    const voir_categories = categoriesData || []
    const voir_produit =produitsData || []
   
     const navigate = useNavigate()
  return (
    <div className='w-full flex '> 
    <Sidebar/>
          <div className='flex-1 bg-[#F1F1F1]'>
                <Navbar/>
                    <div className='px-8 pt-6'>

                   

                    <div  className='float-right bg-blue-900 px-4 py-2 shadow shadow-black rounded-md  hover:bg-black transition-all duration-100 cursor-pointer'>
                        <h3 onClick={()=> navigate("/ajouterProduit")} className='text-white text-lg'>ajouter Produit</h3>
                        
                    </div>
                        <div className='px-3 py-1 bg-white mt-16'>
                        
                            
                
                            <div className='flex items-center justify-between mt-5 '>
                                <div className='border-2 flex justify-center items-center px-2 py-1 border-amber-900'> 
                                    
                                    <input type="text"  className='outline-0 border-0 ml-1 'placeholder='search...'/>
                                    <BiSearch/>
                                    
                                </div>
                
                                <div className='flex gap-1 items-center justify-center  relative'> 
                                    <div className='flex gap-2 cursor-pointer items-center justify-center px-2 py-0.5 border-2 rounded-b-sm' onClick={()=> setFilter( prev => !prev)}>
                                    <BiFilterAlt/>
                                        <span>filter</span>
                                        
                
                                    </div>
                
                                    
                                    <div className='bg-blue-900 px-2 py-2 rounded-md  hover:bg-black transition-all duration-100 cursor-pointer' >
                                            <BiCategory size={20} color='white' />
                                    </div>
                
                                    <div className='bg-blue-900 px-2 py-2 rounded-md  hover:bg-black transition-all duration-100 cursor-pointer' >
                                            <TbCategory size={20} color='white' />
                                    </div>

                                   
                                    {filter && (
                                         <div className='w-[160px] px-4 py-5 bg-[blue] absolute top-10 right-0 rounded-md'>
              
                                    <div className="mb-4">
                                        <Select  onValueChange={(val)=>setCategorie(val)} >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Catégorie" />
                                        </SelectTrigger>
                                        <SelectContent>
                                           { voir_categories.map( (cat,id) =>(

                                         

                                          
                                            <SelectItem key={id} value={cat.id}>
                                                    {cat.name}
                                            </SelectItem>

                                                    ) )}
                                            
                                           
                                        </SelectContent>
                                        </Select>
                                    </div>

                                     <div>
                                    <Select onValueChange={(val)=> setSort(val)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Trier par" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="recent">Récent</SelectItem>
                                        <SelectItem value="ancien">Ancien</SelectItem>
                                        <SelectItem value="montant_desc">
                                        Montant décroissant
                                        </SelectItem>
                                        <SelectItem value="montant_asc">
                                        Montant croissant
                                        </SelectItem>
                                    </SelectContent>
                                    </Select>
                 
                            </div>
                            </div>
              )}
                                   
                                    
                                </div>
                
                            </div>
                
                
                            <div >
                
                                        <div className="overflow-x-auto">
                <table className="w-full  mt-4 bg-white ">
                <thead>
                    <tr className=" bg-blue-900 border-1 border-gray-400">
                    <th className="  text-white  text-center">produit</th>
                    <th className="  text-white text-center">Categorie</th>
                    <th className="   text-white text-center">prix</th>
                    <th className="   text-white  text-center">stock</th>
                    
                    <th className=" text-white text-center">Status</th>
                    <th className="   text-white  text-center">Description</th>
                    <th className="   text-white text-center">date ajout</th>
                    <th className="   text-white text-center">date d'expiration</th>

                    </tr>
                </thead>

                <tbody className=''>
                        {
                        voir_produit.map( (prod,id) => (
                        <tr className=' hover:bg-amber-900 transition-all ease-in-out round-md border-1 border-gray-400' key={id} >
                                <td className=" py-3 mb-3 text-center flex gap-3 items-center justify-center">
                                    <span> {prod.name}</span>
                                    <img src={`${BASEUrl}${prod.image}`} alt="" className='w-6 h-6 rounded-full' />
                                    
                                    </td>
                                <td className=" py-1  mb-3  text-center">{prod.categorie}</td>
                               
                                <td className="py-1  mb-3  text-center">{prod.prix}</td>
                                <td className="py-1  mb-3  text-center">{prod.quantite}</td>
                                

                                <td className="py-1  mb-3  text-center">
                                <span className={`w-8 h-4 rounded-full inline-block ${statusColors[prod.status] || "bg-gray-300"}`}></span>

                                </td>

                                <td className=" py-1  mb-3  text-center">{prod.description}</td>
                                <td className="py-1  mb-3  text-center">{prod.date_expiration}</td>
                                <td className="py-1  mb-3   text-center">{prod.date_ajout}</td>
                               
                        </tr>
                            
                            ))}
                   

                </tbody>
                </table>
                                        </div>
                            </div>
                
                        </div>

                    </div>
                
            </div>
         </div>
  )
}

export default ProduitsPage