import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'

const ModifierCategoriePage = () => {
  return (
     <main className='flex w-full'>  
            <Sidebar/>
            <div className='flex-1 h-screen bg-[#F5F5F5] relative overflow-auto'>
                <Navbar/>

                 <div className="w-full flex items-center justify-between mt-8 px-6 mb-2 py-2">
                         <h3 className="text-3xl font-bold text-blue-900">categorie</h3>
                 </div>

                <div className='items-center justify-center flex w-full'>

               
                        <div className=' max-w-md  w-full bg-white p-6 mt-6 rounded-2xl shadow-lg'>
                                         <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Modifier une Categorie</h2>
                
                                <form  className="space-y-5">
                                                
    
                                                    <div>
                                                    <Label htmlFor="quantite">nom:</Label>
                                                    <Input
                                                        id="quantite"
                                                        type="number"
                                                        step="0.01"
                                                        
                                                        className="mt-2 mb-4"
                                                    />
                                                    </div>
                                
                                                    <div>
                                                    <Label htmlFor="">image:</Label>
                                                    <Input
                                                        id="date_achat"
                                                        type="file"
                                                        step="0.01"
                                                        
                                                        className="mt-2 mb-4"
                                                    />
                                                    </div>
                                
                                
                                                    <button
                                                    type="submit"
                                                    className="w-full mt-2 bg-blue-900 text-white py-2 rounded hover:bg-blue-700 transition"
                                                    
                                                    >
                                                       valider 
                                                    </button>
                                </form>
                        </div>

                 </div>

            </div>
        </main>
  )
}

export default ModifierCategoriePage