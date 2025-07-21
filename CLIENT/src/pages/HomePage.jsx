import React, { useRef } from 'react'
import image1 from "../assets/ordi dell.jpeg" // ✅ Sans espace dans le nom
import { Link } from 'react-router-dom'
import Categorie from '../components/Categorie'
import Produit from '../components/Produit'
import { useQuery } from "@tanstack/react-query"
import { get_categorie } from '../api/categorieApi'
import { get_produits } from '../api/ProduitApi'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const HomePage = () => {
  // 📦 Requête pour les catégories
  const { data: categories = [], isLoading: loadingCat, isError: errorCat } = useQuery({
    queryKey: ["categorie"],
    queryFn: get_categorie
  })

  // 📦 Requête pour les produits
  const { data: produits = [], isLoading: loadingProd, isError: errorProd } = useQuery({
    queryKey: ["produits"],
    queryFn: get_produits
  })

  // 🎯 Référence scrollable des catégories
  const scrollRef = useRef(null)

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' })
  }

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' })
  }

  return (
    <div>
      {/* 🎉 Hero Section */}
      <section className="bg-gradient-to-br from-orange-100 via-red-100 to-yellow-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-pink-600">
               
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Bienvenue dans notre boutique !
              </h1>

              <div className="flex items-center space-x-4">
                <Link
                  to="/boutique"
                  className="bg-white px-6 py-3 text-base rounded-lg text-gray-900 font-medium hover:shadow-md transition-all duration-300"
                >
                  Acheter maitenant
                </Link>
                <div className="flex items-center space-x-4">
                  <img
                    src="https://images.pexels.com/photos/1408221/pexels-photo-1408221.jpeg"
                    alt="Customer"
                    className="w-8 h-8 rounded-full"
                  />
                  <img
                    src="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg"
                    alt="Customer"
                    className="w-8 h-8 rounded-full -ml-2"
                  />
                  <img
                    src="https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg"
                    alt="Customer"
                    className="w-8 h-8 rounded-full -ml-2"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-2xl font-bold text-gray-900">Découvrez nos meilleures offres !</span>
              </div>
            </div>

            <div className="relative">
              <img
                src={image1}
                alt="Boîtier Samsung"
                className="w-full max-w-md mx-auto h-auto object-cover"
              />
              <div className="absolute top-4 right-4 w-20 h-20">
                <img
                  src="https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg"
                  alt="Smartwatch"
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 📦 Catégories */}
      <section className='w-full px-[7%] mt-10'>
        <h3 className='text-center font-medium text-indigo-900 text-3xl mb-3'>
          Catégories
        </h3>
        <p className='text-center mb-5'>Explorez nos différentes catégories de produits.</p>

        {/* Loading / error */}
        {loadingCat ? (
          <p className='text-center text-gray-500'>Chargement des catégories...</p>
        ) : errorCat ? (
          <p className='text-center text-red-500'>Erreur lors du chargement des catégories.</p>
        ) : (
          <div className="relative">
            {/* Flèche gauche */}
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white border rounded-full shadow p-2 z-10"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>

            {/* Liste des catégories */}
            <div
              ref={scrollRef}
              className="flex overflow-x-auto scrollbar-hide px-10"
              style={{ scrollBehavior: 'smooth' }}
            >
              {categories.map((categorie) => (
                <div key={categorie.id} className="flex-shrink-0 w-[150px]">
                  <Categorie name={categorie.name} image={categorie.image} id={categorie.id} />
                </div>
              ))}
            </div>

            {/* Flèche droite */}
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white border rounded-full shadow p-2 z-10"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        )}
      </section>

      {/* 🛒 Produits */}
      <section className='w-full px-[7%] mt-14'>
        <h3 className='text-center font-medium text-indigo-900 text-3xl mb-3'>Produits</h3>
        <p className='text-center mb-6'>Nos derniers produits en stock</p>

        {loadingProd ? (
          <p className='text-center text-gray-500'>Chargement des produits...</p>
        ) : errorProd ? (
          <p className='text-center text-red-500'>Erreur lors du chargement des produits.</p>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {produits.map((produit) => (
              <div
                key={produit.id}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Produit produit={produit} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default HomePage
