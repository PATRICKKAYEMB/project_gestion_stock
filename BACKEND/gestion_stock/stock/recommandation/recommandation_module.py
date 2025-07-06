# stock/recommandation/recommandation_module.py
import pandas as pd
import numpy as np
import joblib 
import os 
import traceback 
# --- Configuration des Chemins ---
BASE_DIR_FOR_MODELS = os.path.dirname(os.path.abspath(__file__)) 

MODEL_PATH = os.path.join(BASE_DIR_FOR_MODELS, "recommandation_knn_model.joblib")
PIVOT_TABLE_PATH = os.path.join(BASE_DIR_FOR_MODELS, "recommandation_pivot_table.joblib")
PRODUITS_MAP_PATH = os.path.join(BASE_DIR_FOR_MODELS, "df_produits_map.joblib")

# --- SUPPRIMÉ : Les variables globales ne sont plus nécessaires ici ---
# loaded_knn_model = None
# loaded_pivot_table = None
# loaded_df_produits_map = None

# --- NOUVEAU : Fonction de Chargement qui retourne les ressources ---
# --- Fonction de Chargement qui retourne les ressources ---
def load_and_return_recommender_resources():
    print(f"Tentative de chargement des ressources de recommandation depuis : {BASE_DIR_FOR_MODELS}...")

    knn_model = None
    pivot_table = None
    df_produits_map = None

    try:
        knn_model = joblib.load(MODEL_PATH)
        pivot_table = joblib.load(PIVOT_TABLE_PATH)
        df_produits_map = joblib.load(PRODUITS_MAP_PATH)
        print("Ressources de recommandation chargées avec succès.")
        # --- DEBUG : Ajoutez ces lignes pour vérifier le type de l'index de pivot_table ---
        if pivot_table is not None:
            print(f"DEBUG (load): Type de l'index de pivot_table : {pivot_table.index.dtype}")
            print(f"DEBUG (load): Quelques IDs de l'index : {pivot_table.index[:5].tolist()}")
        # --- FIN DEBUG ---
    except FileNotFoundError:
        print(f"ERREUR : Un ou plusieurs fichiers du modèle ({MODEL_PATH}, {PIVOT_TABLE_PATH}, {PRODUITS_MAP_PATH}) sont introuvables. "
              "Veuillez vous assurer que 'train_model.py' a été exécuté et que les fichiers sont au bon endroit.")
    except Exception as e:
        # --- MODIFIÉ : Affichez la traceback complète pour voir l'erreur exacte ---
        print(f"ERREUR INATTENDUE DÉTAILLÉE lors du chargement des ressources de recommandation : {e}")
        traceback.print_exc() # <-- C'EST LA LIGNE CLÉ POUR LE DÉBOGAGE !
        # Assurez-vous que les variables sont bien None en cas d'erreur
        knn_model = None
        pivot_table = None
        df_produits_map = None

    return knn_model, pivot_table, df_produits_map


# --- Fonction de Prédiction/Recommandation ---

def get_recommendations(target_product_id, top_k=5):
    from stock.apps import StockConfig 
    
    knn_model = StockConfig.loaded_knn_model
    pivot_table = StockConfig.loaded_pivot_table
    df_produits_map = StockConfig.loaded_df_produits_map


    if knn_model is None or pivot_table is None or df_produits_map is None:
        return []

    try:
        produit_index = pivot_table.index.get_loc(target_product_id)
        print(f"DEBUG (get_recommendations): ID {target_product_id} trouvé à l'index {produit_index} dans pivot_table.") 
    except KeyError:
        print(f"Produit ID {target_product_id} non trouvé dans les données du modèle. Pas de recommandations possibles.")
        return [] 
    except Exception as e: 
        print(f"ERREUR INATTENDUE lors de la recherche de l'ID {target_product_id} : {e}")
        traceback.print_exc()
        return []

    target_product_row = pivot_table.iloc[produit_index].values
    print(f"DEBUG (get_recommendations): Ligne du produit cible (premiers 5 éléments) : {target_product_row[:5]}...")
    if np.all(target_product_row == 0):
        print(f"DEBUG (get_recommendations): ATTENTION: La ligne pour l'ID {target_product_id} est entièrement nulle. Les recommandations peuvent être génériques.")

    # Définir combien de voisins demander au modèle. Nous en voulons top_k, plus 1 pour la cible.
    num_neighbors_to_fetch = top_k + 1 
    print(f"DEBUG (get_recommendations): Demande de {num_neighbors_to_fetch} voisins à KNN (pour un top_k de {top_k}).")
    
    distances, indices = knn_model.kneighbors([target_product_row], n_neighbors=num_neighbors_to_fetch)
    
    # --- NOUVEAUX PRINTS DE DÉBOGAGE POUR LES VOISINS BRUTS ---
    actual_neighbor_ids_raw = [pivot_table.index[i] for i in indices[0]]
   
    unique_raw_neighbors = set(actual_neighbor_ids_raw)
   
    recommended_product_ids_after_target_exclusion = []
    # Loop starts from 1 to exclude the target product itself
    for i in range(1, len(indices[0])): 
        pid = pivot_table.index[indices[0][i]]
        recommended_product_ids_after_target_exclusion.append(pid)
    
  
    final_recommendations = []
    seen_names = set() 

    for pid in recommended_product_ids_after_target_exclusion:
        # Assurez-vous que pid a le bon type pour la recherche dans df_produits_map.index (déjà vérifié int64)
        pid_lookup = pid 
        
        if pid_lookup in df_produits_map.index:
            product_name = df_produits_map.loc[pid_lookup, 'produit_nom']
            if product_name not in seen_names:
                final_recommendations.append({'id': int(pid_lookup), 'name': product_name})
                seen_names.add(product_name)
            else:
                print(f"INFO (get_recommendations): ID {pid_lookup} ('{product_name}') a un nom DÉJÀ VU. Ignoré pour éviter les doublons.") 
        else:
            print(f"INFO (get_recommendations): Nom non trouvé pour l'ID : {pid_lookup} dans df_produits_map. Cette recommandation sera ignorée.")
    return final_recommendations