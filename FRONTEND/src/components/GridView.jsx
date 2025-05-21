import React from 'react'
import image from "../assets/ecouteur.jpg"
const GridView = () => {
  return (
    
        <>
            <div className='h-[350px] p-2 bg-blue-950 rounded-sm'  >
                <img src={image} className='w-full h-[160px] bg-amber-600 rounded-md' />
               
                <h3 className='text-lg text-white  mt-3'>disque</h3>
                <div className='flex items-center justify-between mb-2'>
                    <h3 className='text-gray-300 '>Category:</h3>
                    <h3 className='text-white font-semibold'>machine </h3>
                </div>
                <div className='flex items-center justify-between mb-2'>
                    <h3 className='text-gray-300 '>Category:</h3>
                    <h3 className='text-white font-semibold'>machine </h3>
                </div>
                <div className='flex items-center justify-between mb-2'>
                    <h3 className='text-gray-300 '>Category:</h3>
                    <h3 className='text-white font-semibold'>machine </h3>
                </div>

                <div className='flex items-center justify-between mb-2'>
                    <h3 className='text-gray-300 '>Category:</h3>
                    <h3 className='text-white font-semibold'>machine </h3>
                </div>

            </div>
        </>
  )
}

export default GridView