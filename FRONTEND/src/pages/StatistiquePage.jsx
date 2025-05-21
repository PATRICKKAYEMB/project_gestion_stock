import React from 'react'

import {motion} from "framer-motion"

import {BarChart2,ShoppingBag,Users,Zap} from 'lucide-react'
import StartCard from '../components/StartCard'
import CategorieChart from '../components/CategorieChart'
import SalersCharts from '../components/SalersCharts'
import Sidebar from '../components/Sidebar'

const StatistiquePage = () => {
  return (
    <div className='w-full flex '>

   <Sidebar/>
    <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8 flex-1'>
            <motion.div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8'
                initial={{opacity:0,y:20}}
                animate={{opacity:1,y:0}}
                transition={{duration:1}}
            >

               <StartCard name="Total sales" icon={Zap} value="$12,345" color="#6366f1" />
               <StartCard name="New users" icon={Users} value="$1,245" color="#885CF1" />
               <StartCard name="Total produits" icon={ShoppingBag} value="$345" color="#EC4899" />
               <StartCard name="Conversion rate" icon={BarChart2} value="$12,5%" color="#108981" />
            </motion.div>
           {/** -------charts------------- */}

          <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mb-8'>
              <CategorieChart/>
              <SalersCharts/>
               
          </div>


          </main>
    </div>
  )
}

export default StatistiquePage