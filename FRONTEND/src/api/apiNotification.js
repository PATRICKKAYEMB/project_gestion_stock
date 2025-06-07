import { api } from "./api";


export async function CountNotifications(){
    try {
        
        const response =await api.get("countNotification/")
        return response.data
    } catch (error) {
            console.log("voici l'erreur dans count notification",error)
            throw error
    }
}


export async function voir_notifications(){
    try {
        const response =await api.get("notification/")
        return response.data
        
    } catch (error) {

        console.log("voici l'erreur dans voir notification",error)
        throw error
        
    }
}