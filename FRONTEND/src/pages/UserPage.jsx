

import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import SideBarMobile from '@/components/SideBarMobile'
import { Edit, Trash2 } from 'lucide-react'
import { Pencil } from 'lucide-react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { supprimer_user, voir_user } from '@/api/apiUser'
import { useNavigate, useParams } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '@/context/AppContext'
import { toast } from 'react-toastify'


const UserPage = () => {
const {data} = useQuery({
  queryKey:['users'],
  queryFn:voir_user
})

const {user}=useContext(AppContext)

const {id} = useParams()

const mutation= useMutation({
  mutationFn:(id)=>supprimer_user(id),
   onSuccess: () => {
    toast.success('Utilisateur supprimé')
  }
})


function suprimer(id) {
  if (!user || user.role !=='admin') {
    alert('Seul un admin a le droit')
    return
  }

  else{
    if (window.confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
    mutation.mutate(id)
  }
  }
}


  
const navigate= useNavigate()
 const Users = data || []
 
  return (
    <main className="flex w-full">
         <Sidebar />
         
         <div className="flex-1 h-screen bg-[#F1F1F1] relative overflow-auto">
           <Navbar />
           <SideBarMobile/>
           <div className="w-full flex items-center justify-between mt-15 md:mt-8  px-6 mb-2 py-2">
             <h3 className="text-3xl font-bold text-blue-900">utilisateurs</h3>
           </div>
                          <span className='cursor-pointer text-center  text-white hover:bg-black hover:duration-75 px-4 py-2 bg-orange-900 ml-[260px]  mb-9' onClick={()=>navigate('/enregistreUser')}>ajouter</span>
           <div className="w-full  flex items-center px-6">
           
            
                                               
             <table className=" max-w-96 mt-4  bg-white shadow-md rounded">
               <thead className="bg-gray-200">
                 <tr>
                   <th className="px-4 py-2 text-center">N:</th>
                   <th className="px-4 py-2 text-center">Nom</th>
                     <th className="px-4 py-2 text-center">Role</th>
                   <th className="px-4 py-2 text-center">action</th>
                 </tr>
               </thead>
               <tbody>

                  {
                    Users.map((item)=>(

                       <tr className="border-b ">
                              <td className="px-4 py-2 text-center">{item.id}</td>
                              <td className="px-4 py-2 text-center">{item.username}</td>
                              <td className="px-4 py-2 text-center">{item.role}</td>
                              <td className="px-4 py-2 text-center items-center justify-center flex gap-6">

                                <Edit className="w-5 h-5 text-blue-600 hover:text-blue-800 cursor-pointer" onClick={()=>navigate(`/ModifierUser/${item.id}/`)} />
                                <Trash2 className="w-5 h-5 text-red-600 hover:text-red-800 cursor-pointer border-2  " onClick={()=>suprimer(item.id)} />
                             
                              
                              </td>
                      </tr>

                    ))
                  }
                       
               
               </tbody>
             </table>
           </div>
         </div>
       </main>
  )
  
}

export default UserPage