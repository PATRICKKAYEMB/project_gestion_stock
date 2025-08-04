import React from 'react'

import {useQuery} from "@tanstack/react-query"
import { countVente } from '@/api/apiVente'


const CountVente = () => {

  const {data,isLoading }=useQuery({

    queryKey:["countVente"],
    queryFn: countVente
  })

  const count_vente = data?? 0
  return (
    <div className='w-full bg-white shadow-md shadow-gray-400  rounded-md h-[110px] items-center justify-center flex flex-col '>

            <h3 className='text-black text-2xl mb-3'>{count_vente?.count}</h3>
            <p className='text-black text-lg'>Ventes</p>
    </div>
  )
}

export default CountVente