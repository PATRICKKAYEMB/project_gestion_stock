import React, { useState } from 'react'
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import SmallSpinner from '../components/SmallSpinner'
import SmallSpinnerText from '../components/SmallSpinnerText'
import { creationCompte } from '@/api/apiUser'
import { AppContext } from '@/context/AppContext'
import { Eye } from 'lucide-react'

const EnregistrerUserPage = () => {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [name, setName] = useState("")
  const [role, setRole] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()

  const creationCompteMutation = useMutation({
    mutationFn: (formData) => creationCompte(formData),
    onSuccess: (data) => {
      toast.success("Compte créé avec succès")
      console.log("Compte créé avec succès", data)
      // redirige ou change d'état si besoin
      navigate("/login")
    },
    onError: (err) => {
      toast.error("Erreur lors de la création du compte")
      console.error(err)
    }
  })

  const onSubmitCreationCompte = (event) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      setError("Les deux mots de passe ne sont pas égaux")
      return
    }

    setError("") // reset erreur si tout est ok

    const formData = {
      name,
      password,
      role,
    }

    creationCompteMutation.mutate(formData)
  }

  return (
    <form
      className="min-h-[90vh] flex items-center bg-[#F1F1F1]"
      onSubmit={onSubmitCreationCompte}
    >
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] bg-white rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl mb-4 font-semibold">Créer un compte</p>

        <div className="w-full">
          <p>Nom complet</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>

        <div className="w-full">
          <p>Rôle</p>
          <select
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">-- Choisir un rôle --</option>
            <option value="client">Client</option>
            <option value="gestionnaire">Gestionnaire</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="w-full">
          <p>Mot de passe</p>
          <div className="flex items-center gap-3">
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <Eye
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer"
            />
          </div>
        </div>

        <div className="w-full">
          <p>Confirmer le mot de passe</p>
          <div className="flex items-center gap-3">
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type={showPassword ? "text" : "password"}
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              required
            />
            <Eye
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer"
            />
          </div>
        </div>

        <button
          type="submit"
          className="border items-center flex justify-center bg-orange-900 text-white py-2 w-full rounded-md text-base"
          disabled={creationCompteMutation.isPending}
        >
          {creationCompteMutation.isPending ? (
            <>
              <SmallSpinner />
              <SmallSpinnerText text="Création..." />
            </>
          ) : (
            <SmallSpinnerText text="Créer un compte" />
          )}
        </button>

        {error && <p className="text-red-500 text-base text-center">{error}</p>}

        <p>
          J'ai déjà un compte ?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-primary underline cursor-pointer"
          >
            Se connecter ici
          </span>
        </p>
      </div>
    </form>
  )
}

export default EnregistrerUserPage
