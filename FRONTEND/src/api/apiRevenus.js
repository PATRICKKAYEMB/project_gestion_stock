import  {api} from "./api";




export const revenusTotal = async ({dateDebut,dateFin}={})=>{

    try {
        const params={}
         
        if (dateDebut && dateFin){
            params.dateDebut=dateDebut
            params.dateFin=dateFin
        }

        const response = await api.get('revenusTotal/',{params})
        return response.data
    } catch (error) {
       print("voici l'erreur dans revenus total",error) 
    }
}


export const revenusCategorie = async ({dateDebut,dateFin,categorie}={})=>{
    try {

        const params ={}

        if(dateDebut && dateFin && categorie){
            params.dateDebut=dateDebut
            params.dateFin=dateFin
            params.categorie=categorie
        }
        const response = await api.get('revenusCategorie/',{params})
            return response.data
    } catch (error) {
        print("voici l'erreur dans revenus par categorie",error)
    }
}

export const revenusProduit = async ({dateDebut,dateFin,produit}={})=>{
    try {
        const params={}
        if (dateDebut,dateFin,produit ) {
           params.dateDebut= dateDebut
           params.dateFin=dateFin
           params.produit= produit 
        }
        const response = await api.get('revenusProduit/',{params})
        return response.data
    } catch (error) {
        print("voici l'erreur dans revenus par produit",error)
    }
}