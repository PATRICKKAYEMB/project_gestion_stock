import React, { useContext, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { AppContext } from '../Context/AppContext';


const Header = () => {
    const [isMenuOpen,setIsMenuOpen]=useState(false)
        const navigate= useNavigate()
    function handleCartClick(){
      navigate("/panier")
    }
    const {panier}= useContext(AppContext)
    const toggleMenu = ()=> setIsMenuOpen(!isMenuOpen)

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">eT</span>
            </div>
            <span className="text-xl font-bold text-gray-900">eTrade</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-900 hover:text-blue-600 font-medium transition-colors">
              Home
            </Link>
            <Link to="/categorie" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              categorie
            </Link>
            <Link to="/produit" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              produits
            </Link>
            <Link to="/details" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              details
            </Link>
            <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Blog
            </Link>
            <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Contact
            </Link>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            
            <button 
              onClick={handleCartClick}
              className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              {
                panier.length > 0 ? <span className='absolute bg-red-700 text-white  p-1 text-[11px] rounded-full top-0 right-1'>{panier.length}</span>:""

              }
              
              <ShoppingCart className="w-8 h-8" />
             
            </button>
            
            <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <User className="w-5 h-5" />
            </button>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-2">
              <Link
                to="/"
                className="px-3 py-2 text-gray-900 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/categories"
                className="px-3 py-2 text-gray-600 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                to="/categories"
                className="px-3 py-2 text-gray-600 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Pages
              </Link>
              <Link
                to="/"
                className="px-3 py-2 text-gray-600 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/"
                className="px-3 py-2 text-gray-600 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                to="/"
                className="px-3 py-2 text-gray-600 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header