import { api } from "./api"




export const get_categorie= async ()=>{
    try {

        const response= await api.get("get_categorie/")
        return response.data
        
    } 
    catch (error) {
        console.log("voici l'erreur dans get categorie",error)
    
    }
}


export const detailCategorie = async (id)=>{
    try {
        
        const response = await api.get(`detail_categorie/${id}`)
        return response.data
    }
    catch (error) {
        console.log("voici l'erreur dans details categorie",error)
    }
}