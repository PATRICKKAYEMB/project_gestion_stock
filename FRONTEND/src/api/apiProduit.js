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

