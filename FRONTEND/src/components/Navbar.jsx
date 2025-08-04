import { CountNotifications } from '@/api/apiNotification'
import { AppContext } from '@/context/AppContext'
import { useQuery } from '@tanstack/react-query'
import { BellIcon } from 'lucide-react'
import React, { useContext} from 'react'
import { BiBasket, BiUser } from 'react-icons/bi'
import { FaCartArrowDown } from 'react-icons/fa'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { BiMenu, BiTransfer } from 'react-icons/bi';
import { TbBasket } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'


const Navbar = ({name}) => {

  const {panier,toggleMobile,SetToggleMobile}= useContext(AppContext)

  const {data} = useQuery({
      queryKey:["notifications"],
      queryFn:CountNotifications
  })

  const countProduits= panier.length
const navigation = useNavigate()
  const notifications= data??0
  return (
    <div className='md:flex-1 w-full shadow-md shadow-gray-300  md:ml-2 fixed md:relative flex z-20 justify-between bg-white px-5 py-1 h-[60px]  items-center ' >
      <BiMenu size={60} color='white ' className='top-[10px] lg:hidden md:hidden block right-[20px] cursor-pointer' onClick={()=>SetToggleMobile(!toggleMobile)} />
        <h3 className='text-black text-2xl font-bold'>{name}</h3> 
        
        
        <div className='flex items-center justify-center gap-3'>

           <div className='relative cursor-pointer ' onClick={()=>navigation("/panier")}>
             
             
              <MdOutlineShoppingCart size={35} color='black' />
             
             {
                countProduits > 0 ? <p className='absolute -top-1 right-0 px-1 text-[10px] text-black rounded-full py-0.5 bg-red-600'>{countProduits}</p>:""
             }
              
          </div>
          
          <div className='relative cursor-pointer ' onClick={()=>navigation("/notification")}>
              <BellIcon size={35} color='black' />

              <p className='absolute -top-1 right-0 px-1 text-[10px] text-black rounded-full py-0.5 bg-red-600'>{notifications?.count}</p>
          </div>
            <BiUser size={35} color='black'/>
           
        </div>
        
    </div>
  )
}

export default Navbar