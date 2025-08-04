import React, { useState } from 'react'
import { BellIcon, Boxes, LogOut, LogOutIcon, LucideLogOut, MenuIcon } from 'lucide-react'
import { FaBeer, FaBoxOpen, FaChartBar, FaDesktop, FaMoneyBillWave, FaShoppingBasket, FaShoppingCart } from 'react-icons/fa'
import { MdDashboard, MdOutlineMoney, MdOutlineShoppingCart, MdReportProblem } from 'react-icons/md';

import { useNavigate } from 'react-router-dom'; 
import { NavLink, Navigate} from 'react-router-dom';
import {ChefHat, Eye, DollarSign, Wallet, PlusCircle, FileText, ArrowDownCircleIcon, ArrowBigDown, ArrowDown, ArrowLeft, ArrowRightIcon, LayoutDashboard } from 'lucide-react';
import { FaDirections } from 'react-icons/fa';
import { BiMenu, BiTransfer } from 'react-icons/bi';
import { logout } from '@/auth/authService';
import { TbDashboard, TbDashboardFilled } from 'react-icons/tb';


const Sidebar = ({toggle,setToggle}) => {
    const [openMenu, setOpenMenu] = useState(null);
  
  
    const handleToggle = (menu) => {
      setOpenMenu(openMenu === menu ? null : menu);
    };
  
    const handleLinkClick = () => {
      setToggle(false); 
    };
  
 const [toggles,setToggles]= useState(false)
  
 const navigation = useNavigate();
  return (
    <div className={`fixed  relative hidden md:block lg:block shadow-md shadow-gray-400  bg-white h-screen  transition-all duration-300 ease-in-out ${toggles?"w-20":"w-64"}  overflow-hidden`}>
     
     <BiMenu size={60} color='black ' className='absolute top-[10px] right-[20px] cursor-pointer' onClick={()=>setToggles(!toggles)}/>
     
      {/* attention ici plus de hidden md:block pour mobile */}
      <ul className="mt-[120px] space-y-4  ">
        
        {/* RECETTE */}
        <li>
        
          <li >
             <NavLink to="/dashbord" onClick={handleToggle} className="   mt-4  mb-4 flex hover:bg-orange-900 hover:text-white text-left items-center px-4 py-1 text-black font-bold ">   <FaDesktop className='mr-3' size={22}/>
              {
                 !toggles &&  <span className='text-left'> Dashbord</span>
              }
              </NavLink>
          </li>

           <li >
             <NavLink to="/categorie" onClick={handleToggle} className="   mt-4  mb-4 flex hover:bg-orange-900 hover:text-white text-left items-center px-4 py-1 text-black font-bold "> <Boxes className='mr-3' size={22}/> 
              {
                 !toggles &&  <span className='text-left'> Categorie</span>
              }
              </NavLink>
          </li>

          <li >
             <NavLink to="/produits" onClick={handleToggle} className="   mt-4  mb-4 flex hover:bg-orange-900 hover:text-white text-left items-center px-4 py-1 text-black font-bold ">           <FaBoxOpen className='mr-3' size={22}/> 
              {
                 !toggles &&  <span className='text-left'> Produits</span>
              }
              </NavLink>
          </li>


        
              
                    <button onClick={() => handleToggle('transaction')} className="flex relative text-black font-bold  items-center w-full px-4 py-1 text-left hover:bg-orange-900 hover:text-white">
                    
                     <BiTransfer className='mr-3' size={22} color='black'/>
                      
                      {  !toggles &&    <span>Transactions</span> } {openMenu==="transaction"? !toggles&& <ArrowDown className='absolute right-[20px]' color='black' />: !toggles &&  <ArrowRightIcon className='absolute right-[20px]' />}   
                    </button>
         
          <div className={`flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${openMenu === 'transaction' ? "max-h-40" : "max-h-0"}`}>
            <NavLink to="/historiqueVente" onClick={handleLinkClick} className="md:pl-[70px] py-2 hover:bg-orange-900 hover:text-white text-black flex items-center  gap-2 ">  <MdOutlineShoppingCart/>  Historique Vente</NavLink>
          
            
          </div>



        {/***   <li >
             <NavLink to="/statistique" onClick={handleToggle} className="   mt-4  mb-4 flex hover:bg-orange-600 hover:text-white text-left items-center px-4 py-1 text-black font-bold"> <FaChartBar className='mr-3' size={22}/>
              {
                 !toggles &&  <span className='text-left'> Statistique</span>
              }
              </NavLink>
          </li>
        */}

        

         
{/**

          <li >
         

          
         <NavLink to="/voirPerte" onClick={handleToggle} className="   mt-4  mb-4 flex text-left items-center px-4 py-1 text-black font-bold hover:bg-orange-600 hover:text-whi">  <MdReportProblem className="mr-3" size={22}/>
          {
             !toggles &&  <span className='text-left'> Perte</span>
          }
          </NavLink>
      
        
          </li>
   */}
             



         
        </li>

        {/* DEPENSE */}
       

        {/* LOGOUT */}
        <li className='absolute bottom-[20px] '>
          <button className="flex items-center w-full font-bold px-4 py-2 text-left  hover:bg-orange-900 hover:text-white text-black" onClick={()=>logout(navigation)}>
            <LogOut className="mr-3  hover:bg-orange-900 hover:text-whi text-black" />{
                  !toggles && <span> Se deconnecter</span>
            } 
          </button>
        </li>

      </ul>
    </div>
  )
}

export default Sidebar