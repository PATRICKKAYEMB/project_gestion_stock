import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Minus, Plus, Heart, Share2, ShoppingCart, Star } from 'lucide-react'
import { AppContext } from '../Context/AppContext'
import { useQuery } from '@tanstack/react-query'
import { detail_produit, recommandation_produit } from '../api/ProduitApi'
import { BASEIMAGEUrl } from '../api/api'
import Produit from '../components/Produit'

const DetailsPage = () => {
  const { ajouterPanier } = useContext(AppContext)
  const { id } = useParams()

  const { data: detailProduit, isLoading: loadingDetail } = useQuery({
    queryKey: ["detailProduit", id],
    queryFn: () => detail_produit(id)
  })

 const { data: recommandationProduit = [] } = useQuery({
  queryKey: ["recommandationProduit", id],

  queryFn: () => recommandation_produit(id),

})
const navigate = useNavigate() 

console.log("✅ Produits recommandés reçus :", recommandationProduit)



  if (loadingDetail || !detailProduit) {
    return <p className="text-center mt-10">Chargement du produit...</p>
  }

  return (
    <div className="pt-10 px-[5%]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-7 gap-x-12">
        <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
          <img src={`${BASEIMAGEUrl}${detailProduit.image}`} alt={detailProduit.name} className="w-full h-[70vh] object-cover" />
        </div>

        <div className="pt-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{detailProduit.name}</h1>

          <div className="flex items-center space-x-3 mb-4">
            <span className="text-3xl font-bold text-gray-900">{detailProduit.prix} FC</span>
          </div>

          <p className="text-gray-600 mb-6">{detailProduit.description}</p>

          <div className="flex space-x-4">
            <button
              onClick={() => ajouterPanier(detailProduit)}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Ajouter au panier</span>
            </button>
            <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Heart className="w-5 h-5" />
            </button>
            <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-14">
        <h3 className="text-3xl mb-6 font-semibold text-gray-800">Produits recommandés</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
               {recommandationProduit.map((produit) => (
                          <div className='p-4 flex flex-col items-center text-center' onClick={()=>navigate(`/details/${produit.id}/`)}>
                                <img
                                  src={`${BASEIMAGEUrl}/media/${produit.image}`}
                                  alt={produit.name}
                                  className='h-36 w-29 object-cover mb-3 rounded'
                                />
                                <h3 className='text-base  text-gray-800'>{produit.name}</h3>
                               
                                <span className='mt-2 text-indigo-600 font-bold'>{produit.prix} Fc</span>
                              </div>
                        ))}

        </div>
      </div>
    </div>
  )
}

export default DetailsPage
