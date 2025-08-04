// pages/CategoriePage.js
import { voir_categorie } from '@/api/apiCategorie'
import Categorie from '@/components/Categorie'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import SideBarMobile from '@/components/SideBarMobile'
import useAuth from '@/hooks/useAuth'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const CategoriePage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['categorie'],
    queryFn: voir_categorie,
  })
 
   const navigate =useNavigate()

  function verificationAjout(){
    
        navigate("/ajouterCategorie")
    
  }
  
  const categories = data || []

 

  return (
    <main className="flex w-full">
      <Sidebar />
      
      <div className="flex-1 h-screen bg-[#F1F1F1] relative overflow-auto">
        <Navbar />
        <SideBarMobile/>
        <div className="w-full flex items-center justify-between mt-15 md:mt-8  px-6 mb-2 py-2">
          <h3 className="text-3xl font-bold text-blue-900">Catégories</h3>
        </div>
                       <span className='cursor-pointer text-center  text-white hover:bg-black hover:duration-75 px-4 py-2 bg-orange-900 ml-[260px]  mb-9' onClick={verificationAjout}>ajouter</span>
        <div className="w-full  flex items-center px-6">
          {isLoading && <p>Chargement...</p>}
         
                                            
          <table className=" max-w-96 mt-4  bg-white shadow-md rounded">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-center">N:</th>
                <th className="px-4 py-2 text-center">Nom</th>
                <th className="px-4 py-2 text-center">action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((item) => (
                <Categorie key={item.id} id={item.id} name={item.name} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}

export default CategoriePage
