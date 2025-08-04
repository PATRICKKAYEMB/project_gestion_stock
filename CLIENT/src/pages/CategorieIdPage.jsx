import { Search } from 'lucide-react'
import React, { useState } from 'react'
import Produit from '../components/Produit'
import { useQuery } from '@tanstack/react-query'
import { get_produits } from '../api/ProduitApi'

import { useParams } from 'react-router-dom'

const CategorieIdPage = () => {
const {id} = useParams()
      const [recherche, setRecherche] = useState('')
    
    const categorie= id
      const { data: produits } = useQuery({
        queryKey: ["produits", recherche, categorie],
        queryFn: () => get_produits(recherche,categorie)
      })

        const DataProduits = produits || []
  return (
    <main>
         <section className='flex-1 p-8'>
        <div className='flex items-center gap-3 mb-6 w-full max-w-md mx-auto'>
          <input
            type="text"
            placeholder='Rechercher un produit...'
            onChange={(e) => setRecherche(e.target.value)}
            className='flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400'
          />
          <Search size={24} className='text-gray-600' />
        </div>

        <h2 className='text-2xl text-center font-bold text-gray-800 mb-6'>Liste des Produits</h2>


<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
  {Array.isArray(DataProduits) && DataProduits.length > 0 ? (
    DataProduits.map((produit) => (
      <div
        key={produit.id}
        className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
      >
        <Produit produit={produit} />
      </div>
    ))
  ) : produits === undefined ? (
    <p className="text-center text-gray-500 col-span-full">Chargement des produits...</p>
  ) : (
    <p className="text-center text-gray-500 col-span-full">Aucun produit trouvé.</p>
  )}
</div>


      </section>
    </main>
  )
}

export default CategorieIdPage