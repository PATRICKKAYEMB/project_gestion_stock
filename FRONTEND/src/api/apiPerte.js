import { api } from "./api";



export async function countPerte(){
    try {
        const response = await api.get("countPerte/")
        return response.data
        
    } catch (error) {
        console.error("voici l'erreur dans le  count vente", error)
    }
}


export async function voir_perte({ categorie, date_debut, date_fin, sort } = {}) {
    const params = {};
    
    if (categorie) params.categorie = categorie;
    if (sort) params.sort = sort;
  
    if (date_debut && date_fin) {
      params.date_debut = date_debut;
      params.date_fin = date_fin;
    }
  
    const response = await api.get("historiquePerte/", { params });
    return response.data;
  }