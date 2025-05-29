import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Download } from 'lucide-react';
import { BiFilterAlt } from 'react-icons/bi';
import { useQuery } from '@tanstack/react-query';
import { voir_vente } from '@/api/apiVente';
import { voir_categorie } from '@/api/apiCategorie';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
  	
const HistoriqueVentePage = () => {
  const [date_debut, setDate_debut] = useState('');
  const [date_fin, setDate_fin] = useState('');
  const [sort, setSort] = useState('recent');
  const [filter, setFilter] = useState(false);
  const [categorie, setCategorie] = useState('');

  // Récupération des ventes avec les filtres
  const { data: ventesData } = useQuery({
    queryKey: ['historiqueVente', categorie, date_debut, date_fin, sort],
    queryFn: () =>
      voir_vente({
        categorie,
        date_debut,
        date_fin,
        sort,
      }),
  });

  // Récupération des catégories
  const { data: categoriesData } = useQuery({
    queryKey: ['categorie_liste'],
    queryFn: voir_categorie,
  });

  const voir_categories = categoriesData || [];
  const ventes = ventesData || [];

  return (
    <div className="flex w-full">
      <Sidebar />
      <main className="flex-1 h-screen bg-[#F5F5F5] relative">
        <Navbar />

        <div className="w-full flex items-center justify-between mt-8 px-6 mb-2 py-2">
          <h3 className="text-3xl font-bold text-blue-900">Mes Ventes</h3>

          <div className="flex items-center cursor-pointer justify-center bg-white px-4 py-2 shadow rounded-md gap-3">
            <Download />
            <span>Exporter</span>
          </div>
        </div>

        <div className="px-6 w-full">
          <div className="w-full h-[100%] bg-white px-4 shadow-2xl rounded-tl-2xl rounded-tr-2xl pt-5">
            <div className="flex items-center justify-between mt-5 relative">
              <div>
                <div className="flex items-center gap-4">
                  Du:{' '}
                  <input
                    type="date"
                    onChange={(e) => setDate_debut(e.target.value)}
                    placeholder="date"
                    className="border-1 border-gray-400 bg-[#F1F1F1] px-2 py-1"
                  />
                  Au:{' '}
                  <input
                    type="date"
                    onChange={(e) => setDate_fin(e.target.value)}
                    placeholder="date"
                    className="border-1 border-gray-400 bg-[#F1F1F1] px-2 py-1"
                  />
                </div>
              </div>

              <div
                onClick={() => setFilter((prev) => !prev)}
                className="flex cursor-pointer items-center border-gray-400 bg-[#F1F1F1] gap-3 justify-center px-3 py-1 mr-3 border-1 rounded-b-sm"
              >
                <BiFilterAlt />
                <span>Filtrer</span>
              </div>

              {filter && (
                <div className="absolute right-0 w-[160px] top-8 z-10 bg-blue-400 px-2 py-5 rounded-md">
                  <div className="mb-4">
                    <Select onValueChange={(val) => setCategorie(val)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        {voir_categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Select onValueChange={(val) => setSort(val)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Trier par" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recent">Récent</SelectItem>
                        <SelectItem value="ancien">Ancien</SelectItem>
                        <SelectItem value="montant_desc">
                          Montant décroissant
                        </SelectItem>
                        <SelectItem value="montant_asc">
                          Montant croissant
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>

            <div className="py-2 pt-10 h-[60vh] overflow-hidden overflow-y-scroll">
              <table className="w-full border-1 px-4">
                <thead>
                  <tr>
                    <th className="text-start py-2 px-6">Client</th>
                    <th className="text-start px-6">Produit</th>
                    <th className="text-start px-6">Prix</th>
                    <th className="text-start px-6">Quantité</th>
                    <th className="text-start px-6">Date de vente</th>
                    <th className="text-start px-6">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {ventes.map((vt, id) => (
                    <tr
                      className="px-2 py-4 border-1 border-gray-400"
                      key={id}
                    >
                      <td className="text-start py-3 px-6">{vt.client}</td>
                     

                      <td className="text-start px-6">{vt.produit_nom}</td>
                      <td className="text-start px-6">{vt.prix_produit}</td>


                      <td className="text-start pl-12">{vt.quantite}</td>
                      <td className="text-start px-6">{vt.date_vente}</td>
                      <td className="text-start px-6">{vt.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HistoriqueVentePage;
