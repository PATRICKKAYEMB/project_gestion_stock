import React from 'react'
import Navbar from './Navbar'
import { BiAbacus, BiCategory, BiFilter, BiFilterAlt, BiSearch } from 'react-icons/bi'
import { LiaStackExchange, LiaStarHalf } from 'react-icons/lia'
import { TbCategory } from 'react-icons/tb'
import Produits from './Produits'
import GridView from './GridView'

const Main = () => {
  return (
    <div className='flex-1'>
        <Navbar/>

        <div className='px-4'>
        
            

            <div className='flex items-center justify-between mt-5 '>
                <div className='border-2 flex justify-center items-center px-2 py-1 border-amber-900'> 
                    <BiSearch/>
                    <input type="text"  className='outline-0 border-0 ml-1'/>
                    
                </div>

                <div className='flex gap-1 items-center justify-center '> 
                    <div className='flex items-center justify-center px-2 py-0.5 border-2 rounded-b-sm'>
                        
                        <span>filter</span>
                        <BiFilterAlt/>

                    </div>

                   
                    <div className='bg-amber-900 px-2 py-2 rounded-md'>
                           <BiCategory size={20} color='white' />
                    </div>

                    <div className='bg-amber-900 px-2 py-2 rounded-md'>
                           <TbCategory size={20} />
                    </div>
                    
                    
                </div>

            </div>


           <div >

                <Produits/>
           </div>

        </div>
        
    </div>
  )
}

export default Main