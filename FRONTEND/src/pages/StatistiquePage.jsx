import React, { useState } from 'react'


import { BiFilterAlt } from 'react-icons/bi'

import {BarChart2,ShoppingBag,Users,Zap} from 'lucide-react'
import StartCard from '../components/StartCard'
import CategorieChart from '../components/CategorieChart'
import SalersCharts from '../components/SalersCharts'
import Sidebar from '../components/Sidebar'
import { useQuery } from '@tanstack/react-query';
import { categorieVente, ventesMensuelles } from '@/api/apiCategorie';
import { motion } from 'framer-motion';
import SideBarMobile from '@/components/SideBarMobile'
import Navbar from '@/components/Navbar'


const StatistiquePage = () => {

    const [dateDebut, setDate_debut] = useState("");
    const [dateFin, setDate_fin] = useState("");
     const [filter, setFilter] = useState(false);
     

  const {data:salesdata=[] }=useQuery({
    queryKey:["ventesMensuelles",dateDebut,dateFin],
    queryFn:()=> ventesMensuelles(dateDebut, dateFin)
  })
 
   

  const {data:categorieVentes=[]}=useQuery({
    queryKey:["categorieVente",dateDebut,dateFin],
    queryFn:()=>categorieVente(dateDebut,dateFin)
  })
  return (
    <div className='w-full flex '>

   <Sidebar/>
   

    <main className=' flex-1'>
      <Navbar/>
      <SideBarMobile/>
      <div className='max-w-7xl mx-auto mt-12 md:mt-0 py-6 px-4 lg:px-8 '>

     
       <div className="flex items-center justify-end mt-1 mb-3 relative">
                  
      
                  <div
                    onClick={() => setFilter((prev) => !prev)}
                    className="flex  cursor-pointer items-center border-gray-400 bg-[#F1F1F1] gap-3 justify-center px-3 py-1 mr-3 border-1 rounded-b-sm"
                  >
                    <BiFilterAlt />
                    <span>Filtrer</span>
                  </div>
      
                  {filter && (
                    <div className="absolute right-0 w-[200px] top-8 z-10 bg-orange-900 px-2 py-5 rounded-md">
                      <div className="mb-4">
                        
                      
                          <div className='flex gap-2 items-center mt-3 rounded-md w-full justify-center'>
                                <label htmlFor="" className='text-white'>Du:</label>
                                <input
                                type="date"
                                onChange={(e) => setDate_debut(e.target.value)}
                               
                                className="  border-1 border-white px-2 py-1 text-white"/>

                          </div>

                          <div className='flex gap-2 items-center mt-3 rounded-2xl w-full justify-center'>
                                <label htmlFor="" className='text-white'>Au:</label>
                                <input
                                type="date"
                                onChange={(e) => setDate_fin(e.target.value)}
                               
                                className="  border-1 border-white text-white px-2 py-1"/>

                          </div>

                         
                        
                         
                        
                      </div>
                       
      
                     
                    </div>
                  )}
                </div>



            <motion.div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-4'
                initial={{opacity:0,y:20}}
                animate={{opacity:1,y:0}}
                transition={{duration:1}}
            >

               <StartCard name="Total vente" icon={Zap} value="12 345 fc" color="#6366f1" />
               <StartCard name="categories" icon={Users} value="45" color="#885CF1" />
               <StartCard name="produits" icon={ShoppingBag} value="45" color="#EC4899" />
              
            </motion.div>
           {/** -------charts------------- */}

          <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mb-9 h-[50vh]  '>
              <CategorieChart categorieVentes={categorieVentes}/>
              <SalersCharts salesdata={salesdata}/>
               
          </div>

      </div>
          </main>
    </div>
  )
}

export default StatistiquePage