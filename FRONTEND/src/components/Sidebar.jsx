import React, { useState } from 'react'
import { BellIcon, LogOut, LogOutIcon, LucideLogOut, MenuIcon } from 'lucide-react'
import { FaBeer } from 'react-icons/fa'


import { NavLink} from 'react-router-dom';
import {ChefHat, Eye, DollarSign, Wallet, PlusCircle, FileText, ArrowDownCircleIcon, ArrowBigDown, ArrowDown, ArrowLeft, ArrowRightIcon, LayoutDashboard } from 'lucide-react';
import { FaDirections } from 'react-icons/fa';
import { BiMenu } from 'react-icons/bi';


const Sidebar = ({toggle,setToggle}) => {
    const [openMenu, setOpenMenu] = useState(null);
  
  
    const handleToggle = (menu) => {
      setOpenMenu(openMenu === menu ? null : menu);
    };
  
    const handleLinkClick = () => {
      setToggle(false); 
    };
  
 
  
    
  return (
    <div className={`fixed relative  bg-blue-900 h-screen shadow transition-all duration-300 ease-in-out w-64 overflow-hidden`}>
     
     <BiMenu size={60} color='white ' className='absolute top-[15px] left-[20px]'/>
     
      {/* attention ici plus de hidden md:block pour mobile */}
      <ul className="mt-[120px] space-y-4  ">
        
        {/* RECETTE */}
        <li>
          <li className=' mt-4 mb-2 flex hover:bg-blue-950 text-left items-center px-4 py-1 text-white font-bold hover:text-white '>
            <LayoutDashboard className='mr-3'/>
            <NavLink to="/dashbord" onClick={handleToggle} className=" text-left">DashBord</NavLink>
          </li>


          <li className=' mt-4 mb-2 flex hover:bg-blue-950 text-left items-center px-4 py-1 text-white font-bold hover:text-white'>
            <LayoutDashboard className='mr-3'/>
            <NavLink to="/produits" onClick={handleToggle} className=" text-left">produits</NavLink>
          </li>

          <button onClick={() => handleToggle('transaction')} className="flex relative text-white font-bold hover:text-white items-center w-full px-4 py-1 text-left hover:bg-blue-950">
            <ChefHat className="mr-3" /> Transactions {openMenu==="transaction"?<ArrowDown className='absolute right-[20px]' />:<ArrowRightIcon className='absolute right-[20px]' />}
          </button>
          <div className={`flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${openMenu === 'transaction' ? "max-h-40" : "max-h-0"}`}>
            <NavLink to="/historiqueVente" onClick={handleLinkClick} className="md:pl-[70px] py-2 hover:bg-blue-950 text-white hover:text-white">Historique Vente</NavLink>
            <NavLink to="/historiqueAchat" onClick={handleLinkClick} className=" md:pl-[70px] py-2 hover:bg-blue-950 text-white hover:text-white">Historique Achat</NavLink>
            
          </div>



          <li className=' mt-4  mb-4 flex hover:bg-blue-950 text-left items-center px-4 py-1 text-white font-bold hover:text-white'>
          <LayoutDashboard className='mr-3'/>
            <NavLink to="/statistique" onClick={handleToggle} className=" text-left">Statistique</NavLink>
          </li>


          <li className=' mt-4 mb-2 flex hover:bg-blue-950 text-left items-center px-4 py-1 text-white font-bold hover:text-white'>
            
            <BellIcon className='mr-3'/>
            <NavLink to="/notification" onClick={handleToggle} className=" text-left">Notification</NavLink>
          </li>
          
          <button onClick={() => handleToggle('perte')} className="flex relative py-1 text-white font-bold hover:text-white items-center w-full px-4 py-2 text-left hover:bg-blue-950">
            <ChefHat className="mr-3" /> Perte {openMenu==="perte"?<ArrowDown className='absolute right-[20px]' />:<ArrowRightIcon color='white' className='absolute right-[20px]' />}
          </button>
          <div className={`flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${openMenu === 'perte' ? "max-h-40" : "max-h-0"}`}>
            <NavLink to="/voirPerte" onClick={handleLinkClick} className="md:pl-[70px] py-2 hover:bg-blue-950 text-white hover:text-white">Perte</NavLink>
            <NavLink to="/ajouterPerte" onClick={handleLinkClick} className=" md:pl-[70px] py-2 hover:bg-blue-950 text-white hover:text-white">Ajouter Perte</NavLink>
           
          </div>



         
        </li>

        {/* DEPENSE */}
       

        {/* LOGOUT */}
        <li className='absolute bottom-[20px] '>
          <button className="flex items-center w-full font-bold px-4 py-2 text-left  hover:bg-blue-950 hover:text-white text-white">
            <LogOut className="mr-3  hover:bg-blue-950 hover:text-white text-white" /> Se deconnecter
          </button>
        </li>

      </ul>
    </div>
  )
}

export default Sidebar