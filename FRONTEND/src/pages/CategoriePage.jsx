// pages/CategoriePage.js
import { voir_categorie } from '@/api/apiCategorie'
import Categorie from '@/components/Categorie'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const CategoriePage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['categorie'],
    queryFn: voir_categorie,
  })

  const categories = data || []

  return (
    <main className="flex w-full">
      <Sidebar />
      <div className="flex-1 h-screen bg-[#F5F5F5] relative overflow-auto">
        <Navbar />
        <div className="w-full flex items-center justify-between mt-8 px-6 mb-2 py-2">
          <h3 className="text-3xl font-bold text-blue-900">Catégories</h3>
        </div>

        <div className="w-full px-6">
          {isLoading && <p>Chargement...</p>}
         

          <table className="w-[500px] bg-white shadow-md rounded">
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
