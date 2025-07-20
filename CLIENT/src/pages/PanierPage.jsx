import React, { useContext, useState } from 'react'
import { AppContext } from '../Context/AppContext'
import { BASEIMAGEUrl } from '../api/api'
import { ShoppingCartIcon } from 'lucide-react'



const PanierPage = () => {
  const { panier, setPanier } = useContext(AppContext)
  const [dateVente, setDateVente] = useState('')
  const [client, setClient] = useState('')

  function increase(produit) {
    const updatePanier = panier.map((p) => {
      if (p.id === produit.id) {
        return { ...p, quantite: p.quantite + 1 }
      }
      return p
    })
    setPanier(updatePanier)
  }

  function descrease(produit) {
    const nouveauPanier = panier.map((p) => {
      if (p.id === produit.id && p.quantite > 1) {
        return { ...p, quantite: p.quantite - 1 }
      }
      return p
    })
    setPanier(nouveauPanier)
  }

  function supprimer(produit) {
    const nouveauPanier = panier.filter((p) => p.id !== produit.id)
    setPanier(nouveauPanier)
  }

  const total = panier.reduce((acc, produit) => acc + produit.prix * produit.quantite, 0)

  return (
    <main className='w-full flex-1 h-[100vh] bg-[#F1F1F1]'>
    
      <h2 className="text-2xl font-bold text-center mt-10 text-gray-800">Produits dans le panier</h2>

      <div className='p-5 flex gap-2 w-full h-[75vh]'>
        {panier.length === 0 ? (
          <p className='text-center text-gray-600 mt-10'>Le panier est vide.</p>
        ) : (
          <div className='gap-4 flex-1'>
            {panier.map((produit) => (
              <div key={produit.id} className='bg-white shadow flex mb-2 items-center justify-between rounded px-3'>
                <div className='gap-2 flex items-center'>
                  <img src={`${BASEIMAGEUrl}${produit.image}`} alt={produit.name} className='h-14' />
                  <div>
                    <h3 className='text-lg font-semibold'>{produit.name}</h3>
                    <p className='text-sm text-gray-600'>Prix : {produit.prix} FC</p>
                  </div>
                </div>

                <div className='flex gap-3 items-center'>
                  <div className='flex items-center gap-3'>
                    <button
                      onClick={() => descrease(produit)}
                      className='rounded text-xl font-bold'
                    >−</button>
                    <div className='text-sm text-gray-600'>{produit.quantite}</div>
                    <button
                      onClick={() => increase(produit)}
                      className='rounded text-xl font-bold'
                    >+</button>
                  </div>

                  <button
                    onClick={() => supprimer(produit)}
                    className='flex items-center gap-1 text-red-600'
                  >
                   <ShoppingCartIcon/>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {panier.length > 0 && (
          <div className='w-[400px] py-3 border-2 px-4 bg-white rounded-2xl'>
            <h3 className='text-center text-2xl mt-5'>Formulaire de vente</h3>

            <div className='mt-8'>
              <div className='mb-2'>
                <h3>Nom du client :</h3>
              </div>
              <input
                type='text'
                placeholder='Nom du client'
                value={client}
                onChange={(e) => setClient(e.target.value)}
                className='p-2 border rounded w-full mb-4'
              />
            </div>

            <div>
              <div className='mb-2'>
                <h3>Date de vente :</h3>
              </div>
              <input
                type='datetime-local'
                value={dateVente}
                onChange={(e) => setDateVente(e.target.value)}
                className='p-2 border rounded w-full mb-4'
              />
            </div>

            <h3 className='text-2xl float-right font-bold mb-4'>Total : {total} FC</h3>
            <button
              className='bg-blue-600 text-white px-6 py-2 text-xl mt-10 w-full rounded'
              onClick={() => {
                // À compléter : action pour valider la vente
                alert(`Vente enregistrée pour ${client} le ${dateVente}`);
              }}
            >
              Valider la vente
            </button>
          </div>
        )}
      </div>
    </main>
  )
}

export default PanierPage
