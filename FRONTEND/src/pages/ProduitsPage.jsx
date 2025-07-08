import React, { useContext, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Main from '../components/Main'
import Produits from '../components/Produits'
import Navbar from '../components/Navbar'
import { BiAbacus, BiBasket, BiCategory, BiDotsVerticalRounded, BiFilter, BiFilterAlt, BiSearch } from 'react-icons/bi'
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
import { DotIcon, LayoutDashboard, LayoutDashboardIcon, LayoutGrid ,List} from 'lucide-react'
import { AppContext } from '@/context/AppContext'
import { FaThLarge, FaThList } from 'react-icons/fa'
import { MdAdd, MdOutlineShoppingCart } from 'react-icons/md'
import SideBarMobile from '@/components/SideBarMobile'
import useAuth from '@/hooks/useAuth'



const ProduitsPage = () => {
    const [filter,setFilter] = useState(false)
    const [categorie,setCategorie]= useState("")
    const [sort,setSort] = useState("")
     const [search,setSearch]= useState("")


    const {user}=useAuth()

    function verificationAjout(){
        if(!user || user.role !== "admin"){
            alert("seul l'admin a le droit d'ajouter un produit")
        }
        else{
            navigate("/ajouterProduit")
        }
    }

    const {data:categoriesData} = useQuery({
        queryKey:["categorie_list",categorie,sort],
        queryFn: voir_categorie
    })

   

    const {ajouterAuPanier}= useContext(AppContext)
    const {data:produitsData} = useQuery({
        queryKey:["produit_list",categorie,sort,search],
        queryFn: (()=>voir_produict({
            categorie: categorie === "all" ? "" : categorie,
            sort,
            name:search
        }))
    })

    const statusColors = {
        red: "bg-red-500",
        green: "bg-green-500",
        yellow: "bg-yellow-500",
        blue: "bg-blue-500",
        gray: "bg-gray-500",
       
    };

    const voir_categories = categoriesData || []
    const voir_produit =produitsData || []
   
     const navigate = useNavigate()
  return (
    <div className='w-full flex '> 
    <Sidebar/>
          <div className='flex-1 bg-[#F1F1F1]'>
                <Navbar/>
                <SideBarMobile/>
                    <div className='px-2 md:px-8 mt-12 md:mt-0 pt-6'>

                   

                    <div  className='float-right bg-blue-900 px-2 py-1 md:px-4 md:py-2 shadow shadow-black rounded-md  hover:bg-black transition-all duration-100 cursor-pointer'>
                        <h3 onClick={verificationAjout} className='text-white flex items-center justify-center text-lg'>  ajouter <MdAdd size={22} className='ml-3'/></h3>
                        
                    </div>
                        <div className='md:px-3 px-2 py-1 bg-white mt-16'>
                        
                            
                
                            <div className='flex items-center justify-between mt-5 '>
                                <div className='border-2 flex justify-center items-center px-2 py-1  mr-9 md:mr-0 border-amber-900'> 
                                    
                                    <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)}  className='outline-0 border-0 ml-1 'placeholder='search...'/>
                                    <BiSearch/>
                                    
                                </div>
                
                                <div className='flex gap-1 items-center justify-center  relative'> 
                                    <div className='flex gap-2 cursor-pointer items-center justify-center px-2 py-0.5 border-2 rounded-b-sm' onClick={()=> setFilter( prev => !prev)}>
                                    <BiFilterAlt/>
                                        <span>filter</span>
                                        
                
                                    </div>
                
                                    
                                    <div className='bg-blue-900 px-2 py-2 rounded-md  hover:bg-black transition-all duration-100 cursor-pointer' onClick={()=>(navigate("/produits"))}>
                                           
                                            <List size={20} color='white' />
                                            
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
                                    <SelectItem value="all">Toutes les catégories</SelectItem>

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
                
                                        <div className="overflow-x-hidden overflow-x-scroll h-[70vh]">
                <table className="w-full  mt-4 bg-white ">
                <thead>
                    <tr className=" bg-blue-900 border-1 w-full border-gray-400">
                    <th className="  text-white hidden md:table-cell text-center">N°</th>
                    <th className="  text-white  text-center">produit</th>
                    <th className="  text-white hidden md:table-cell text-center">Categorie</th>
                    <th className="   text-white hidden md:table-cell text-center">prix</th>
                    <th className="   text-white  text-center">quantite</th>
                    
                    <th className=" text-white text-center">Status</th>
                    <th className="   text-white hidden md:table-cell  text-center">Description</th>
                   
                    <th className="   text-white hidden md:table-cell text-center">Date Ajout</th>
                   
                    <th className="   text-white text-center">Action</th>

                    </tr>
                </thead>

                <tbody className=''>
                        {
                        voir_produit.map( (prod,id) => (
                        <tr className='  transition-all ease-in-out round-md border-1 border-gray-400 ' key={id}  >
                             <td className=" py-1  mb-3 hidden md:table-cell text-center">{prod.id}</td>
                                <td className=" py-3 mb-3 text-center flex gap-3 items-center justify-center">
                                <img src={`${BASEUrl}${prod.image}`} alt="" className='w-10 h-10 rounded-full' />
                                    <span> {prod.name}</span>
                                   
                                    
                                    </td>
                                <td className=" py-1  mb-3 hidden md:table-cell text-center">{prod.categorie}</td>
                               
                                <td className="py-1  mb-3 hidden md:table-cell text-center">{prod.prix}</td>
                                <td className="py-1  mb-3  text-center text-black">{prod.quantite}</td>
                                

                                <td className="py-1  mb-3  text-center">
                                <span className={`w-8 h-4 rounded-full inline-block ${statusColors[prod.status] || "bg-gray-300"}`}></span>

                                </td>

                                <td className=" py-1  mb-3 hidden md:table-cell text-center">{prod.description}</td>
                               
                                <td className="py-1  mb-3 hidden md:table-cell  text-center">{prod.date_ajout}</td>
                                 <td className="py-1  mb-3   items-center justify-end pr-4 flex gap-2">

                                   
                                        <MdOutlineShoppingCart size={22} className='cursor-pointer mr-5' onClick={()=> ajouterAuPanier(prod)} />
                                  <BiDotsVerticalRounded size={22} className='cursor-pointer' onClick={()=>(navigate(`/detailProduit/${prod.id}/`))}/>
                                 </td>
                               
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