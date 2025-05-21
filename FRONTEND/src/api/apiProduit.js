import { api } from "./api";

export async function countProduit(){
    try {
        const response = await api.get("countProduit")
        return response.data
        
    } catch (error) {
        console.error("voici l'erreur dans le count produit", error)
    }
}