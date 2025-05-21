import React from 'react'
import Sidebar from '../components/Sidebar'
import { Download } from 'lucide-react'
import Navbar from "../components/Navbar"
import { BiFilterAlt } from 'react-icons/bi'

const VoirPertePage = () => {
  return (
     <div className='flex w-full'>
              
              <Sidebar/>
              <main className='flex-1 h-screen bg-[#F5F5F5] relative '>
              <Navbar/>
                
                <div className='w-full flex items-center justify-between   mt-8 px-6 mb-2 py-2'>
        
                  <h3 className='text-3xl font-bold text-red-600'>pertes</h3>
        
                  
                </div>
                <div className='px-6 w-full'>
        
               
        
                  <div className='w-full h-[100%]  bg-red-100 px-4 shadow-2xl rounded-tl-2xl rounded-tr-2xl pt-5'>
        
                      <div className='flex items-center justify-between mt-5'>
                        <div>
                         
                          <div className='flex items-center gap-4'>
                             Du: <input type="date" placeholder='date' className='border-1 border-gray-400 bg-[#F1F1F1] px-2 py-1' />
                             Au: <input type="date" placeholder='date' className='border-1 border-gray-400 bg-[#F1F1F1] px-2 py-1' />
                          </div>
                              
                        </div>
        
                         <div className='flex cursor-pointer items-center border-gray-400 bg-[#F1F1F1] gap-3 justify-center px-3 py-1 mr-3 border-1 rounded-b-sm'>
                            <BiFilterAlt/>                           
                            <span>filter</span>
                            
                                
                        </div>
                      </div>
        
        
                        <div className='py-2  pt-10 h-[60vh] overflow-hidden overflow-y-scroll'>
                            <table className='w-full border-1 px-4'>
                                <thead >
                                      <tr >
                                       
                                        <th className='text-start px-6'> produit</th>
                                        <th className='text-start px-6'>description</th>
                                        <th className='text-start px-6'>prix</th>
                                        <th className='text-start px-6'>quantite</th>
                                        <th className='text-start px-6'>date perte</th>
                                        <th className='text-start px-6'>Total</th>
                                      </tr>
                                  
                                  </thead> 
                                  <tbody>
                                      <tr className='px-2 py-4 border-1 border-gray-400 '>
                                          <td className='text-start py-3 px-6'>patrick</td>
                                          <td className='text-start px-6'>savon</td>
                                          <td className='text-start px-6'>2000Fc</td>
                                          <td className='text-start pl-12 '>3</td>
                                          <td className='text-start px-6'>12/04/205</td>
                                          <td className='text-start px-6'>6000FC</td>
                                      </tr>
        
        
                                      <tr className='px-2 py-4 border-1 border-gray-400 '>
                                          <td className='text-start py-3 px-6'>patrick</td>
                                          <td className='text-start px-6'>savon</td>
                                          <td className='text-start px-6'>2000Fc</td>
                                          <td className='text-start pl-12 '>3</td>
                                          <td className='text-start px-6'>12/04/205</td>
                                          <td className='text-start px-6'>6000FC</td>
                                      </tr>
        
        
                                      <tr className='px-2 py-4 border-1 border-gray-400 '>
                                          <td className='text-start py-3 px-6'>patrick</td>
                                          <td className='text-start px-6'>savon</td>
                                          <td className='text-start px-6'>2000Fc</td>
                                          <td className='text-start pl-12 '>3</td>
                                          <td className='text-start px-6'>12/04/205</td>
                                          <td className='text-start px-6'>6000FC</td>
                                      </tr>
        
        
                                      <tr className='px-2 py-4 border-1 border-gray-400 '>
                                          <td className='text-start py-3 px-6'>patrick</td>
                                          <td className='text-start px-6'>savon</td>
                                          <td className='text-start px-6'>2000Fc</td>
                                          <td className='text-start pl-12 '>3</td>
                                          <td className='text-start px-6'>12/04/205</td>
                                          <td className='text-start px-6'>6000FC</td>
                                      </tr>
        
        
                                      <tr className='px-2 py-4 border-1 border-gray-400 '>
                                          <td className='text-start py-3 px-6'>patrick</td>
                                          <td className='text-start px-6'>savon</td>
                                          <td className='text-start px-6'>2000Fc</td>
                                          <td className='text-start pl-12 '>3</td>
                                          <td className='text-start px-6'>12/04/205</td>
                                          <td className='text-start px-6'>6000FC</td>
                                      </tr>
        
                                      <tr className='px-2 py-4 border-1 border-gray-400 '>
                                          <td className='text-start py-3 px-6'>patrick</td>
                                          <td className='text-start px-6'>savon</td>
                                          <td className='text-start px-6'>2000Fc</td>
                                          <td className='text-start pl-12 '>3</td>
                                          <td className='text-start px-6'>12/04/205</td>
                                          <td className='text-start px-6'>6000FC</td>
                                      </tr>
        
        
                                      <tr className='px-2 py-4 border-1 border-gray-400 '>
                                          <td className='text-start py-3 px-6'>patrick</td>
                                          <td className='text-start px-6'>savon</td>
                                          <td className='text-start px-6'>2000Fc</td>
                                          <td className='text-start pl-12 '>3</td>
                                          <td className='text-start px-6'>12/04/205</td>
                                          <td className='text-start px-6'>6000FC</td>
                                      </tr>
        
                                      <tr className='px-2 py-4 border-1 border-gray-400 '>
                                          <td className='text-start py-3 px-6'>patrick</td>
                                          <td className='text-start px-6'>savon</td>
                                          <td className='text-start px-6'>2000Fc</td>
                                          <td className='text-start pl-12 '>3</td>
                                          <td className='text-start px-6'>12/04/205</td>
                                          <td className='text-start px-6'>6000FC</td>
                                      </tr>
        
                                    
        
                                      
        
                                    
        
                                  </tbody>
                            </table>
                        </div>
        
                  </div>
        
                </div>
        
              </main>
        
            </div>
  )
}

export default VoirPertePage