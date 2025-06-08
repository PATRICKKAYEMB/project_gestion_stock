import React, { useEffect } from 'react'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'
import { Textarea } from "@/components/ui/textarea"
import { useForm } from 'react-hook-form'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useMutation, useQuery } from '@tanstack/react-query'
import { Detail_produit, modifier_produit} from '@/api/apiProduit'
import { toast } from 'react-toastify'
import { voir_categorie } from '@/api/apiCategorie'
import { useNavigate, useParams } from 'react-router-dom'

const ModifierProduitPage = () => {
  const { id } = useParams()
  const navigation = useNavigate()

  const { register, handleSubmit, setValue } = useForm()

  const mutation = useMutation({
    mutationFn: modifier_produit,
    onSuccess: () => {
      toast.success("Produit modifié avec succès")
      navigation("/produits")
    },
    onError: () => {
      toast.error("Erreur lors de la modification du produit")
    }
  })

  const { data: categorieData } = useQuery({
    queryKey: ["categorie"],
    queryFn: voir_categorie,
  })

  const { data: produit, isLoading } = useQuery({
    queryKey: ['produit', id],
    queryFn: () => Detail_produit(id),
    enabled: !!id,
  })

  useEffect(() => {
    if (produit) {
      setValue('name', produit.name)
      setValue('prix', produit.prix)
      setValue('quantite', produit.quantite)
      setValue('description', produit.description)
      setValue('date_ajout', produit.date_ajout)
      setValue('date_expiration', produit.date_expiration)
      setValue('categorie', produit.categorie.toString())
    }
  }, [produit, setValue])

  function onSubmit(data) {
    const form_data = new FormData()
    form_data.append("name", data.name)
    form_data.append("prix", data.prix)
    if (data.image?.[0]) {
      form_data.append("image", data.image[0])
    }
    form_data.append("categorie", data.categorie)
    form_data.append("description", data.description)
    form_data.append("quantite", data.quantite)
    form_data.append("date_ajout", data.date_ajout)
    form_data.append("date_expiration", data.date_expiration)
    form_data.append("produit", id)
    mutation.mutate({ formData: form_data, id: id })
  }

  if (isLoading) return <div className="p-6">Chargement du produit...</div>

  return (
    <div className='flex w-full'>
      <Sidebar />

      <main className="flex-1 h-[100vh] bg-[#F1F1F1]">
        <Navbar />

        <div className='w-full flex items-center justify-center'>
          <div className='w-full max-w-md bg-white p-6 mt-6 rounded-2xl shadow-lg'>
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
              Modification produit
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

              <div className='flex items-center justify-center gap-2'>
                <div>
                  <Label htmlFor="name">Produit:</Label>
                  <Input
                    id="name"
                    type="text"
                    {...register("name", { required: true })}
                    className="mt-2 mb-4"
                  />
                </div>

                <div>
                  <Label htmlFor="image">Image:</Label>

                  {/* Aperçu de l'image actuelle */}
                  {produit?.image && (
                    <img
                      src={produit.image}
                      alt="Aperçu"
                      className="w-20 h-20 object-cover mb-2"
                    />
                  )}

                  <Input
                    id="image"
                    type="file"
                    {...register("image")}
                    className="mt-2 mb-4"
                  />
                </div>
              </div>

              <div className='flex items-center justify-center gap-2'>
                <div>
                  <Label htmlFor="categorie">Catégorie :</Label>
                  <Select onValueChange={(value) => setValue("categorie", value)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Choisir une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {categorieData?.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id.toString()}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <input type="hidden" {...register("categorie", { required: true })} />
                </div>

                <div>
                  <Label htmlFor="prix">Prix:</Label>
                  <Input
                    id="prix"
                    type="number"
                    step="0.01"
                    {...register("prix", { required: true })}
                    className="mt-2 mb-4"
                  />
                </div>

                <div>
                  <Label htmlFor="quantite">Quantité:</Label>
                  <Input
                    id="quantite"
                    type="number"
                    step="0.01"
                    {...register("quantite", { required: true })}
                    className="mt-2 mb-4"
                  />
                </div>
              </div>

              <div className='flex items-center justify-center gap-2'>
                <div>
                  <Label htmlFor="date_ajout">Date ajout</Label>
                  <Input
                    id="date_ajout"
                    type="date"
                    {...register("date_ajout", { required: true })}
                    className="mt-2 mb-4"
                  />
                </div>

                <div>
                  <Label htmlFor="date_expiration">Date expiration</Label>
                  <Input
                    id="date_expiration"
                    type="date"
                    {...register("date_expiration", { required: true })}
                    className="mt-2 mb-4"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  className="mt-2 mb-4"
                  id='description'
                  {...register("description", { required: true })}
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-blue-900 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                Modifier
              </button>

            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ModifierProduitPage
