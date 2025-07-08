import React from 'react'
import { Trash2 } from 'lucide-react'
import { Pencil } from 'lucide-react'
import { Plus } from 'lucide-react'
import { useNavigate, useParams} from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { supprimer_categorie } from '@/api/apiCategorie'
import useAuth from '@/hooks/useAuth'

const Categorie = ({ id:categorieId, name }) => {
  const {id}= useParams()
  const navigate = useNavigate()
  const {user}= useAuth()


  const mutation = useMutation({
    mutationFn:({id})=>supprimer_categorie(id),
    onSuccess:()=>{
      navigate("/categorie")
    }

  })

function onSubmit(id) {


  if (!user || user.role !== "admin"){
    alert("seul l'admin a le droit de supprimer une categorie")
  }

  else{

    if(window.confirm("Voulez-vous vraiment supprimer cette categorie ?")){
         mutation.mutate({id})
  }

  }
  
}

function verificationModification(id) {
  if (!user || user.role !== "admin"){
    alert("seul l'admin a le droit de modifier une categorie")
  }
  else{
    navigate(`/modifierCategorie/${id}/`)
  }
}
  return (
    <tr className="border-b ">
      <td className="px-4 py-2 text-center">{categorieId}</td>
      <td className="px-4 py-2 text-center">{name}</td>
      <td className="px-4 py-2 text-center items-center justify-center flex gap-6">

        <Trash2 className="w-5 h-5 text-red-600 hover:text-red-800 cursor-pointer border-2  " onClick={()=>onSubmit(categorieId)} />
        <Pencil className="w-5 h-5 text-blue-600 hover:text-blue-800 cursor-pointer" onClick={()=>verificationModification(id)}/>
      
      </td>
    </tr>
  )
}

export default Categorie