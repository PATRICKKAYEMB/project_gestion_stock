import { api } from "./api";


export async function countVente(){
        try {
            const response = await api.get("countVente/")
            return response.data 
        } catch (error) {
            console.error("voici l'erreur",error)
            
        }
}

export const  voir_vente= async ({date_debut,date_fin,sort,categorie} ={}) =>{
    const params = {}
    if ( categorie) params.categorie= categorie
    if (date_debut && date_fin){
        params.date_debut =date_debut
        params.date_fin =date_fin
    }
    if (sort) params.sort = sort

    const response = await api.get("historiqueVente/",{params})
    return response.data
} 

export async function venteProduit(payload) {
  try {
    const response = await api.post("venteProduit/", payload)
    return response.data
  } catch (error) {
    console.error("Erreur dans venteProduit :", error)
    throw error
  }
}

export async function download_story_ventes({date_debut,date_fin,categorie}){
   
  try {
     const params={}
     if (categorie && categorie !== "all"){
          params.categorie = categorie;
     }
     if (date_debut && date_fin){
      params.date_debut=date_debut;
      params.date_fin= date_fin
     }
     const response = await api.get("download_story_ventes/",
      {params,
        responseType: 'blob'

     })
     return response.data

    
  } catch (error) {
        console.error("Erreur téléchargement CSV :", error);
        throw error
    
  }
}

