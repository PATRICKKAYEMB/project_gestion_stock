from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.mail import send_mail
from django.utils.timezone import now
from django.utils import timezone




# Create your models here.



class User(AbstractUser):
    ROLE_CHOICES = (
    ('admin', 'Administrateur'),
    ('gestionnaire', 'Gestionnaire'),
)

    role = models.CharField(max_length=20, choices=ROLE_CHOICES)




class Categorie(models.Model):
    name=models.CharField(max_length=50)
    image=models.ImageField( upload_to='produits/',blank=True,null=True)

    def __str__(self) :
        return self.name


class Produit (models.Model):
    name=models.CharField( max_length=50)
    categorie=models.ForeignKey(Categorie, related_name="Produits",on_delete=models.CASCADE)
    prix=models.PositiveIntegerField()
    date_ajout=models.DateField()
    quantite=models.IntegerField()
    description=models.TextField()
    image = models.ImageField(upload_to='produits/', blank=True, null=True)

    qrcode=models.CharField( max_length=50,blank=True,null=True)


    class Meta:

        ordering=["date_ajout"]

    def __str__(self):
        return self.name

    def status_quantite(self):
        if self.quantite ==0:  
            return "red"
        elif self.quantite <=10:
            return "yellow"  
        else:
            return "green"
        

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs) 

        # Alerte si la quantité est faible
        if self.quantite <= 10:
            Notification.objects.create(
                produit=self,
                type_alerte="Quantité faible", 
                description=f"Le produit {self.name} a une quantité faible ({self.quantite}).",
                date_alerte=now().date()
            )

            send_mail(
                subject="Alerte: Quantité faible",
                message=f"Attention, le produit {self.name} est presque épuisé (quantité: {self.quantite}).",
                from_email="ton_email@exemple.com",
                recipient_list=["admin@exemple.com"],
                fail_silently=True
            )

        # Alerte si la date d'expiration est proche (moins de 7 jours)
      
             
class Client(models.Model):
    name=models.CharField( max_length=50)

    def __str__(self):
        return self.name


class VenteProduit(models.Model):
    produit=models.ForeignKey(Produit,related_name="ventes", on_delete=models.CASCADE)
    client=models.ForeignKey(Client, related_name="ventes" , on_delete=models.CASCADE)
    quantite=models.PositiveIntegerField()
    date_vente = models.DateTimeField(default=timezone.now) 
    transaction_id = models.CharField(max_length=100, db_index=True)
    total=models.IntegerField(null=True,blank=True)

    def save(self,*args, **kwargs):
        self.total= self.produit.prix*self.quantite
        super().save(*args, **kwargs)

    



class ApprovisionnerProduit(models.Model):
    produit=models.ForeignKey(Produit,related_name="approvisionners", on_delete=models.CASCADE)
    quantite=models.PositiveIntegerField()
    date_achat=models.DateField()
    total=models.IntegerField(null=True,blank=True)

    def save (self,*args, **kwargs):
        self.total =self.produit.prix*self.quantite
        super().save(*args, **kwargs)



class PerteProduit(models.Model):
    produit=models.ForeignKey(Produit,related_name="Pertes", on_delete=models.CASCADE)
    quantite=models.PositiveIntegerField()
    date_perte=models.DateField()
    description=models.TextField()
    total=models.IntegerField(null=True,blank=True)


    def save (self,*args, **kwargs):
        self.total=self.produit.prix*self.quantite
        super().save(*args, **kwargs)
    

class Notification(models.Model):
    produit=models.ForeignKey(Produit,related_name="Notifications", on_delete=models.CASCADE)
    type_alerte=models.TextField()
    description=models.TextField()
    date_alerte=models.DateField()
