import React, { useContext, useState,useEffect } from 'react'
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
import { AppContext } from '@/context/AppContext';

const SideBarMobile = () => {




    const{toggleMobile,setToggleMobile}= useContext(AppContext)
     const [openMenu, setOpenMenu] = useState(null);
  
  
    const handleToggle = (menu) => {
      setOpenMenu(openMenu === menu ? null : menu);
    };
  
    const handleLinkClick = () => {
      setToggleMobile(false); 
    };

    useEffect(() => {
  if (toggleMobile) {
    document.body.style.overflow = 'hidden'; 
  } else {
    document.body.style.overflow = '';
  }

 
  return () => {
    document.body.style.overflow = '';
  };
}, [toggleMobile]);
  

  
 const navigation = useNavigate();
  return (
    
     <div className={` absolute md:hidden lg:hidden bg-blue-900 h-screen shadow  w-60 z-10 transition-all duration-300 ease-in-out ${toggleMobile?"-left-60 sm:block ":"left-0 sm:block "}  overflow-hidden`}>
         
      
         
          {/* attention ici plus de hidden md:block pour mobile */}
          <ul className="mt-[80px] space-y-4  ">
            
            {/* RECETTE */}
            <li>
            
              <li >
                 <NavLink to="/dashbord" onClick={handleToggle} className="   mt-4  mb-4 flex hover:bg-blue-950 text-left items-center px-4 py-1 text-white font-bold hover:text-white">   <FaDesktop className='mr-3' size={22}/>
                  {
                     !toggleMobile &&  <span className='text-left'> Dashbord</span>
                  }
                  </NavLink>
              </li>
    
               <li >
                 <NavLink to="/categorie" onClick={handleToggle} className="   mt-4  mb-4 flex hover:bg-blue-950 text-left items-center px-4 py-1 text-white font-bold hover:text-white"> <Boxes className='mr-3' size={22}/> 
                  {
                     !toggleMobile &&  <span className='text-left'> Categorie</span>
                  }
                  </NavLink>
              </li>
    
              <li >
                 <NavLink to="/produits" onClick={handleToggle} className="   mt-4  mb-4 flex hover:bg-blue-950 text-left items-center px-4 py-1 text-white font-bold hover:text-white">           <FaBoxOpen className='mr-3' size={22}/> 
                  {
                     !toggleMobile&&  <span className='text-left'> Produits</span>
                  }
                  </NavLink>
              </li>
    
    
            
                  
                        <button onClick={() => handleToggle('transaction')} className="flex relative text-white font-bold hover:text-white items-center w-full px-4 py-1 text-left hover:bg-blue-950">
                        
                         <BiTransfer className='mr-3' size={22}/>
                          
                          {  !toggleMobile &&    <span>Transactions</span> } {openMenu==="transaction"? !toggleMobile&& <ArrowDown className='absolute right-[20px]' />: !toggleMobile &&  <ArrowRightIcon className='absolute right-[20px]' />}   
                        </button>
             
              <div className={`flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${openMenu === 'transaction' ? "max-h-40" : "max-h-0"}`}>
                <NavLink to="/historiqueVente" onClick={handleLinkClick} className=" pl-[30px] md:pl-[70px] py-1 md:py-2 hover:bg-blue-950 text-white flex items-center  gap-2 hover:text-white">  <MdOutlineShoppingCart/>  Historique Vente</NavLink>
                <NavLink to="/historiqueAchat" onClick={handleLinkClick} className=" pl-[30px] md:pl-[70px] py-1 md:py-2 hover:bg-blue-950 text-white hover:text-white gap-2 flex items-center "> <MdOutlineMoney/>  Historique Achat</NavLink>
                
              </div>
    
    
    
              <li >
                 <NavLink to="/statistique" onClick={handleToggle} className="   mt-4  mb-4 flex hover:bg-blue-950 text-left items-center px-4 py-1 text-white font-bold hover:text-white"> <FaChartBar className='mr-3' size={22}/>
                  {
                     !toggleMobile &&  <span className='text-left'> Statistique</span>
                  }
                  </NavLink>
              </li>
    
    
              <li >
             
    
              
             <NavLink to="/voirPerte" onClick={handleToggle} className="   mt-4  mb-4 flex hover:bg-blue-950 text-left items-center px-4 py-1 text-white font-bold hover:text-white">  <MdReportProblem className="mr-3" size={22}/>
              {
                 !toggleMobile &&  <span className='text-left'> Perte</span>
              }
              </NavLink>
          
            
          </li>
                 
    
    
    
             
            </li>
    
            {/* DEPENSE */}
           
    
            {/* LOGOUT */}
            <li className='absolute md:bottom-[20px]  bottom-[8px]'>
              <button className="flex items-center w-full font-bold px-4 py-2 text-left  hover:bg-blue-950 hover:text-white text-white" onClick={()=>logout(navigation)}>
                <LogOut className="mr-3  hover:bg-blue-950 hover:text-white text-white" />{
                      !toggleMobile && <span> Se deconnecter</span>
                } 
              </button>
            </li>
    
          </ul>
        </div>
  )
}

export default SideBarMobile