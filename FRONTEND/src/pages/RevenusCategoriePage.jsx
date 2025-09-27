import { voir_categorie } from '@/api/apiCategorie'
import { revenusCategorie } from '@/api/apiRevenus'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import SideBarMobile from '@/components/SideBarMobile'
import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const RevenusCategoriePage = () => {
  const navigate = useNavigate()


    const [dateDebut, setDateDebut] = useState('')
    const [dateFin, setDateFin] = useState('')
    const [categorie,setCategorie]=useState(0)
    const [result, setResult] = useState(null)
  
    // Mutation pour lancer la recherche manuellement
    const { mutate, isLoading, error } = useMutation({
      mutationFn: revenusCategorie,
      onSuccess: (data) => {
        setResult(data)
      },
    })

    const {data}= useQuery({
      queryKey:['categorie'],
      queryFn:voir_categorie
    })

    const Categories = data || []
  
    // Fonction submit
    const handleSubmit = (e) => {
      e.preventDefault()
      if (dateDebut && dateFin) {
        mutate({ dateDebut, dateFin,categorie })
      }
    }
  return (
    <main className="flex w-full">
         <Sidebar />
         <div className="flex-1 h-screen bg-[#F1F1F1] relative overflow-auto">
           <Navbar />
           <SideBarMobile />
           <div className="w-full flex items-center justify-between mt-15 md:mt-8 px-6 mb-2 py-2">
             <h3 className="text-3xl font-bold text-blue-900">Revenus Total</h3>
           </div>
   
           <div className="flex gap-2">
             <button
               className="px-3 py-1 bg-amber-900 text-lg text-white cursor-pointer hover:bg-black hover:duration-100"
               onClick={() => navigate('/revenusProduit')}
             >
               Produit
             </button>
             <button
               className="px-3 py-1 bg-amber-900 text-lg text-white cursor-pointer hover:bg-black hover:duration-100"
               onClick={() => navigate('/revenusTotal')}
             >
               total
             </button>
           </div>
                  <div className='flex items-center justify-center flex-col'>

                        <form
             onSubmit={handleSubmit}
             className="flex flex-col gap-4  px-6 mt-6 w-[350px] py-8 bg-white rounded-2xl  items-end"
           >
             <div className='flex w-full gap-2 items-center justify-center'>
               <label className=" text-sm font-medium">Date début</label>
               <input
                 type="date"
                 value={dateDebut}
                 onChange={(e) => setDateDebut(e.target.value)}
                 className="border p-2 rounded flex-1"
               />
             </div>
             <div className='flex gap-2 w-full items-center justify-center'>
               <label className="block text-sm font-medium">Date fin</label>
               <input
                 type="date"
                 value={dateFin}
                 onChange={(e) => setDateFin(e.target.value)}
                 className="border p-2 flex-1 rounded"
               />
             </div>
                        <div className='flex gap-2 w-full items-center justify-center'>
              <label className="block text-sm font-medium">Catégorie</label>
              <select
                value={categorie}
                onChange={(e) => setCategorie(e.target.value)}
                className="border flex-1 p-2 rounded"
              >
                <option value={0}>-- Choisir une catégorie --</option>
                {Categories.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className='flex items-center justify-center w-full'>

                  <button
                  type="submit"
                  className="px-6 py-2 bg-blue-900 text-white  rounded hover:bg-black"
                >
                  Rechercher
                </button>

            </div>
            
           </form>
   
           {/* Résultats */}
           <div className="w-full flex items-center px-6 mt-6">
             {isLoading && <p>Chargement...</p>}
             {error && <p className="text-red-600">Erreur de chargement</p>}
             {result && (
               <p className="text-2xl font-semibold text-green-800">
                 Total: {result.revenusCategorie} FC
               </p>
             )}
           </div>

                  </div>
           {/* Formulaire de recherche */}
           
         </div>
       </main>
     )
  
}

export default RevenusCategoriePage