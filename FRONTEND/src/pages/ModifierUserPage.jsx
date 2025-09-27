import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation } from "@tanstack/react-query"
import { toast } from 'react-toastify'
import SmallSpinner from '../components/SmallSpinner'
import SmallSpinnerText from '../components/SmallSpinnerText'
import { modification_user } from '@/api/apiUser'

const ModifierUserPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")

  // 🔹 Mutation pour modification
  const modificationMutation = useMutation({
    mutationFn: (data) => modification_user(id, data),
    onSuccess: () => {
      toast.success("Utilisateur modifié avec succès ✅")
      navigate("/users") // Redirection vers la liste des users
    },
    onError: () => {
      toast.error("Erreur lors de la modification ❌")
    },
  })

  // 🔹 Submit
  const onSubmit = (e) => {
    e.preventDefault()

    const data = {}
    if (username) data.username = username
    if (password) data.password = password
    if (role) data.role = role

    modificationMutation.mutate(data)
  }

  return (
    <form onSubmit={onSubmit} className="min-h-[90vh] flex items-center bg-[#F1F1F1]">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] bg-white rounded-xl text-zinc-600 text-sm shadow-lg">
        
        <p className="text-2xl mb-4 font-semibold">Modifier un utilisateur</p>

        {/* Nom complet */}
        <div className="w-full">
          <p>Nom complet</p>
          <input
            type="text"
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nouveau nom (facultatif)"
          />
        </div>

        {/* Sélecteur de rôle */}
        <div className="w-full">
          <p>Rôle</p>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border border-zinc-300 rounded w-full p-2 mt-1"
          >
            <option value="">-- Choisir un rôle (facultatif) --</option>
            <option value="client">Client</option>
            <option value="gestionnaire">Gestionnaire</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Mot de passe */}
        <div className="w-full">
          <p>Mot de passe</p>
          <input
            type="password"
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nouveau mot de passe (facultatif)"
          />
        </div>

        {/* Bouton */}
        <button
          type="submit"
          className="border flex justify-center items-center bg-orange-900 text-white py-2 w-full rounded-md text-base"
          disabled={modificationMutation.isPending}
        >
          {modificationMutation.isPending ? (
            <>
              <SmallSpinner />
              <SmallSpinnerText text="Modification..." />
            </>
          ) : (
            <SmallSpinnerText text="Modifier l’utilisateur" />
          )}
        </button>
      </div>
    </form>
  )
}

export default ModifierUserPage
