import { Search } from 'lucide-react'
import React, { useState } from 'react'
import Produit from '../components/Produit'
import { useQuery } from '@tanstack/react-query'
import { get_produits } from '../api/ProduitApi'
import { get_categorie } from '../api/categorieApi'


const ProduitsPage = () => {
  const [recherche, setRecherche] = useState('')
  const [categorie, setCategorie] = useState("")

  const { data: produits } = useQuery({
    queryKey: ["produits", recherche, categorie],
    queryFn: () => get_produits(recherche, categorie === "all" ? "" : categorie)
  })

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: get_categorie
  })
  

  const DataCategorie = categories || []
  const DataProduits = produits || []

  function addCategorie(cat) {
    setCategorie(cat.id)
  }

  return (
    <main className='flex min-h-screen bg-[#F1F1F1]
'>
      {/* left side */}
      <aside className='w-[220px] bg-white border-r border-gray-200 p-5'>
        <h3 className='text-lg font-semibold text-indigo-600 mb-4'>Catégories</h3>
        <ul className='space-y-3'>
          <li
            className={`cursor-pointer p-2 rounded hover:bg-indigo-50 text-sm font-medium ${
              categorie === "all" || !categorie ? 'text-indigo-600 font-semibold' : 'text-gray-700'
            }`}
            onClick={() => setCategorie("all")}
          >
            Tout
          </li>
          {DataCategorie.map((cat) => (
            <li
              key={cat.id}
              className={`cursor-pointer p-2 rounded hover:bg-indigo-50 text-sm font-medium ${
                categorie === cat.id ? 'text-indigo-600 font-semibold' : 'text-gray-700'
              }`}
              onClick={() => addCategorie(cat)}
            >
              {cat.name}
            </li>
          ))}
        </ul>
      </aside>

      {/* right side */}

      {}
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
          {DataProduits.map((produit) => (
            <div
              key={produit.id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <Produit produit={produit} />
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default ProduitsPage
