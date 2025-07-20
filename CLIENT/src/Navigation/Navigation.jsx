import React from 'react'
import Header from '../components/Header'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import CategoriePage from '../pages/CategoriePage'
import CategorieIdPage from '../pages/CategorieIdPage'

import ProduitsPage from '../pages/ProduitsPage'
import DetailsPage from '../pages/DetailsProduitPage'
import PanierPage from '../pages/PanierPage'

const Navigation = () => {
  return (
    <div>
        <Header/>


        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/categorie/:id' element={<CategoriePage/>}/>
            <Route path='/details/:id' element={<DetailsPage/>}/>
            <Route path="/produit" element={<ProduitsPage/>}/>
            <Route path ="/panier" element={<PanierPage/>} />
        </Routes>
    </div>
  )
}

export default Navigation