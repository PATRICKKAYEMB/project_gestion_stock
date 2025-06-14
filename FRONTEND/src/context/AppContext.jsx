import Produits from "@/components/Produits";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";



export const AppContext = createContext()



export const ContextProvider =({children})=>{
    const navigate= useNavigate()

const [user,setUser]=useState(null)
const [panier, setPanier] = useState([])


   const HandleSucces = async (data)=>{

            const {access,refresh}= data

            localStorage.setItem("access",access),
            localStorage.setItem("refresh",refresh)
            navigate("/dashbord")
        

           

   }

   const logOut = ()=>{
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
 
    setUser(null)
    setPanier([])
   }

   const HandleUser= (data)=>{
       const {name,role} = data.user
       setUser({name,role})
   }

  const ajouterAuPanier = (produit) => {
     const produitExistant = panier.find(p => p.id === produit.id)
  if (produitExistant) {
    const nouveauPanier = panier.map(p =>
      p.id === produit.id ? { ...p, quantite: p.quantite + 1 } : p
    )
    setPanier(nouveauPanier)
  } else {
    setPanier([...panier, { ...produit, quantite: 1 }]) // ← ici
  }
  }
    return (
        <AppContext.Provider value={{HandleSucces,panier,logOut,HandleUser,user,ajouterAuPanier,setPanier,}}>
            {children}
        </AppContext.Provider>
    )
}

