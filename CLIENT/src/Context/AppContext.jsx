import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom"


export const AppContext = createContext();

export const ContextProvider = ({ children }) => {
  const [panier, setPanier] = useState([]);
  const [user,setUser] = useState(null)
  const navigate= useNavigate()

    function handleSuccess(data){
      const { access, refresh } = data.token 
            localStorage.setItem("access",access)
            localStorage.setItem("refresh",refresh)
            navigate("/achat")

            
    } 


    function handleUser(data){

       if (data?.user) {
      const { name, role } = data.user;
      setUser({ name, role });
    }
    }


  function ajouterPanier(produit) {
    const existProduit = panier.find((p) => p.id === produit.id);

    if (existProduit) {
      const nouveauPanier = panier.map((prod) =>
        prod.id === produit.id
          ? { ...prod, quantite: prod.quantite + 1 }
          : prod
      );
      setPanier(nouveauPanier);
    } else {
      setPanier([...panier, { ...produit, quantite: 1 }]);
    }
  }

  return (
    <AppContext.Provider value={{ ajouterPanier, panier, setPanier ,user,handleSuccess,handleUser}}>
      {children}
    </AppContext.Provider>
  );
};
