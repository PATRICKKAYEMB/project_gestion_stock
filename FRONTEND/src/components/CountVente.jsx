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
    <div className='w-full bg-blue-900 shadow-md rounded-md h-[110px] items-center justify-center flex flex-col '>

            <h3 className='text-white text-2xl mb-3'>{count_vente?.count}</h3>
            <p className='text-white text-lg'>Ventes</p>
    </div>
  )
}

export default CountVente