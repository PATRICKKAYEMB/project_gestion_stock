import React, {useState} from 'react'
import Sidebar from '../components/Sidebar'
import { Download } from 'lucide-react'
import Navbar from "../components/Navbar"
import { BiFilterAlt } from 'react-icons/bi'

import {useQuery} from "@tanstack/react-query"
import { voir_vente } from '@/api/apiVente'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
  
const HistoriqueVentePage = () => {

  const [date_debut,setDate_debut] = useState("")
  const [date_fin,setDate_fin] = useState("")
  const [sort,SetSort]= useState("recent")
  const [filter,setFilter]=useState(false)
 

  const {data }= useQuery({
    queryKey:["historiqueVente"],
    queryFn: () =>{
          voir_vente({
           
            date_debut:date_debut,
            date_fin:date_fin,
            sort:sort
          })
    }
  })

  const vente   = data?.resultat || []
  return (
    <div className='flex w-full'>
      
      <Sidebar/>
      <main className='flex-1 h-screen bg-[#F5F5F5] relative '>
      <Navbar/>
        
        <div className='w-full flex items-center justify-between   mt-8 px-6 mb-2 py-2'>

          <h3 className='text-3xl font-bold text-blue-900'>Mes Ventes</h3>

          <div className='flex items-center cursor-pointer justify-center bg-white px-4 py-2 shadow rounded-md gap-3'>
                <Download/>
              <span>exporter</span>
          </div>
        </div>
        <div className='px-6 w-full'>

       

          <div className='w-full h-[100%]  bg-white px-4 shadow-2xl rounded-tl-2xl rounded-tr-2xl pt-5'>

              <div className='flex items-center justify-between mt-5 relative'>
                    <div >
                    
                      <div className='flex items-center gap-4'>
                        Du: <input type="date" placeholder='date' className='border-1 border-gray-400 bg-[#F1F1F1] px-2 py-1' />
                        Au: <input type="date" placeholder='date' className='border-1 border-gray-400 bg-[#F1F1F1] px-2 py-1' />
                      </div>
                          
                    </div>

                    <div onClick={()=> setFilter(prev => !prev)} className='flex cursor-pointer items-center border-gray-400 bg-[#F1F1F1] gap-3 justify-center px-3 py-1 mr-3 border-1 rounded-b-sm'>
                        <BiFilterAlt/>                           
                        <span>filter</span>
                        
                            
                    </div>

                    <div className= {`absolute right-0  ${filter?"w-[160px]":"w-[0px]"}  top-8  z-10 bg-blue-400 px-2 py-5 rounded-md`}>
                      <div className='mb-4'>
                      <Select >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Theme" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="light">Light</SelectItem>
                              <SelectItem value="dark">Dark</SelectItem>
                              <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                          </Select>

                      </div>


                      <div>
                      <Select>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Theme" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="light">Light</SelectItem>
                              <SelectItem value="dark">Dark</SelectItem>
                              <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                          </Select>

                      </div>

                      
                    </div>


              </div>


                <div className='py-2  pt-10 h-[60vh] overflow-hidden overflow-y-scroll'>
                    <table className='w-full border-1 px-4'>
                        <thead >
                         
                              <tr >
                                <th className='text-start py-2 px-6'>client</th>
                                <th className='text-start px-6'> produit</th>
                                <th className='text-start px-6'>prix</th>
                                <th className='text-start px-6'>quantite</th>
                                <th className='text-start px-6'>date vente</th>
                                <th className='text-start px-6'>Total</th>
                              </tr>
                          
                          </thead> 
                          <tbody>
                            {
                              vente.map((vt,id)=>( 

                                <tr className='px-2 py-4 border-1 border-gray-400 ' key={id}>
                                  <td className='text-start py-3 px-6'>{vt.client}</td>
                                  <td className='text-start px-6'>{vt.produit}</td>
                                  <td className='text-start px-6'>{vt.produit.prix}</td>
                                  <td className='text-start pl-12 '>{vt.quantite}</td>
                                  <td className='text-start px-6'>1{vt.date_vente}</td>
                                  <td className='text-start px-6'>{vt.total}</td>
                              </tr>

                              ))
                            }
                              
                            

                          </tbody>
                    </table>
                </div>

          </div>

        </div>

      </main>

    </div>
  )
}

export default HistoriqueVentePage