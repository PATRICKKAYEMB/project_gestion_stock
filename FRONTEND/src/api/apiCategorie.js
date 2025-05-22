import { api } from"./api";


export async function voir_categorie(){
    try {
        const response = await api.get("categorie/")
        return response.data
        
    } catch (error) {
        console.error("voici l'erreur pour voir categorie", error)
    }
}