import { createContext, useState } from "react";

export const AppContext = createContext();

export const ContextProvider = ({ children }) => {
  const [panier, setPanier] = useState([]);

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
    <AppContext.Provider value={{ ajouterPanier, panier, setPanier }}>
      {children}
    </AppContext.Provider>
  );
};
