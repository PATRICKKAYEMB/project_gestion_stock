from django.shortcuts import render,get_object_or_404
from django import views
from .serialisers import( UserSerializer,
                         ClientSerializer,
                         VenteProduitSerializer,
                         CategorieSerializer,
                         PerteProduitSerializer,
                         ProduitSerializer,
                         NotificationSerializer,
                         ApprovisionnerProduitSerializer,)

from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import User,PerteProduit,VenteProduit,Produit,Categorie,ApprovisionnerProduit,Client,Notification

# Create your views here.



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
        categories=Categorie.objects.all()
        serializer=CategorieSerializer(categories,many=True)

        return Response(serializer.data,status=status.HTTP_200_OK)
    
    elif request.method == "POST":

        serializer =CategorieSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response({"message":"erreur vérifier vos données"}, status=status.HTTP_400_BAD_REQUEST)

    

    elif request.method == "DELETE":
        categorie= get_object_or_404(Categorie,id=id_cat)
        categorie.delete()
        return Response({"message": "produit supprimé"}, status=status.HTTP_204_NO_CONTENT)
    
    elif request.method == "PUT":

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

        categorie_name =request.query_params.get("categorie")
        date_debut=request.query_params.get("date_debut")
        date_fin=request.query_params.get("date_fin")

        sort_by=request.query_params.get("sorte")

        produit=Produit.objects.all()

        if categorie_name:
            produit =produit.filter(categorie__name=categorie_name)
        if date_debut and date_fin:
            produit=produit.filter(date__range=[date_debut,date_fin])

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
        Achat =Achat.filter(date_perte__range=[date_debut,date_fin])
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
def venteProduit(request, id_prod):
    produit = get_object_or_404(Produit, id=id_prod)

    serializer = VenteProduitSerializer(data=request.data)
    if serializer.is_valid():
        quantite = serializer.validated_data["quantite"]
        client = serializer.validated_data["client"]
        date_vente=serializer.validated_data["date_vente"]

        if quantite > produit.quantite:
            return Response({"message": "La quantité demandée est supérieure au stock disponible"}, status=400)



        total = produit.prix * quantite
        vente = VenteProduit.objects.create(
            produit=produit,
            quantite=quantite,
            total=total,
            client=client,
            date_vente=date_vente
        )

        # Mets à jour le stock
        produit.quantite -= quantite
        produit.save()

        return Response({"vente_id": vente.id, "message": "Vente enregistrée avec succès"}, status=201)
    else:
        print(serializer.errors)  # <-- ici
        return Response(serializer.errors, status=400)
   




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
    return Response(serializer.errors, status=400)


@api_view(["GET"])
@permission_classes([IsAuthenticated])

def notification(request):
    notification=Notification.objects.all()
    serializer= NotificationSerializer(notification,many=True)
    return Response(serializer.data,status=status.HTTP_200_OK)


