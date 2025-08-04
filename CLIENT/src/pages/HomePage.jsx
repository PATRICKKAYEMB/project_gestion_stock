import React, { useRef } from 'react'
import image1 from "../assets/hp chargeur.jpg"
import { Link, useNavigate } from 'react-router-dom'
import Categorie from '../components/Categorie'
import Produit from '../components/Produit'
import { useQuery } from "@tanstack/react-query"
import { get_categorie } from '../api/categorieApi'
import { get_produits } from '../api/ProduitApi'
import { ArrowBigRight, ChevronLeft, ChevronRight } from 'lucide-react'

const HomePage = () => {
  //  Requête pour les catégories
  const { data: categories = [], isLoading: loadingCat, isError: errorCat } = useQuery({
    queryKey: ["categorie"],
    queryFn: get_categorie
  })

  //  Requête pour les produits
  const { data: produits = [], isLoading: loadingProd, isError: errorProd } = useQuery({
    queryKey: ["produits"],
    queryFn: get_produits
  })

  const navigate =useNavigate()

  const Produits =produits.slice(0,8)
 
  const scrollRef = useRef(null)

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' })
  }

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' })
  }

  return (
    <div>
     
      <section className="bg-gradient-to-br bg-white py-10">
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
                  to="/produit"
                  className="bg-orange-900 px-6 py-3 text-base rounded-lg hover:bg-black  text-white font-medium hover:shadow-md transition-all duration-300"
                >
                  Acheter maitenant
                </Link>
              
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-2xl font-bold text-gray-900">Découvrez nos meilleures offres !</span>
              </div>
            </div>

            <div className="relative">
              <img
                src={image1}
                alt="Boîtier Samsung"
                className="w-full max-w-md mx-auto h-[350px] object-cover"
              />
            
            </div>
          </div>
        </div>
      </section>

     
      <section className='w-full px-[7%]  bg-orange-900 pt-4 pb-7 ' >
        <h3 className='text-center font-medium text-white text-3xl mb-3'>
          Catégories
        </h3>
        <p className='text-center text-white mb-5'>Explorez nos différentes catégories de produits.</p>

      
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

     
      <section className='w-full px-[7%] bg-[#F1F1F1] pt-2 relative pb-8'>
        <h3 className='text-center font-medium mt-6 text-indigo-900 text-3xl mb-3'>Produits</h3>
        <p className='text-center mb-8 '>Nos derniers produits recents</p>
        <span className='float-right absolute top-[95px] right-[100px] px-2 py-1 bg-orange-900 hover:bg-black :duration-2  flex text-white cursor-pointer' onClick={()=>navigate("/produit")}>voir Tout <ArrowBigRight className='ml-2'/></span>

        {loadingProd ? (
          <p className='text-center text-gray-500'>Chargement des produits...</p>
        ) : errorProd ? (
          <p className='text-center text-red-500'>Erreur lors du chargement des produits.</p>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {Produits.map((produit) => (
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
