# Generated by Django 5.2.1 on 2025-05-20 10:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stock', '0002_categorie_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='produit',
            name='qrcode',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
