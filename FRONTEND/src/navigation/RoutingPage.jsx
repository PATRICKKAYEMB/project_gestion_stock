import React from 'react'
import {Routes,Route} from "react-router-dom"
import ProduitsPage from '../pages/ProduitsPage'
import VentePage from '../pages/VentePage'
import ApprovisionnerPage from '../pages/ApprovisionnerPage'
import AjouterPertePage from '../pages/AjouterPertePage'
import VoirPertePage from '../pages/VoirPertePage'
import HistoriqueVentePage from '../pages/HistoriqueVentePage'
import NotificationPage from '../pages/NotificationPage'
import StatistiquePage from '../pages/StatistiquePage'
import ModifierProduitPage from '../pages/ModifierProduitPage'
import AjouterProduitPage from '../pages/AjouterProduitPage'
import HistoriqueAchatPage from '../pages/HistoriqueAchatPage'
import DashbordPage from '../pages/DashbordPage'
import ProduitGridPage from '../pages/ProduitGridPage'
import ProtectRoute from '@/auth/ProtectRoute'
import Login from '@/auth/Login'


const RoutingPage = () => {
  return (
      <Routes>
        <Route path='/produits' element={  <ProtectRoute>  <ProduitsPage/> </ProtectRoute>}/>
        <Route path='/vente' element={  <ProtectRoute> <VentePage/> </ProtectRoute>}/>
        <Route path='/approvisionner' element={<ProtectRoute> <ApprovisionnerPage/> </ProtectRoute> }/> 
        <Route path='/ajouterPerte' element={ <ProtectRoute> <AjouterPertePage/>  </ProtectRoute>} />
        <Route path='/voirPerte' element={  <ProtectRoute> <VoirPertePage/> </ProtectRoute>}/>
        <Route path='/historiqueVente' element={ <ProtectRoute> <HistoriqueVentePage/> </ProtectRoute>}/>
        <Route path='/historiqueAchat' element={ <ProtectRoute> <HistoriqueAchatPage/></ProtectRoute>}/>
        <Route path='/notification' element={ <ProtectRoute> <NotificationPage/> </ProtectRoute>}/>
        <Route path='/statistique' element={ <ProtectRoute> <StatistiquePage/> </ProtectRoute>}/>
        <Route path='/modificationProduit' element={ <ProtectRoute> <ModifierProduitPage/> </ProtectRoute>}/>
        <Route path='/ajouterProduit' element={ <ProtectRoute>  <AjouterProduitPage/> </ProtectRoute>}/>
        <Route path='/ProduitGrid' element={ <ProtectRoute>  <ProduitGridPage/> </ProtectRoute>}/>
        <Route path='/dashbord' element={ <ProtectRoute> <DashbordPage/> </ProtectRoute>}/>
        <Route path='/' element={<Login/>}/>
      </Routes>
  )
}

export default RoutingPage