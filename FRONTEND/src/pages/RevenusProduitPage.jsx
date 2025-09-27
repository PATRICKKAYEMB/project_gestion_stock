import React, { useState } from 'react'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import SideBarMobile from '@/components/SideBarMobile'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { revenusProduit } from '@/api/apiRevenus'
import { voir_produict } from '@/api/apiProduit'
import { BASEUrl } from '@/api/api'


const RevenusProduitPage = () => {
  const navigate = useNavigate()

  const [dateDebut, setDateDebut] = useState('')
  const [dateFin, setDateFin] = useState('')
  const [produit, setProduit] = useState(0)
  const [result, setResult] = useState(null)
  const [search, setSearch] = useState('')

  // Mutation pour lancer la recherche
  const { mutate, isLoading, error } = useMutation({
    mutationFn: revenusProduit,
    onSuccess: (data) => {
      setResult(data)
    },
  })

  // Récupération des produits avec recherche
  const { data: Produits = [] } = useQuery({
    queryKey: ['produits', search],
    queryFn: () => voir_produict({ name:search }),
  })

  // Fonction submit
  const handleSubmit = (e) => {
    e.preventDefault()
    if (dateDebut && dateFin && produit) {
      mutate({ dateDebut, dateFin, produit })
    }
  }

  return (
    <main className="flex w-full h-[100vh]">
      <Sidebar />
      <div className="flex-1  bg-[#F1F1F1] relative ">
        <Navbar />
        <SideBarMobile />

        {/* Titre */}
        <div className="w-full flex items-center justify-between mt-15 md:mt-8 px-6 mb-2 py-2">
          <h3 className="text-3xl font-bold text-blue-900">
            Revenus Total par Produit
          </h3>
        </div>

        {/* Navigation boutons */}
        <div className="flex gap-2 px-6">
          <button
            className="px-3 py-1 bg-amber-900 text-lg text-white cursor-pointer hover:bg-black hover:duration-100"
            onClick={() => navigate('/revenusTotal')}
          >
            Total
          </button>
          <button
            className="px-3 py-1 bg-amber-900 text-lg text-white cursor-pointer hover:bg-black hover:duration-100"
            onClick={() => navigate('/revenusCategorie')}
          >
            Catégorie
          </button>
        </div>

        {/* Section principale */}
        <div className="flex w-full  gap-1 h-[300px] items-start mt-4 px-6">
          
          {/* Liste des produits */}
          <div className="w-[500px]   border p-4 rounded bg-white">
           
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tapez pour rechercher..."
              className="border p-2 rounded w-full mb-4"
            />

            <div className='h-[270px] overflow-y-scroll '>

           
                    <table className="w-full border-collapse border p-2 rounded">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Produit</th>
                          <th className="p-2 text-center">Choisir</th>
                        </tr>
                      </thead>

                      <tbody>
                        {Produits.map((item) => (
                          <tr key={item.id} className="border-b hover:bg-gray-100">
                            <td className="p-2 flex items-center gap-3">
                              <img
                                src={`${BASEUrl}${item.image}`}
                              
                                className="w-10 h-10 rounded-full object-cover"
                              />
                              {item.name}
                            </td>
                            <td className="p-2 text-center">
                              <input
                                type="radio"
                                name="produit"
                                value={item.id}
                                checked={produit === item.id}
                                onChange={() => setProduit(item.id)}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

             </div>
          </div>

          {/* Formulaire dates */}
          <div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 border p-4 w-[400px] rounded bg-white"
          >
            <div>
              <label className="block text-sm font-medium">Date début</label>
              <input
                type="date"
                value={dateDebut}
                onChange={(e) => setDateDebut(e.target.value)}
                className="border p-2 rounded w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Date fin</label>
              <input
                type="date"
                value={dateFin}
                onChange={(e) => setDateFin(e.target.value)}
                className="border p-2 rounded w-full"
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-black"
            >
              Rechercher
            </button>
          </form>
          
          
           <div className="w-full flex items-center px-6 mt-6">
          {isLoading && <p>Chargement...</p>}
          {error && <p className="text-red-600">Erreur de chargement</p>}
          {result && (
            <p className="text-2xl font-semibold text-green-800">
              Total: {result.revenusProduit} FC
            </p>
          )}
        </div>


          
          </div>
          
        </div>

        {/* Résultats */}
       
      </div>
    </main>
  )
}

export default RevenusProduitPage
