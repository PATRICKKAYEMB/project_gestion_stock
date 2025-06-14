import React from 'react'

import {useQuery} from "@tanstack/react-query"
import { countPerte } from '@/api/apiPerte'
const CountPerte = () => {

  const { data  } = useQuery({
    queryKey:["countPerte"] ,
    queryFn: countPerte 
  })

  const count_perte = data?? 0
  return (
    <div className='w-full bg-blue-900 shadow-md transition-all  rounded-md h-[110px] items-center justify-center flex flex-col '>

            <h3 className='text-white text-2xl mb-3'>{count_perte?.count}</h3>
            <p className='text-white text-lg'>Pertes</p>
    </div>
  )
}

export default CountPerte