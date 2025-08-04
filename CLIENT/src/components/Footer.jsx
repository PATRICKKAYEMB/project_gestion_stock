const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-4 sm:grid-cols-2 gap-8 text-sm">
        
        {/* À propos */}
        <div>
          <h2 className="text-xl font-bold mb-3">Vision Tag <span className="text-red-500">.</span></h2>
          <p className="mb-4 text-gray-300">
            Boutique spécialisée dans la vente d’ordinateurs, téléphones, tablettes, accessoires et chargeurs. Produits de qualité à prix compétitifs.
          </p>
       
        </div>

        {/* Catégories */}
        <div>
          <h3 className="font-semibold mb-3">Catégories</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a  className="hover:text-gray-100 hover:cursor-pointer">Ordinateurs</a></li>
            <li><a  className="hover:text-gray-100 hover:cursor-pointer">Moniteurs</a></li>
            <li><a  className="hover:text-gray-100 hover:cursor-pointer">Ecouteurs</a></li>
            <li><a  className="hover:text-gray-100 hover:cursor-pointer">Chargeurs</a></li>
            <li><a  className="hover:text-gray-100 hover:cursor-pointer">Accessoires</a></li>
          </ul>
        </div>

        {/* Informations */}
        <div>
          <h3 className="font-semibold mb-3">Informations</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a  className="hover:text-gray-100 hover:cursor-pointer">À propos</a></li>
            <li><a className="hover:text-gray-100 hover:cursor-pointer">Nous contacter</a></li>
            <li><a className="hover:text-gray-100 hover:cursor-pointer">Nos produits</a></li>
            <li><a className="hover:text-gray-100 hover:cursor-pointer">Catégories</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold mb-3">Rejoignez notre newsletter</h3>
          <p className="mb-3 text-gray-300">
            Recevez nos offres spéciales, nouveautés et promotions par e-mail.
          </p>
          <form className="flex items-center">
            <input
              type="email"
              placeholder="Votre adresse e-mail"
              className="w-full px-3 py-2 border border-gray-600 rounded-l bg-gray-800 text-white placeholder-gray-400"
            />
            <button className="bg-orange-900 text-white px-4 py-2 rounded-r hover:bg-orange-900">
              S'inscrire
            </button>
          </form>
          <div className="flex gap-3 mt-4 text-gray-400 text-lg">
            <a className="hover:text-white hover:cursor-pointer"><i className="fab fa-twitter"></i></a>
            <a className="hover:text-white hover:cursor-pointer"><i className="fab fa-instagram"></i></a>
            <a className="hover:text-white hover:cursor-pointer"><i className="fab fa-youtube"></i></a>
            <a className="hover:text-white hover:cursor-pointer"><i className="fab fa-facebook-f"></i></a>
          </div>
        </div>
      </div>

   
    </footer>
  );
};

export default Footer;
