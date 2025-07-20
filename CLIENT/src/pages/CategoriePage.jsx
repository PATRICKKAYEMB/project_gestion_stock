import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom'
import { get_produits } from '../api/ProduitApi'

const CategoriePage = () => {

  const {id}=useParams()

  const {data:produits}=useQuery({
    queryKey:["produits",id],
    queryFn:()=> get_produits(null,id)
  })
  console.log("voici le produit",produits)
  return (
    <div>
      {
        produits.map((prod)=>{
            <p>{prod.name}</p>
        })
      }
    </div>
  )
}

export default CategoriePage