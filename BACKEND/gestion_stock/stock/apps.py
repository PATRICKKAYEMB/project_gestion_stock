from django.apps import AppConfig
from .recommandation import recommandation_module
import os

class StockConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'stock'


     
    