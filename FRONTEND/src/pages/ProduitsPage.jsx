import React from 'react'
import Sidebar from '../components/Sidebar'
import Main from '../components/Main'
import Produits from '../components/Produits'
import Navbar from '../components/Navbar'
import { BiAbacus, BiCategory, BiFilter, BiFilterAlt, BiSearch } from 'react-icons/bi'
import { LiaStackExchange, LiaStarHalf } from 'react-icons/lia'
import { TbCategory } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'


const ProduitsPage = () => {

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
                
                                <div className='flex gap-1 items-center justify-center '> 
                                    <div className='flex gap-2 items-center justify-center px-2 py-0.5 border-2 rounded-b-sm'>
                                    <BiFilterAlt/>
                                        <span>filter</span>
                                        
                
                                    </div>
                
                                    
                                    <div className='bg-blue-900 px-2 py-2 rounded-md  hover:bg-black transition-all duration-100 cursor-pointer' >
                                            <BiCategory size={20} color='white' />
                                    </div>
                
                                    <div className='bg-blue-900 px-2 py-2 rounded-md  hover:bg-black transition-all duration-100 cursor-pointer' >
                                            <TbCategory size={20} color='white' />
                                    </div>
                                    
                                    
                                </div>
                
                            </div>
                
                
                            <div >
                
                                <Produits/>
                            </div>
                
                        </div>

                    </div>
                
            </div>
         </div>
  )
}

export default ProduitsPage