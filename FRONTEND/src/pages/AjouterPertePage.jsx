import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'



const AjouterPertePage = () => {
  return (

    <div className='flex w-full'>
      <Sidebar/>

       <main className="   flex-1 h-[100vh] bg-[#F1F1F1]">
    
          <Navbar/>

          <div className='w-full flex items-center justify-center'>


         
                <div className='w-full max-w-md  bg-white p-6 mt-6 rounded-2xl shadow-lg '>

                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Ajouter une Perte</h2>
                    <form  className="space-y-5">
                    

                      <div>
                        <Label htmlFor="montant">Produit:</Label>
                        <Input
                          id="produit"
                          type="text"
                          step="0.01"
                          
                          className="mt-2 mb-4"
                        />
                      </div>

                      <div>
                        <Label htmlFor="montant">prix:</Label>
                        <Input
                          id="prix"
                          type="number"
                          step="0.01"
                          
                          className="mt-2 mb-4"
                        />
                      </div>

                      <div>
                        <Label htmlFor="montant">quantite:</Label>
                        <Input
                          id="quantite"
                          type="number"
                          step="0.01"
                          
                          className="mt-2 mb-4"
                        />
                      </div>

                      <div>
                        <Label htmlFor="date">Date perte</Label>
                        <Input
                          id="datePerte"
                          type="date"
                        
                          className="mt-2 mb-4"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full mt-2 bg-blue-900 text-white py-2 rounded hover:bg-blue-700 transition"
                      >
                            Ajouter
                      </button>
                    </form>
              </div>

           </div>
   </main>
    </div>
   
  )
}

export default AjouterPertePage