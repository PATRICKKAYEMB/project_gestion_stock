import React from 'react'
import image from "../assets/ecouteur.jpg"
import { useNavigate } from 'react-router-dom'
import { BASEUrl } from '@/api/api'
const GridView = ({ name,categorie,prix,quantite,date_ajout,date_expiration,id,image,status}) => {

    const navigate =useNavigate()

    const statusColors = {
        red: "bg-red-500",
        green: "bg-green-500",
        yellow: "bg-yellow-500",
        blue: "bg-blue-500",
        gray: "bg-gray-500",
       
    };
  return (
            
    
        <>
        <div onClick={()=>(navigate(`/detailProduit/${id}/`))}>

       
            <div className='h-[350px] p-2 bg-blue-950 rounded-sm'  >
                <img src={`${BASEUrl}${image}`} className='w-full h-[160px] bg-amber-600 rounded-md' />
               
                <h3 className='text-lg text-white  mt-3'>{name}</h3>
               
                <div className='flex items-center justify-between '>
                    <h3 className='text-gray-300 '>Prix:</h3>
                    <h3 className='text-white font-semibold'>{prix} </h3>
                </div>
                <div className='flex items-center justify-between '>
                    <h3 className='text-gray-300 '>Stock:</h3>
                    <h3 className='text-white font-semibold'>{quantite} </h3>
                </div>

                <div className='flex items-center justify-between '>
                    <h3 className='text-gray-300 '>Status:</h3>
                    <span className={`w-8 h-4 rounded-full inline-block ${statusColors[status] || "bg-gray-300"}`}></span>
                </div>

                <div className='flex items-center justify-between '>
                    <h3 className='text-gray-300 '>Date ajout:</h3>
                    <h3 className='text-white font-semibold'>{date_ajout} </h3>
                </div>

                <div className='flex items-center justify-between'>
                    <h3 className='text-gray-300 '>Date expiration:</h3>
                    <h3 className='text-white font-semibold'>{date_expiration} </h3>
                </div>


               
            </div>

        </div>
        </>
  )
}

export default GridView