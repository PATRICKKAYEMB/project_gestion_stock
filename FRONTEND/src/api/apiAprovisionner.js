import { api } from "./api";



export async function voir_achat({ categorie, date_debut, date_fin, sort } = {}) {
    const params = {};
    
    if (categorie) params.categorie = categorie;
    if (sort) params.sort = sort;
  
    if (date_debut && date_fin) {
      params.date_debut = date_debut;
      params.date_fin = date_fin;
    }
  
    const response = await api.get("historiqueAchat/", { params });
    return response.data;
  }
  

