import React from 'react'
import Header from '../components/Header'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import CategoriePage from '../pages/CategoriePage'


import ProduitsPage from '../pages/ProduitsPage'
import DetailsPage from '../pages/DetailsProduitPage'
import PanierPage from '../pages/PanierPage'
import LoginPage from '../pages/LoginPage'
import AchatPage from '../pages/AchatPage'
import PayementPage from '../pages/PayementPage'
import ProtectRoute from '../pages/protectRoute'
import EnregisterUserPage from '../pages/EnregisterUserPage'
import CategorieIdPage from '../pages/CategorieIdPage'
import Footer from '../components/Footer'


const Navigation = () => {
  return (
    <div className='bg-[#F1F1F1]'>
        <Header/>


        <Routes>
            <Route path='/' element={<HomePage/>}/>
           
            <Route path='/details/:id' element={<DetailsPage/>}/>
            <Route path="/produit" element={<ProduitsPage/>}/>
            <Route path ="/panier" element={<PanierPage/>} />
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/enregistrerUser' element={<EnregisterUserPage/>}/>
            <Route path='categorie/:id' element={<CategorieIdPage/>}/>
            <Route path='/achat' element={ <ProtectRoute> <AchatPage/> </ProtectRoute> }/>
            <Route path='/payement' element={ <ProtectRoute> <PayementPage/>   </ProtectRoute>  }/>
        </Routes>

        <Footer/>
       
    </div>
  )
}

export default Navigation