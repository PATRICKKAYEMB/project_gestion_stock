from django.apps import AppConfig
from .recommandation import recommandation_module
import os

class StockConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'stock'


     # --- NOUVEAU : Ajoutez ces attributs de classe pour stocker les modèles chargés ---
    loaded_knn_model = None
    loaded_pivot_table = None
    loaded_df_produits_map = None

    def ready(self):
        # La condition 'os.environ.get('RUN_MAIN', None) != 'true'' est une bonne pratique
        # pour éviter le double chargement en mode développement.
        # Si vous l'avez temporairement retirée pour le débogage, vous pouvez la remettre.
        if os.environ.get('RUN_MAIN', None) != 'true':
            print("Appel de la fonction de chargement du modèle de recommandation au démarrage de l'application 'stock'...")
            
            # --- MODIFIÉ : Appelle la fonction de chargement et stocke les résultats ---
            # Nous appellerons une nouvelle fonction qui retourne les objets.
            (StockConfig.loaded_knn_model,
             StockConfig.loaded_pivot_table,
             StockConfig.loaded_df_produits_map) = \
               recommandation_module.load_and_return_recommender_resources() 

            print("Fonction de chargement du modèle appelée.")