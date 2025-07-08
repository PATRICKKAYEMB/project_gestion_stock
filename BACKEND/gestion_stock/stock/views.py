from django.shortcuts import render,get_object_or_404
from django.db.models.functions import TruncDay
from django import views
import uuid
from django.db import transaction
from django.db.models import Sum, F
from django.http import HttpResponse
from  .recommandation.recommandation_module import get_recommendations

import csv
from rest_framework_simplejwt.views import TokenObtainPairView
from .serialisers import( UserSerializer,
                         ClientSerializer,
                         VenteProduitSerializer,
                         MyTokenObtainPairSerializer,
                         CategorieSerializer,
                         PerteProduitSerializer,
                         ProduitSerializer,
                         RecommendedProductSerializer,
                         NotificationSerializer,
                         ApprovisionnerProduitSerializer,)

from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import User,PerteProduit,VenteProduit,Produit,Categorie,ApprovisionnerProduit,Client,Notification







class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(["GET"])
@permission_classes([IsAuthenticated])

def get_user(request):
    user= request.user
    return Response({"username":user.username})


### GESTION CATECORIE 
    

@api_view(["GET","POST","DELETE","PUT"])
@permission_classes([IsAuthenticated])

def categorie(request,id_cat=None):

    if request.method == "GET":
        if id_cat is not None:
            categorie= get_object_or_404(Categorie,id=id_cat)
            serializer= CategorieSerializer(categorie)

            return Response(serializer.data,status=status.HTTP_200_OK)
        
        categories=Categorie.objects.all()
        serializer=CategorieSerializer(categories,many=True)

        return Response(serializer.data,status=status.HTTP_200_OK)
    
    elif request.method == "POST":

        user= request.user.role

        if user != "admin":
            return Response({"message":"vous n'avez pas les droits pour créer une catégorie"}, status=status.HTTP_403_FORBIDDEN)

        serializer =CategorieSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        else:
          print(serializer.errors)
          return Response({"message":"erreur vérifier vos données"}, status=status.HTTP_400_BAD_REQUEST)

    

    elif request.method == "DELETE":

        user= request.user.role
        if user != "admin":
            return Response({"message":"vous n'avez pas les droits pour supprimer une catégorie"}, status=status.HTTP_403_FORBIDDEN)
        
        categorie= get_object_or_404(Categorie,id=id_cat)
        categorie.delete()
        return Response({"message": "produit supprimé"}, status=status.HTTP_204_NO_CONTENT)
    
    elif request.method == "PUT":
        user= request.user.role
        if user != "admin":
            return Response({"message":"vous n'avez pas les droits pour modifier une catégorie"}, status=status.HTTP_403_FORBIDDEN)

        categorie=get_object_or_404(Categorie,id=id_cat)

        serializer=CategorieSerializer(instance=categorie,data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        
        return Response({"message":"erreur vérifier vos données"}, status=status.HTTP_400_BAD_REQUEST)


    return Response({"message": "Méthode non autorisée"}, status=status.HTTP_400_BAD_REQUEST)




# GESTION PRODUIT



@api_view(["GET","POST","PUT","DELETE"])
@permission_classes([IsAuthenticated])

def produit(request,id_prod=None):

    if request.method == "GET":
        if id_prod is not None:
            produit = get_object_or_404(Produit,id=id_prod)
            serializer = ProduitSerializer(produit)
            return Response(serializer.data,status=status.HTTP_200_OK)

        categorie_name =request.query_params.get("categorie")
        date_debut=request.query_params.get("date_debut")
        date_fin=request.query_params.get("date_fin")
        name=request.query_params.get("name")

        sort_by=request.query_params.get("sorte")

        produit=Produit.objects.all()

        if categorie_name:
            produit =produit.filter(categorie__id=categorie_name)
        if date_debut and date_fin:
            produit=produit.filter(date__range=[date_debut,date_fin])

        if name:
            produit= produit.filter(name__icontains=name)
       
    

        if sort_by == "recent":
            produit =produit.order_by("-date_ajout")
        elif sort_by == "ancient":
            produit = produit .order_by("date_ajout")
        elif sort_by == "montant_desc":
            produit = produit.order_by("-total")
        elif sort_by == "montant_asc":
            produit =produit.order_by("total")

        serializer=ProduitSerializer(produit,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    


    elif request.method == "POST":
        serializer= ProduitSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        
        else:
            print(serializer.errors)
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == "DELETE":
        produit= get_object_or_404(Produit,id=id_prod)
        produit.delete()
        return Response({"message": "produit supprimé"}, status=status.HTTP_204_NO_CONTENT)

    elif request.method == "PUT":
        produit=get_object_or_404(Produit,id=id_prod)

        serializer = ProduitSerializer(instance=produit,data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response (serializer.data,status=status.HTTP_201_CREATED)

        else:
             print(serializer.errors)
             return Response({"message": "Méthode non autorisée"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def countProduit(request):
    count=Produit.objects.all().count()
    return Response({"count":count},status=status.HTTP_200_OK)

# GESTION COUNT 


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def countVente(request):
    count=VenteProduit.objects.all().count()
    return Response({"count":count},status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def countAchat(request):
    count=ApprovisionnerProduit.objects.all().count()
    return Response({"count":count},status=status.HTTP_200_OK)
        
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def countPerte(request):
    count=PerteProduit.objects.all().count()
    return Response({"count":count},status=status.HTTP_200_OK)

@api_view(["GET"])
@permission_classes([IsAuthenticated])

def countNotification(request):
    count =Notification.objects.all().count()
    return Response({"count":count},status=status.HTTP_200_OK)


# GESTION VENTES PRODUITS

@api_view(["GET"])
@permission_classes([IsAuthenticated])

def historiqueVente(request):

    date_debut= request.query_params.get("date_debut")
    date_fin=request.query_params.get("date_fin")
    categorie_nom=request.query_params.get("categorie")
    sort_by =request.query_params.get("sort")





    ventes=VenteProduit.objects.all()

    if date_debut and date_fin:
        
        ventes = ventes.filter(date_vente__range=[date_debut, date_fin])

    if categorie_nom:
        ventes = ventes.filter(produit__categorie__id=categorie_nom)


    if sort_by== "recent":
        ventes=ventes.order_by("-date_vente")
    if sort_by == "ancien":
        ventes = ventes.order_by("date_vente")
    if sort_by == "montant_desc":
        ventes= ventes.order_by("-total")
    if sort_by == "montant_asc":
        ventes =ventes.order_by("total")

    
    serializer=VenteProduitSerializer(ventes,many=True)

    
    return Response(serializer.data,status=status.HTTP_200_OK)






# GESTION ACHAT PRODUITS


@api_view(["GET"])
@permission_classes([IsAuthenticated])


def historiqueAchat(request):

    categorie_nom = request.query_params.get("categorie")
    date_debut=request.query_params.get("date_debut")
    date_fin=request.query_params.get("date_fin")
    sort_by=request.query_params.get("sort")


    Achat=ApprovisionnerProduit.objects.all()

    if categorie_nom :
        Achat =Achat.filter(produit__categorie__id=categorie_nom)
       

    if date_debut and date_fin:
        Achat =Achat.filter(date_achat__range=[date_debut,date_fin])
    if sort_by=="recent":
        Achat=Achat.order_by("-date_achat")
    if sort_by == "ancient":
        Achat =Achat.order_by("date_achat")
    if sort_by == "montant_desc":
        Achat =Achat.order_by("-total")
    if sort_by == "montant_asc":
        Achat =Achat.order_by("total")

    serializer=ApprovisionnerProduitSerializer(Achat,many=True)
    return Response(serializer.data,status=status.HTTP_200_OK)



# GESTION PERTES
@api_view(["GET"])
@permission_classes([IsAuthenticated])

def historiquePerte(request):
    categorie_nom=request.query_params.get("categorie")
    date_debut=request.query_params.get("date_debut")
    date_fin=request.query_params.get("date_fin")
    sort_by =request.query_params.get("sort")

    
    perte=PerteProduit.objects.all()

    if categorie_nom :
        perte =perte.filter(produit__categorie__id=categorie_nom)
       

    if date_debut and date_fin:
        perte =perte.filter(date_perte__range=[date_debut,date_fin])
    if sort_by=="recent":
        perte.order_by("-date_perte")
    if sort_by == "ancient":
        perte =perte.order_by("date_perte")
    if sort_by == "montant_desc":
        perte =perte.order_by("-total")
    if sort_by == "montant_asc":
        perte =perte.order_by("total")

    serializer=PerteProduitSerializer(perte,many=True)
    return Response(serializer.data,status=status.HTTP_200_OK)





@api_view(["POST"])
@permission_classes([IsAuthenticated])

def venteProduit(request):
    data = request.data
    print("Données reçues :", data)  # Ajout debug
    produits = data.get("produits", [])
    client_name = data.get("client")
    date_vente = data.get("date_vente")

    if not produits:
        return Response({"message": "Aucun produit fourni"}, status=400)

    if not client_name:
        return Response({"message": "Client manquant"}, status=400)

    client_obj, _ = Client.objects.get_or_create(name=client_name)

    transaction_id = str(uuid.uuid4())

    try:
        with transaction.atomic():
            for item in produits:
                prod_id = item.get("id")
                quantite = item.get("quantite")

                if not prod_id or not quantite:
                    return Response({"message": "Données produit invalides"}, status=400)

                produit = get_object_or_404(Produit, id=prod_id)

                if produit.quantite < quantite:
                    raise ValueError(f"Stock insuffisant pour le produit {produit.name}")

                total = produit.prix * quantite

                VenteProduit.objects.create(
                    produit=produit,
                    quantite=quantite,
                    total=total,
                    client=client_obj,
                    date_vente=date_vente,
                    transaction_id=transaction_id  
                )

                produit.quantite -= quantite
                produit.save()

        return Response({"message": "Vente enregistrée avec succès"}, status=201)

    except ValueError as e:
        return Response({"message": str(e)}, status=400)
 




@api_view(["POST"])
@permission_classes([IsAuthenticated])
def achatProduit(request,id_prod):
    produit =get_object_or_404(Produit,id=id_prod)

    serializer= ApprovisionnerProduitSerializer(data=request.data)

    if serializer.is_valid():
        quantite= serializer.validated_data["quantite"]
        date_achat= serializer.validated_data["date_achat"]
       
        total= quantite*produit.prix

        achat=ApprovisionnerProduit.objects.create(
            produit=produit,
            quantite=quantite,
            total=total,
            date_achat=date_achat,
           

        )
        # mise a jour du stock

        produit.quantite += quantite
        produit.save()
        return Response({"achat_id": achat.id, "message": "Achat enregistrée avec succès"}, status=201)
    
    else:
        print(serializer.errors)  
        return Response(serializer.errors, status=400)




@api_view(["POST"])
@permission_classes([IsAuthenticated])

def perteProduit(request,id_prod):
    produit=get_object_or_404(Produit,id=id_prod)

    serializer=PerteProduitSerializer(data=request.data)

    if serializer.is_valid():
        quantite= serializer.validated_data["quantite"]
        date_perte= serializer.validated_data["date_perte"]
        description =serializer.validated_data["description"]


        if quantite > produit.quantite:
                return Response({"message": "Quantité de perte supérieure au stock disponible"}, status=400)

        total = quantite * produit.prix
        perte= PerteProduit.objects.create(
            produit =produit,
            quantite =quantite,
            date_perte=date_perte,
            description =description,
            total =total

        )

        produit.quantite -= quantite
        produit.save()
        return Response({"perte_id": perte.id, "message": "Perte enregistrée avec succès"}, status=201)
    else:
        print(serializer.errors)
        return Response(serializer.errors, status=400)


@api_view(["GET"])
@permission_classes([IsAuthenticated])

def notification(request):
    notification=Notification.objects.all()
    serializer= NotificationSerializer(notification,many=True)
    return Response(serializer.data,status=status.HTTP_200_OK)





@api_view(['GET'])
def categorieVente(request):
    dateDebut = request.GET.get('dateDebut')
    dateFin = request.GET.get('dateFin')
    categories = request.GET.getlist('categories[]')  # liste ['Electro', 'Mode']

    ventes = VenteProduit.objects.all()

    if dateDebut and dateFin:
        ventes = ventes.filter(date_vente__range=[dateDebut, dateFin])

    if categories:
        ventes = ventes.filter(produit__categorie__name__in=categories)

    data = (
        ventes
        .values(name=F("produit__categorie__name"))
        .annotate(value=Sum("total"))
        .order_by("-value")
    )

    return Response(data)




@api_view(['GET'])
def ventes_par_jour(request):
    dateDebut = request.GET.get('dateDebut')
    dateFin = request.GET.get('dateFin')

    ventes = VenteProduit.objects.all()

    if dateDebut and dateFin:
        ventes = ventes.filter(date_vente__range=[dateDebut, dateFin])

    ventes_par_jour = (
        ventes.annotate(jour=TruncDay("date_vente"))
        .values("jour")
        .annotate(sales=Sum("total"))
        .order_by("jour")
    )

    data = [
        {"name": v["jour"].strftime("%d %b"), "sales": v["sales"]}
        for v in ventes_par_jour
    ]

    return Response(data)


# TELECHARGEMENT DES DONNNES EN CSV

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def download_story_vente(request):
    date_debut= request.query_params.get("date_debut")
    date_fin= request.query_params.get("date_fin")
    categorie=request.query_params.get("categorie")

    ventes=VenteProduit.objects.all()

    if date_debut and date_fin:
        ventes= ventes.filter(date_vente__range=[date_debut,date_fin])
    if categorie:
        ventes= ventes.filter(produit__categorie__id=categorie)
    response=HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="ventes.csv"'
    writer= csv.writer(response)
    writer.writerow(['trasaction_Id','produit_id','produit_nom','prix','categorie_id','categorie nom','quantite','date_vente'])
    for vente in ventes:
        writer.writerow([
            vente.transaction_id,
            vente.produit.id,
            vente.produit.name,
            vente.produit.prix,
            vente.produit.categorie.id,
            vente.produit.categorie.name    ,
            vente.quantite,
            vente.date_vente.strftime('%Y-%m-%d'),
        ])
    return response


@api_view(['GET']) # Indique que cette vue n'accepte que les requêtes GET
def get_product_recommandations_api(request, product_id):
    try:
        # --- CHOISISSEZ LA BONNE LIGNE ICI SELON LE TYPE DE L'INDEX DE VOTRE PIVOT_TABLE ---
        # Si votre pivot_table.index.dtype est 'int64' (entier) :
        product_id_for_model = int(product_id) 
        # Si votre pivot_table.index.dtype est 'object' (chaîne de caractères) :
        # product_id_for_model = str(product_id) 
        
    except ValueError:
        return Response({'error': 'ID de produit invalide.'}, status=status.HTTP_400_BAD_REQUEST)

    recommendations_data = get_recommendations(
        target_product_id=product_id_for_model, 
        top_k=5 
    )

    serializer = RecommendedProductSerializer(recommendations_data, many=True)
    
    return Response({'recommendations': serializer.data}, status=status.HTTP_200_OK)



