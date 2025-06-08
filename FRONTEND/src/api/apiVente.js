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

export async function venteProduit({ formData ,id}){
        try {
            const response = await api.post(`venteProduit/${id}/`,formData)
                return response.data
            
        } catch (error) {
            console.error("voici l'erreur dans vente produit",error)
        }
}
