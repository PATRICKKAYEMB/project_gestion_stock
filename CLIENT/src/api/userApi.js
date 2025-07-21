import { securedApi } from "./api"



export const creationCompte = async (data)=>{
    try {
        const response = await securedApi.post("creationClient/",data)
        return response.data
    } catch (error) {
        console.log("voici l'erreur dans creation compte client",error)
        
    }
}

export const connexion = async (data) =>{
    try {
        const response = await securedApi.post("token/",data)
        return response.data
   
    } catch (error) {
        console.log("voici l'erreur dans connexion",error)
        
    }
}