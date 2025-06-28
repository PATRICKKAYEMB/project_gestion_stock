import React from 'react'
import { useState } from 'react'

const go = () => {
const [use,setUse] = useState(false)
const [click,setClick] = useState(false)
  return (
    <div onClick={()=>use} className='w-full grid lg:grid-cols-4 scro md:grid-cols-3 mt-10 gap-4 overflow-y-scroll overflow-hidden h-[70vh]'
    >go</div>
  )
}

export default go