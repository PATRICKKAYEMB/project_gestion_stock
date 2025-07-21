import { api } from "./api"



export const creationCompte = async ({data})=>{
    try {
        const response = await api.post("creerCompteClient/",data)
        return response.data
    } catch (error) {
        console.log("voici l'erreur dans creation compte client",error)
        
    }
}

export const connexion = async ({data}) =>{
    try {
        const response = await api.post("connexion/",data)
        return response.data
   
    } catch (error) {
        console.log("voici l'erreur dans connexion",error)
        
    }
}