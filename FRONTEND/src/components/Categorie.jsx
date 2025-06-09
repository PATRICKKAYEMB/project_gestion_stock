import React from 'react'
import { Trash2 } from 'lucide-react'
import { Pencil } from 'lucide-react'
import { Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Categorie = ({ id, name }) => {
  const navigate = useNavigate()
  return (
    <tr className="border-b ">
      <td className="px-4 py-2 text-center">{id}</td>
      <td className="px-4 py-2 text-center">{name}</td>
      <td className="px-4 py-2 text-center items-center justify-center flex gap-6">

        <Trash2 className="w-5 h-5 text-red-600 hover:text-red-800 cursor-pointer border-2  " />
        <Pencil className="w-5 h-5 text-blue-600 hover:text-blue-800 cursor-pointer" onClick={()=>navigate("/modifierCategorie")}/>
        <Plus className="w-5 h-5 cursor-pointer" onClick={()=>navigate('/ajouterCategorie')} />
      </td>
    </tr>
  )
}

export default Categorie