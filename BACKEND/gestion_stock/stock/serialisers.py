from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import (
    User,
    PerteProduit,
    Produit,
    VenteProduit,
    ApprovisionnerProduit,
    Notification,
    Categorie,
    Client
)
from django.contrib.auth import get_user_model


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = get_user_model()
        fields =["id","username","password","role"]

        extra_kwargs={
            "password":{"write_only":True}
        }

class  MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self,attrs):

        data = super().validate(attrs)

        data["user"]= {
            "id":self.user.id,
            "username":self.user.username,
            "role":self.user.role
           
        }

        return data

class CategorieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categorie
        fields = "__all__"


class ProduitSerializer(serializers.ModelSerializer):
    categorie = serializers.PrimaryKeyRelatedField(queryset=Categorie.objects.all())
    categorie_name = serializers.SerializerMethodField()

    status = serializers.SerializerMethodField()

    class Meta:
        model = Produit
        fields = "__all__"

    def get_status(self, obj):
        return obj.status_quantite()

    def get_categorie_name(self, obj):
       
        return obj.categorie.name  


class PerteProduitSerializer(serializers.ModelSerializer):
    produit_nom = serializers.CharField(source="produit.name", read_only=True)
    prix_produit = serializers.IntegerField(source="produit.prix", read_only=True)
    

    class Meta:
        model = PerteProduit
        fields = ['id', 'produit_nom', 'prix_produit', 'quantite', 'date_perte',"description", 'total']


class VenteProduitSerializer(serializers.ModelSerializer):
    # Accepte un nom (chaîne) lors de l'écriture (POST/PUT)
    client_name = serializers.CharField(write_only=True, source='client') 
    # Affiche le nom (ou l'ID) lors de la lecture (GET)
    client = serializers.StringRelatedField(read_only=True) # Affiche le nom du client

    produit_nom = serializers.CharField(source="produit.name", read_only=True)
    prix_produit = serializers.IntegerField(source="produit.prix", read_only=True)

    class Meta:
        model = VenteProduit
        # Inclure 'client_name' pour l'écriture et 'client' pour la lecture
        fields = ['id', 'client', 'client_name', 'produit_nom', 'prix_produit', 'quantite', 'date_vente', 'total']
        # S'assurer que 'client' n'est pas attendu en écriture
        read_only_fields = ['id', 'total', 'produit_nom', 'prix_produit', 'client']

    


class ApprovisionnerProduitSerializer(serializers.ModelSerializer):
    client = serializers.StringRelatedField(read_only=True)
    produit_nom = serializers.CharField(source="produit.name", read_only=True)
    prix_produit = serializers.IntegerField(source="produit.prix", read_only=True)

    class Meta:
        model = ApprovisionnerProduit
        fields = ['id', 'client', 'produit_nom', 'prix_produit', 'quantite', 'date_achat', 'total']


class NotificationSerializer(serializers.ModelSerializer):
    produit = serializers.StringRelatedField()

    class Meta:
        model = Notification
        fields = "__all__"


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = "__all__"

class RecommendedProductSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    prix = serializers.FloatField()      # 👈 Ajouté
    image = serializers.CharField() 