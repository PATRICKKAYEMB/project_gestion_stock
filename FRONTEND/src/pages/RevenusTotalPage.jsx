import { revenusTotal } from '@/api/apiRevenus'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import SideBarMobile from '@/components/SideBarMobile'
import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const RevenusTotalPage = () => {
  const navigate = useNavigate()

  const [dateDebut, setDateDebut] = useState('')
  const [dateFin, setDateFin] = useState('')
  const [result, setResult] = useState(null)

  // Mutation pour lancer la recherche manuellement
  const { mutate, isLoading, error } = useMutation({
    mutationFn: revenusTotal,
    onSuccess: (data) => {
      setResult(data)
    },
  })

  // Fonction submit
  const handleSubmit = (e) => {
    e.preventDefault()
    if (dateDebut && dateFin) {
      mutate({ dateDebut, dateFin })
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
            onClick={() => navigate('/revenusCategorie')}
          >
            Catégorie
          </button>
        </div>

        {/* Formulaire de recherche */}
        <form
          onSubmit={handleSubmit}
          className="flex gap-4 px-6 mt-6 items-end"
        >
          <div>
            <label className="block text-sm font-medium">Date début</label>
            <input
              type="date"
              value={dateDebut}
              onChange={(e) => setDateDebut(e.target.value)}
              className="border p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Date fin</label>
            <input
              type="date"
              value={dateFin}
              onChange={(e) => setDateFin(e.target.value)}
              className="border p-2 rounded"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-black"
          >
            Rechercher
          </button>
        </form>

        {/* Résultats */}
        <div className="w-full flex items-center px-6 mt-6">
          {isLoading && <p>Chargement...</p>}
          {error && <p className="text-red-600">Erreur de chargement</p>}
          {result && (
            <p className="text-2xl font-semibold text-green-800">
              Total: {result.revenusTotal} FC
            </p>
          )}
        </div>
      </div>
    </main>
  )
}

export default RevenusTotalPage
