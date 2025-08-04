import { api } from "./api"





export const initierPaiement = async (payload) => {
    try{
        const response = await api.post("payement/",payload)
        return response.data
    }catch(error){
        console.error("Erreur dans l'initialisation du paiement :", error)
        throw error 

    }
}