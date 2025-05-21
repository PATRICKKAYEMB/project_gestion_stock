import { api } from "./api";



export async function countPerte(){
    try {
        const response = await api.get("countPerte/")
        return response.data
        
    } catch (error) {
        console.error("voici l'erreur dans le  count vente", error)
    }
}