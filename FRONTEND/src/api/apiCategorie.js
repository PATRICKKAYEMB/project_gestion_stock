import { api } from"./api";


export async function voir_categorie(){
    try {
        const response = await api.get("categorie/")
        return response.data
        
    } catch (error) {
        console.error("voici l'erreur pour voir categorie", error)
    }
}
export async function ajouter_categorie(formData){
    try {
        const response = await api.post("categorie/",formData)
         return response.data
    } catch (error) {
        console.log("voici l'erreur dans ajouter categorie",error)
        throw error
    }
}

export async function modifier_categorie({formData,id}){
    
    try {
        const response =await api.put(`categorie/${id}/`,formData)
        return response.data
        
    } catch (error) {
        console.log("voici l'erreur dans moditication categorie",error)
        throw error
        
    }
}

export async function supprimer_categorie(id){
    try {
        const  response = await api.delete(`categorie/${id}/`)
        return response.data
    } catch (error) {
        console.log("voici l'erreur dans supprimer categorie",error)
        throw error
    }
}

export async function detailCategorie(id) {
    try {
        const response = await api.get(`categorie/${id}/`)
        return response.data

    } catch (error) {
        console.log("voici l'erreur dans detail categorie",error)
        throw error
    }
}


export async function categorieVente(dateDebut,dateFin) {
  try {
    const response = await api.get("categorieVente/",{
        params: {dateDebut, dateFin}
    })  
    return response.data
  } catch (error) {
    console.error("Erreur lors du chargement des catégories", error)
    throw error
  }
}


export async function ventesMensuelles(dateDebut, dateFin) {
  const response = await api.get("ventesMensuelles/", {
    params: { dateDebut, dateFin }
  });
  return response.data;
}
