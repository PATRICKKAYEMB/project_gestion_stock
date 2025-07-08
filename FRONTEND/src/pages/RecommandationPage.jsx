import { recommandation_produit, voir_produict } from '@/api/apiProduit'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'

const RecommandationPage = () => {
  const [selectProduit, setSelectProduit] = useState("")

  const { data: produits } = useQuery({
    queryKey: ["produits"],
    queryFn: voir_produict
  })

  const {
    data: recommandation,
    refetch: fetchRecommandation
  } = useQuery({
    queryKey: ["recommandation", selectProduit],
    queryFn: () => recommandation_produit(selectProduit),
    enabled: false, // Ne lance pas automatiquement
  })

  const recommandationProduits = recommandation?.recommendations || []
  const Produits = produits || []

  return (
    <main className='flex w-full h-screen'>
      <Sidebar />
      <div className='flex-1 p-4 bg-gray-100 overflow-y-auto'>
        <Navbar />
        <div>
          <h1 className='text-2xl font-bold text-center mb-4'>
            Recommandation des produits
          </h1>

          <div className="flex items-center gap-4 mb-4">
            <select
              onChange={(e) => setSelectProduit(e.target.value)}
              className='border p-2 rounded-lg shadow-lg'
              value={selectProduit}
            >
              <option value="">Choisir un produit</option>
              {Produits.map((produit) => (
                <option key={produit.id} value={produit.id}>
                  {produit.name}
                </option>
              ))}
            </select>

            <button
              onClick={() => {
                if (selectProduit) fetchRecommandation()
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded shadow"
            >
              Voir les recommandations
            </button>
          </div>

          <div className='grid grid-cols-3 gap-4'>
            {recommandationProduits.length === 0 ? (
              <p className="col-span-3 text-center text-gray-500">
                Aucune recommandation trouvée
              </p>
            ) : (
              recommandationProduits.map((produit) => (
                <div key={produit.id} className='border p-4 rounded-lg shadow-lg bg-white'>
                  <h2 className='text-xl font-semibold'>{produit.name}</h2>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default RecommandationPage
