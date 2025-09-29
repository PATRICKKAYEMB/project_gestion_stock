import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from 'react-toastify'
import SmallSpinner from '../components/SmallSpinner'
import SmallSpinnerText from '../components/SmallSpinnerText'
import { get_user, modification_user } from '@/api/apiUser'
import { Eye, EyeOff } from "lucide-react"

const ModifierUserPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [role, setRole] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  // 🔹 Récupération de l'utilisateur
  const { data: user } = useQuery({
    queryKey: ['user', id],
    queryFn: () => get_user(id)
  })

  // Pré-remplissage username et role
  useEffect(() => {
    if (user) {
      setUsername(user.username || "")
      setRole(user.role || "")
    }
  }, [user])

  // 🔹 Mutation pour modification
  const modificationMutation = useMutation({
    mutationFn: (data) => modification_user(id, data),
    onSuccess: () => {
      toast.success("Utilisateur modifié avec succès ✅")
      navigate("/users")
    },
    onError: () => {
      toast.error("Erreur lors de la modification ❌")
    },
  })

  // 🔹 Submit
  const onSubmit = (e) => {
    e.preventDefault()

    // Vérification mot de passe
    if (password && password !== confirmPassword) {
      setErrorMessage("⚠️ Les mots de passe ne correspondent pas.")
      return
    }

    setErrorMessage("") // efface le message si tout est correct

    const data = {}
    if (username) data.username = username
    if (role) data.role = role
    if (password.trim() !== "") data.password = password // n’envoyer que si rempli

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
            placeholder="Nom complet"
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
            <option value="">-- Choisir un rôle --</option>
            <option value="client">Client</option>
            <option value="gestionnaire">Gestionnaire</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Mot de passe */}
        <div className="w-full">
          <p>Mot de passe (laisser vide si inchangé)</p>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="border border-zinc-300 rounded w-full p-2 mt-1 pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nouveau mot de passe"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-zinc-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
        </div>

        {/* Confirmation mot de passe */}
        <div className="w-full">
          <p>Confirmer le mot de passe</p>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="border border-zinc-300 rounded w-full p-2 mt-1 pr-10"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirmez le mot de passe"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-zinc-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
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

        {/* Message d'erreur sous le bouton */}
        {errorMessage && (
          <p className="text-red-600 text-sm mt-2">{errorMessage}</p>
        )}
      </div>
    </form>
  )
}

export default ModifierUserPage
