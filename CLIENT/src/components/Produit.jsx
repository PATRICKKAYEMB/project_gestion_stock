import React from 'react'
import { BASEIMAGEUrl } from '../api/api'
import { useNavigate } from 'react-router-dom'

const Produit = ({ produit }) => {
  const navigate= useNavigate()
 
  return (
    <div className='p-4 flex flex-col items-center text-center' onClick={()=>navigate(`/details/${produit.id}/`)}>
      <img
        src={`${BASEIMAGEUrl}${produit.image}`}
        alt={produit.name}
        className='h-36 w-29 object-cover mb-3 rounded'
      />
      <h3 className='text-base  text-gray-800'>{produit.name}</h3>
     
      <span className='mt-2 text-indigo-600 font-bold'>{produit.prix} Fc</span>
    </div>
  )
}

export default Produit
