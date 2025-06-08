import React from 'react'

import {useQuery} from "@tanstack/react-query"
import { countProduit } from '@/api/apiProduit'
const CountProduits = () => {

    const {data} = useQuery({
      queryKey:["countProduit"],
      queryFn:countProduit
    })

    const count_produit = data?? 0;

 
  return (

    <div className='w-full bg-blue-900 shadow-md rounded-md h-[110px] items-center justify-center flex flex-col '>

        <h3 className='text-white text-2xl mb-3'>{count_produit?.count}</h3>
        <p className='text-white text-lg'>Produits</p>
    </div>
  )
}

export default CountProduits