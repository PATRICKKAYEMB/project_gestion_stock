import { api } from "./api"





export async function  connexion(data) {
    try {
        const reponse = await api.post("token/",data)
        return reponse.data 
    } catch (error) {
        console.error("voici l'erreur ",error)
    }
}


