import React from 'react'
import { BASEIMAGEUrl } from '../api/api'
import { useNavigate } from 'react-router-dom'


const Categorie = ({name,image,id}) => {
const navigate= useNavigate(0)
  return (
    <>
        <div key={id} className='hover:cursor-pointer flex items-center cursor-pointer justify-center flex-col' onClick={()=>navigate(`categorie/${id}`)}>
            <img src={`${BASEIMAGEUrl}${image}`} alt="" className='rounded-full h-[130px] w-[130px] border-2 border-amber-500' />
            <h3 className='text-gl text-center text-base text-white'>{name}</h3>
        </div>
    </>
  )
}

export default Categorie