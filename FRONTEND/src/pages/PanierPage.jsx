import React, { useContext, useState } from 'react'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { BASEUrl } from '@/api/api'
import { useMutation } from '@tanstack/react-query'
import { AppContext } from '@/context/AppContext'
import { venteProduit } from '@/api/apiVente'

const PanierPage = () => {
  const { panier, setPanier } = useContext(AppContext)
  const [client, setClient] = useState("")
  const [dateVente, setDateVente] = useState('')

  // Supprimer un produit du panier
  const supprimerProduit = (id) => {
    const nouveauPanier = panier.filter(p => p.id !== id)
    setPanier(nouveauPanier)
    toast.info("Produit retiré du panier")
  }

  // Gérer le changement de prix unitaire
  const handlePrixUnitaireChange = (e, produitId) => {
    const value = e.target.value
    console.log(`DEBUG: Changement de prix pour le produit ${produitId}. Nouvelle valeur: ${value}`)
    const nouveauPanier = panier.map(p =>
      p.id === produitId
        ? { ...p, prix_unitaire: value === "" ? null : Number(value) }
        : p
    )
    setPanier(nouveauPanier)
    console.log("DEBUG: Panier mis à jour. Panier actuel:", nouveauPanier)
  }

  // Augmenter la quantité
  const augmenterQuantite = (id) => {
    const nouveauPanier = panier.map(produit =>
      produit.id === id
        ? { ...produit, quantite: produit.quantite + 1 }
        : produit
    )
    setPanier(nouveauPanier)
  }

  // Diminuer la quantité
  const diminuerQuantite = (id) => {
    const nouveauPanier = panier.map(produit =>
      produit.id === id && produit.quantite > 1
        ? { ...produit, quantite: produit.quantite - 1 }
        : produit
    )
    setPanier(nouveauPanier)
  }

  // Calcul du total (si prix convenu → prendre ça, sinon prix initial)
  const total = panier.reduce(
    (acc, produit) =>
      acc + ((produit.prix_unitaire !== null && produit.prix_unitaire !== undefined && produit.prix_unitaire !== "")
        ? Number(produit.prix_unitaire)
        : Number(produit.prix)) * produit.quantite,
    0
  )

  // Mutation pour l'envoi de la vente
  const { mutate, isLoading } = useMutation({
    mutationFn: venteProduit,
    onSuccess: () => {
      toast.success("Vente réussie")
      setPanier([])
      setClient("")
      setDateVente("")
    },
    onError: (error) => {
      const errMsg = error?.response?.data?.message || "Erreur lors de la vente"
      toast.error(errMsg)
    }
  })

  // Gérer la vente
  const handleVente = () => {
    if (!client) {
      toast.error("Veuillez entrer le nom du client")
      return
    }

    if (!dateVente) {
      toast.error("Veuillez sélectionner une date de vente")
      return
    }

    // Transformer le format datetime-local en format Django
    const formattedDate = dateVente.replace("T", " ")

    // Préparer les produits
    const produitsPayload = panier.map(p => ({
      id: p.id,
      quantite: p.quantite,
      // Convertit l'entrée du prix convenu en Number ou en null si c'est vide
      prix_unitaire: (p.prix_unitaire === "" || p.prix_unitaire === null) ? null : Number(p.prix_unitaire)
    }))

    const payload = {
      client,
      date_vente: formattedDate,
      produits: produitsPayload
    }

    console.log("Payload envoyé :", payload) // Debug
    mutate(payload)
  }

  return (
    <div className='flex w-full'>
      <Sidebar />
      <main className='w-full flex-1 h-[100vh] bg-[#F1F1F1]'>
        <Navbar name={"Mon Panier"} />
        <h2 className="text-2xl font-bold text-center mt-10 text-gray-800">Produits dans le panier</h2>

        <div className='p-5 flex gap-2 w-full h-[75vh]'>
          {panier.length === 0 ? (
            <p className='text-center text-gray-600 mt-10'>Le panier est vide.</p>
          ) : (
            <div className='gap-4 flex-1'>
              {panier.map((produit) => (
                <div key={produit.id} className='bg-white shadow flex mb-2 items-center justify-between rounded px-3'>
                  {/* Infos produit */}
                  <div className='gap-2 flex items-center justify-center'>
                    <img src={`${BASEUrl}${produit.image}`} alt={produit.name} className='h-14' />
                    <div>
                      <h3 className='text-lg font-semibold'>{produit.name}</h3>
                      <p className='text-sm text-gray-600'>Prix initial : {produit.prix} FC</p>

                      {/* Prix convenu */}
                      <div className='flex items-center gap-2'>
                        <label className='text-sm text-gray-700'>Prix convenu :</label>
                        <input
                          type='number'
                          value={produit.prix_unitaire ?? ""}
                          onChange={(e) => handlePrixUnitaireChange(e, produit.id)}
                          className='border p-1 rounded text-sm w-24'
                        />
                      </div>
                    </div>
                  </div>

                  {/* Gestion quantité + suppression */}
                  <div className='flex gap-3'>
                    <div className='items-center gap-3 flex'>
                      <button onClick={() => diminuerQuantite(produit.id)} className='rounded text-xl font-bold'>−</button>
                      <div className='text-sm text-gray-600'>{produit.quantite}</div>
                      <button onClick={() => augmenterQuantite(produit.id)} className='rounded text-xl font-bold'>+</button>
                    </div>

                    <button onClick={() => supprimerProduit(produit.id)} className='flex items-center gap-1 text-red-600'>
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Formulaire vente */}
          {panier.length > 0 && (
            <div className='w-[400px] py-3 border-2 px-4 bg-white rounded-2xl'>
              <h3 className='text-center text-2xl mt-3'>Formulaire de vente</h3>

              <div className='mt-2'>
                <div className='mb-2'><h3>Nom du client :</h3></div>
                <input
                  type='text'
                  placeholder='Nom du client'
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  className='p-2 border rounded w-full mb-2'
                />
              </div>

              <div className='mt-2'>
                <div className='mb-2'><h3>Date de vente :</h3></div>
                <input
                  type='datetime-local'
                  value={dateVente}
                  onChange={(e) => setDateVente(e.target.value)}
                  className='p-2 border rounded w-full'
                />
              </div>

              <h3 className='text-2xl float-right font-bold my-3'>Total : {total} FC</h3>

              <button
                onClick={handleVente}
                disabled={isLoading}
                className='bg-orange-900 hover:bg-black duration-200 hover:cursor-pointer text-white px-6 py-2 text-xl mt-2 w-full rounded'
              >
                {isLoading ? "Traitement..." : "Vendre"}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default PanierPage
