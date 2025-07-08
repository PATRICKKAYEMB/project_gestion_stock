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
import DetailProduit from '@/pages/DetailProduit'
import CategoriePage from '@/pages/CategoriePage'
import AjouterCategoriePage from '@/pages/AjouterCategoriePage'
import ModifierCategoriePage from '@/pages/ModifierCategoriePage'
import PanierPage from '@/pages/PanierPage'
import RecommandationPage from '@/pages/RecommandationPage'
import ProtectRouteAdmin from '@/auth/ProtectRouteAdmin'
import UnAuthorizedPage from '@/pages/UnAuthorizedPage'
import AdminRoute from '@/auth/AdminRoute' 


const RoutingPage = () => {
  return (
      <Routes>
        
       

              {/**        admin routes                         */}
         
                   <Route path='/approvisionner/:id' element={<AdminRoute> <ApprovisionnerPage/> </AdminRoute>}/>
                   <Route path='/ajouterPerte/:id' element={ <AdminRoute>  <AjouterPertePage/> </AdminRoute>  }/>
                   <Route path='/modifierProduit/:id' element={ <AdminRoute><ModifierProduitPage/> </AdminRoute> }/>
                   <Route path='/ajouterProduit' element={ <AdminRoute> <AjouterProduitPage/> </AdminRoute>  }/>
                   <Route path='/ajouterCategorie' element={<AdminRoute><AjouterCategoriePage/> </AdminRoute>  } />
                   <Route path='/modifierCategorie/:id' element={ <AdminRoute>  <ModifierCategoriePage/>   </AdminRoute>  } />
          

       
          {/**        protected routes                         */}
        
        <Route path='detailProduit/:id' element={<ProtectRoute><DetailProduit/></ProtectRoute>}/>
        <Route path='/produits' element={  <ProtectRoute>  <ProduitsPage/> </ProtectRoute>}/>
        <Route path='/vente/:id' element={  <ProtectRoute> <VentePage/> </ProtectRoute>}/>
        
        <Route path='/voirPerte' element={  <ProtectRoute> <VoirPertePage/> </ProtectRoute>}/>
        <Route path='/historiqueVente' element={ <ProtectRoute> <HistoriqueVentePage/> </ProtectRoute>}/>
        <Route path='/historiqueAchat' element={ <ProtectRoute> <HistoriqueAchatPage/></ProtectRoute>}/>
        <Route path='/notification' element={ <ProtectRoute> <NotificationPage/> </ProtectRoute>}/>
        <Route path='/statistique' element={ <ProtectRoute> <StatistiquePage/> </ProtectRoute>}/>

        <Route path='/ProduitGrid' element={ <ProtectRoute>  <ProduitGridPage/> </ProtectRoute>}/>
        <Route path='/dashbord' element={ <ProtectRoute> <DashbordPage/> </ProtectRoute>}/>
        <Route path='/' element={<Login/>}/>
        <Route path='/panier' element={<ProtectRoute><PanierPage/></ProtectRoute>}/>
        <Route path='/categorie' element={<ProtectRoute><CategoriePage/></ProtectRoute>} />
       
        <Route path='/recommandation' element={<ProtectRoute><RecommandationPage/></ProtectRoute>} />
        <Route path='/unauthorized' element={<ProtectRoute><UnAuthorizedPage/></ProtectRoute>} />
      </Routes>
  )
}

export default RoutingPage