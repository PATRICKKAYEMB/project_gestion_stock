import { createContext, useState,  useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const ContextProvider = ({ children }) => {
  const navigate = useNavigate();

  // Step 1: Initialize the user state from localStorage
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      // Return the parsed user data or null if it doesn't exist
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse user data from localStorage", error);
      return null;
    }
  });

  const [panier, setPanier] = useState([]);

  // This function is for handling a successful login
  const HandleSucces = async (data) => {
    const { access, refresh } = data;
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);

    // Call HandleUser with the user data from the login response
    if (data.user) {
      HandleUser(data);
    }

    navigate("/dashbord");
  };

  // This function is for setting user data and storing it persistently
  const HandleUser = (data) => {
    const { name, role } = data.user;
    const userData = { name, role };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logOut = () => {
    // Step 2: Clear all stored items related to the session
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user"); // Clear the user data
    setUser(null);
    setPanier([]);
    navigate("/"); // Optionally navigate to the home or login page after logout
  };

  const ajouterAuPanier = (produit) => {
    const produitExistant = panier.find((p) => p.id === produit.id);
    if (produitExistant) {
      const nouveauPanier = panier.map((p) =>
        p.id === produit.id ? { ...p, quantite: p.quantite + 1 } : p
      );
      setPanier(nouveauPanier);
    } else {
      setPanier([...panier, { ...produit, quantite: 1 }]);
    }
  };

  return (
    <AppContext.Provider
      value={{
        HandleSucces,
        panier,
        logOut,
        HandleUser,
        user,
        ajouterAuPanier,
        setPanier,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};