import { api } from "./api";

export async function countProduit(){
    try {
        const response = await api.get("countProduit")
        return response.data
        
    } catch (error) {
        console.error("voici l'erreur dans le count produit", error)
    }
}


export async function voir_produict({categorie,sort}={}){
    try {
        const params ={}
       
        if (categorie) params.categorie =categorie
        if (sort) params.sort = sort

        const response =await api.get("produit/", {params})
        return response.data 
        
    } catch (error) {
        console.error("voici l'erreur dans voir produit")

    }
}

export async function Detail_produit(id){
    try {
        const response =await api.get(`produit/${id}/`)
        return response.data
        
    } catch (error) {
        console.error("voici l'erreur dans le detail ",error)
    }
}


export async function Ajouter_produit(formData){
    try {
        const response = await api.post("produit/",formData)
        return response.data
        
    } catch (error) {
        console.error("voici l'erreur dans le ajouter produit ",error)
        
    }
}

export async function modifier_produit({formData,id}){
    try {
        const response = await api.put(`produit/${id}/`,formData)
        return response.data
        
    } catch (error) {
        console.error("voici l'erreur dans  modifier produit ",error)
        throw error
        
    }
}

export async function supprimer_produit(id){
    try {
        const response = await api.delete(`produit/${id}/`)
        return response.data
        
    } catch (error) {
        console.error("voici l'erreur dans supprimer produit ",error)
        throw error
        
    }
}
