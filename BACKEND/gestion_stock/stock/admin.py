
from django.contrib import admin
from  django.contrib.auth.admin import UserAdmin
from .models import User,Produit,VenteProduit,PerteProduit,ApprovisionnerProduit,Client,Notification,Categorie
from django.utils.translation import gettext_lazy as _

# Register your models here.
class CustomUserAdmin(UserAdmin):
    list_display = ("username","role")
    
    fieldsets = (
        (None, {"fields": ("username", "password")}),
        (_("Personal info"), {"fields": ("role",)}),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
        (_("Important dates"), {"fields": ("last_login", "date_joined")}),
    )

    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {
            'fields': ("role",),
        }),
    )

admin.site.register(User,CustomUserAdmin)


admin.site.register(Produit)
admin.site.register(VenteProduit)
admin.site.register(PerteProduit)
admin.site.register(ApprovisionnerProduit)
admin.site.register(Notification)
admin.site.register(Client)
admin.site.register(Categorie)

