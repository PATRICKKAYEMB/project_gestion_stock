import { data } from "react-router-dom"
import { api } from "./api"
import { collapseToast } from "react-toastify"



export async function voir_user() {
    try {
        const response = await api.get('users/')
        return response.data
        
    } catch (error) {
         console.error("voici l'erreur pour voir user", error)
    }
}

export const creationCompte = async (data)=>{
    try {
        const response = await api.post("creationClient/",data)
        return response.data
    } catch (error) {
        console.log("voici l'erreur dans creation compte client",error)
        
    }
}

export const supprimer_user = async(id)=>{
    try {
        const response = await api.delete(`users/${id}/`)
        return response.data
    } catch (error) {
        console.log("voici l'erreur dans suprimer user",error)
    }
}

export const modification_user = async (id,formData)=>{
    try {
        const response = await api.put(`users/${id}/`,formData)
        return response.data
    } catch (error) {
        console.log("voici l' erreur dans  modification user",error)
    }
}