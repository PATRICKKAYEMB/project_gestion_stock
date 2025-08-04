import { api } from "./api"




export const get_produits =async (recherche,categorie)=>{

    try {
        const params={}

        if (recherche){
            params.recherche= recherche
            
        }
        if(categorie){
            params.categorie = categorie
        }
        
        const response = await api.get("get_produit/",{params})

        return response.data
        
    } catch (error) {
        console.log("voici l'erreur dans get produits ",error)
    }
}

export const detail_produit = async (id) =>{
    try {
        const response = await api.get(`get_produit/${id}/`)
        return response.data
    } 
    
    catch (error) {
        console.log("voici l'erreur dans detail produit",error)
        
    }
}

export const recommandation_produit = async (id) => {
  try {
    const response = await api.get(`get_product_recommandations/${id}/`);
    console.log("voici la recommandation =",response.data.recommendations)
    return response.data.recommendations
    
;
  } catch (error) {
    console.error("Erreur dans recommandation_produit:", error);
    return []; 
  }
};


export const get_Categorie =async (recherche,idCat)=>{

    try {
        const params={}

        if (recherche){
            params.recherche= recherche
            
        }
        if(idCat){
            params.categorie = idCat
        }
        
        const response = await api.get("get_produit/",{params})

        return response.data
        
    } catch (error) {
        console.log("voici l'erreur dans get produits ",error)
    }
}
