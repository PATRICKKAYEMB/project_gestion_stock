from django.urls import path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import (get_user,produit,categorie,countAchat,countPerte,countVente,historiqueAchat,
                    historiquePerte,historiqueVente,venteProduit,achatProduit,perteProduit,notification,countNotification)


urlpatterns = [

    # GESTION PRODUIT
   path("produit/",produit,name="produit"),
   path("produit/<int:id_prod>/", produit, name="produit"),

   # GESTION CATEGORIE

   path("categorie/", categorie, name="categorie"),
   path("categorie/<int:id_cat>/",categorie, name="categorie"),


    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path("countProduit/",countVente, name="countProduit"),
    path("countVente/",countVente, name="countVente"),
    path("countPerte/", countPerte, name="countPerte"),
    path("countAchat/",countAchat, name="countAchat"),

        #GESTION HISTORIQUE
    path("historiqueVente/",historiqueVente, name="historiqueVente"),
    path("historiqueAchat/", historiqueAchat, name="historiqueAchat"),
    path("historiquePerte/", historiquePerte, name="historiquePerte"),

    path("venteProduit/<int:id_prod>/", venteProduit, name="venteProduit"),
    path("achatProduit/<int:id_prod>/", achatProduit, name="achatProduit"),
    path("perteProduit/<int:id_prod>/", perteProduit, name="perteProduit"),

    path("notification/",notification, name="notification"),
    path("countNotification/", countNotification, name="countNotification")
  
]