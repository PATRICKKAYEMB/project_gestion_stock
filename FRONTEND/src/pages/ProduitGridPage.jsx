import React,{useState} from 'react'
import GridView from '../components/GridView'

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
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { FaThLarge, FaThList } from 'react-icons/fa'
import { LayoutGrid, List } from 'lucide-react'



   

const ProduitGridPage = () => {
    const [filter,setFilter] = useState(false)
    const [categorie,setCategorie]= useState("")
    const [sort,setSort] = useState("")
    const [search,setSearch]= useState('')

    const {data:categoriesData} = useQuery({
        queryKey:["categorie_list",categorie,sort],
        queryFn: voir_categorie
    })

    const {data:produitsData} = useQuery({
        queryKey:["produit_list",categorie,sort,search],
        queryFn: (()=>voir_produict({
            categorie: categorie==="all" ? "": categorie
            ,sort,
            name:search
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
                                    
                                    <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} className='outline-0 border-0 ml-1 'placeholder='search...'/>
                                    <BiSearch/>
                                    
                                </div>
                
                                <div className='flex gap-1 items-center justify-center  relative'> 
                                    <div className='flex gap-2 cursor-pointer items-center justify-center px-2 py-0.5 border-2 rounded-b-sm' onClick={()=> setFilter( prev => !prev)}>
                                    <BiFilterAlt/>
                                        <span>filter</span>
                                        
                
                                    </div>
                
                                    
                                    <div className='bg-blue-900 px-2 py-2 rounded-md  hover:bg-black transition-all duration-100 cursor-pointer' onClick={()=>(navigate("/produits"))}>
                                            
                                           
                                            <List size={20} color='white'/>
                                    </div>
                
                                    <div className='bg-blue-900 px-2 py-2 rounded-md  hover:bg-black transition-all duration-100 cursor-pointer'onClick={()=>(navigate("/ProduitGrid"))} >
                                            
                                           
                                            <LayoutGrid size={20} color='white'/>
                                    </div>

                                   
                                    {filter && (
                                         <div className='w-[160px] px-4 py-5 bg-blue-900 absolute top-10 right-0 rounded-md'>
              
                                    <div className="mb-4">
                                        <Select  onValueChange={(val)=>setCategorie(val)} >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Catégorie" />
                                        </SelectTrigger>
                                        <SelectContent>
                                        <SelectItem value='all'>Toutes les catégories </SelectItem>
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
                                        
                                        <div className="overflow-x-hidden overflow-x-scroll h-[60vh] grid grid-cols-4  mt-5 gap-3 w-full ">
                                         { voir_produit.map((prod,id) => (
                                             <GridView  name={prod.name}
                                                        prix={prod.prix}
                                                        categorie={prod.categorie}
                                                        quantite={prod.quantite}
                                                        status={prod.status}
                                                        date_ajout={prod.date_ajout}
                                                        date_expiration={prod.date_expiration}
                                                        id={prod.id}
                                                        image={prod.image}
                                               
                                               />

                                          ) )
                                            

                                         }  
                                        
                                        </div>
                            </div>
                
                        </div>

                    </div>
                
            </div>
         </div>
  )
}

export default ProduitGridPage