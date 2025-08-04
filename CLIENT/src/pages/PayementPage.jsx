import React, { useContext, useState } from 'react';
import { AppContext } from '../Context/AppContext';
import { BASEIMAGEUrl } from '../api/api';
import { useMutation } from '@tanstack/react-query';
import { initierPaiement } from '../api/paymentApi';
import { ShoppingCartIcon } from 'lucide-react';
import SmallSpinner from '../components/SmallSpinner';
import SmallSpinnerText from '../components/SmallSpinnerText';


const PayementPage = () => {
  const { panier, user } = useContext(AppContext);
  const [message, setMessage] = useState('');

  const dateVente = new Date().toISOString().split('T')[0];
  const montant = panier.reduce((acc, produit) => acc + produit.prix * produit.quantite, 0);

  const mutation = useMutation({
    mutationFn: (payload) => initierPaiement(payload),
    onSuccess: (data) => {
      if (data.redirect_url) {
        window.location.href = data.redirect_url; // 🔁 Redirection vers CinetPay
      } else {
        setMessage("Erreur : aucune URL de paiement reçue.");
      }
    },
    onError: (error) => {
      console.error("Erreur lors du paiement :", error);
      setMessage("Erreur lors de l'initialisation du paiement.");
    }
  });

  

 const handleAchat = () => {
  console.log(user.name,"merci pour votre achat");
  if (!user) {
    setMessage("Vous devez être connecté pour payer.");
    return;
  }

  const produitsPayload = panier.map(p => ({
    id: p.id,
    quantite: p.quantite
  }));

  const payload = {
    client: user.name,
    date_vente: dateVente,
    produits: produitsPayload,
    montant
  };

  mutation.mutate(payload);
};


  return (
    <main className='w-full px-[5%] flex-1 h-[100vh] bg-[#F1F1F1]'>
      <h2 className="text-2xl font-bold text-center mt-10 text-gray-800">Paiement</h2>

      <div className='p-5 flex gap-6 w-full h-[75vh]'>
        {/* Zone Panier */}
        <div className='flex-1'>
          {panier.length === 0 ? (
            <p className='text-center text-gray-600 mt-10'>Votre panier est vide.</p>
          ) : (
            <div className='gap-4'>
              {panier.map((produit) => (
                <div key={produit.id} className='bg-white shadow flex mb-2 items-center justify-between rounded px-3 py-2'>
                  <div className='gap-2 flex items-center'>
                    <img src={`${BASEIMAGEUrl}${produit.image}`} alt={produit.name} className='h-14' />
                    <div>
                      <h3 className='text-lg font-semibold'>{produit.name}</h3>
                      <p className='text-sm text-gray-600'>Prix : {produit.prix} FC</p>
                    </div>
                  </div>

                  <div className='flex items-center gap-3'>
                    <span className='text-sm text-gray-600'>Quantité : {produit.quantite}</span>
                  </div>
                </div>
              ))}

              <h3 className='text-2xl float-right font-bold mb-4'>Total : {montant} FC</h3>
            </div>
          )}
        </div>

        {/* Zone Paiement */}
        {panier.length > 0 && (
          <div className='w-[400px] py-4 px-6 border-2 flex items-center justify-center flex-col bg-white rounded-2xl'>
            <h3 className='text-xl text-gray-800 mb-4  text-center'>Paiement Mobile Money</h3>

           <button
              onClick={handleAchat}
              className={`w-full py-2 items-center flex justify-center rounded mt-2 transition duration-200 
                          ${!user ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-900 hover:bg-black duration-300 text-white'}`}
              disabled={!user}
            >
            {mutation.isPending ? (
              <>
                <SmallSpinner />
                <SmallSpinnerText text="Traitement..." />
              </>
            ) : (
              <>
                <ShoppingCartIcon className='inline-block mr-2' />
                Payer maintenant
              </>
            )}
            </button>
            

            {message && <p className="mt-4 text-red-600 text-sm text-center">{message}</p>}
          </div>
        )}
      </div>
    </main>
  );
};

export default PayementPage;
