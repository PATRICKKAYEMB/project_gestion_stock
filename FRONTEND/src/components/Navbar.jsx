import { CountNotifications } from '@/api/apiNotification'
import { AppContext } from '@/context/AppContext'
import { useQuery } from '@tanstack/react-query'
import { BellIcon } from 'lucide-react'
import React, { useContext } from 'react'
import { BiBasket, BiUser } from 'react-icons/bi'
import { FaCartArrowDown } from 'react-icons/fa'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { TbBasket } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'


const Navbar = ({name}) => {

  const {panier}= useContext(AppContext)

  const {data} = useQuery({
      queryKey:["notifications"],
      queryFn:CountNotifications
  })

  const countProduits= panier.length
const navigation = useNavigate()
  const notifications= data??0
  return (
    <div className='flex-1 flex justify-between bg-blue-900 px-5 py-1 h-[60px] ml-1 items-center ' >
        <h3 className='text-white text-2xl font-bold'>{name}</h3> 
        
        <div className='flex items-center justify-center gap-3'>

           <div className='relative cursor-pointer ' onClick={()=>navigation("/panier")}>
             
             
              <MdOutlineShoppingCart size={35} color='white' />
             
             {
                countProduits > 0 ? <p className='absolute -top-1 right-0 px-1 text-[10px] text-white rounded-full py-0.5 bg-red-600'>{countProduits}</p>:""
             }
              
          </div>
          
          <div className='relative cursor-pointer ' onClick={()=>navigation("/notification")}>
              <BellIcon size={35} color='white' />

              <p className='absolute -top-1 right-0 px-1 text-[10px] text-white rounded-full py-0.5 bg-red-600'>{notifications?.count}</p>
          </div>
            <BiUser size={35} color='white'/>
           
        </div>
        
    </div>
  )
}

export default Navbar