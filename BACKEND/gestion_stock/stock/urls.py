from django.urls import path
from .views import MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView


from .views import (get_product_recommandations_api,produit,creation_compte,get_categories,download_story_vente,countProduit,categorie,ventes_par_jour,categorieVente,countAchat,countPerte,countVente,historiqueAchat,
                    historiquePerte,get_produits,historiqueVente,AchatProduit,ReApprovisionnerProduit,perteProduit,notification,countNotification)


urlpatterns = [

    # GESTION PRODUIT
   path("produit/",produit,name="produit"),
   path("produit/<int:id_prod>/", produit, name="produit"),
   path("get_produit/",get_produits,name="get_produit"),
   path("get_produit/<int:id_prod>/",get_produits,name="get_produit"),

   #CLIENT
   path("creationClient/",creation_compte),

   # GESTION CATEGORIE

   path("categorie/", categorie, name="categorie"),
   path("categorie/<int:id_cat>/",categorie, name="categorie"),
   path("get_categorie/",get_categories,name="get_categorie"),
   path("get_categorie/<int:id_cat>/",get_categories,name="get_categorie"),


    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path("countProduit/",countProduit, name="countProduit"),
    path("countVente/",countVente, name="countVente"),
    path("countPerte/", countPerte, name="countPerte"),
    path("countAchat/",countAchat, name="countAchat"),


        #GESTION HISTORIQUE
    path("historiqueVente/",historiqueVente, name="historiqueVente"),
    path("historiqueAchat/", historiqueAchat, name="historiqueAchat"),
    path("historiquePerte/", historiquePerte, name="historiquePerte"),

      path("achatVente/", AchatProduit, name="venteProduit"),   
    path("reapprovisionner/<int:id_prod>/", ReApprovisionnerProduit, name="achatProduit"),
    path("perteProduit/<int:id_prod>/", perteProduit, name="perteProduit"),

    path("notification/",notification, name="notification"),
    path("countNotification/", countNotification, name="countNotification"),
    path("categorieVente/",categorieVente,name="categorieVente"),
    path("ventesMensuelles/", ventes_par_jour, name="ventes-par-mois"),
    path("download_story_ventes/", download_story_vente, name="download-story-ventes"),
    path("get_product_recommandations/<int:product_id>/", get_product_recommandations_api, name="get-product-recommendations"),
  
]