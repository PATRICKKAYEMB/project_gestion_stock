from rest_framework import serializers
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
from django.contrib.auth import get_user_model,authenticate


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = get_user_model()
        fields =["id","username","password","role"]

        extra_kwargs={
            "password":{"write_only":True}
        }


class CategorieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categorie
        fields = "__all__"


class ProduitSerializer(serializers.ModelSerializer):
    categorie = serializers.StringRelatedField()
    status = serializers.SerializerMethodField()

    class Meta:
        model = Produit
        fields = "__all__"

    def get_status(self, obj):
        return obj.status_quantite()


class PerteProduitSerializer(serializers.ModelSerializer):
    produit = serializers.StringRelatedField()

    class Meta:
        model = PerteProduit
        fields = "__all__"


class VenteProduitSerializer(serializers.ModelSerializer):
    produit = serializers.PrimaryKeyRelatedField(read_only=True)
    client = serializers.PrimaryKeyRelatedField(queryset=Client.objects.all())

    class Meta:
        model = VenteProduit
        fields = "__all__"

    


class ApprovisionnerProduitSerializer(serializers.ModelSerializer):
    produit = serializers.StringRelatedField()

    class Meta:
        model = ApprovisionnerProduit
        fields = "__all__"


class NotificationSerializer(serializers.ModelSerializer):
    produit = serializers.StringRelatedField()

    class Meta:
        model = Notification
        fields = "__all__"


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = "__all__"
