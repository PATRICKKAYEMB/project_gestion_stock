# Generated by Django 5.2.1 on 2025-05-19 08:32

import django.contrib.auth.models
import django.contrib.auth.validators
import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Categorie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Client',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('role', models.CharField(choices=[('admin', 'Administrateur'), ('gestionnaire', 'Gestionnaire')], max_length=20)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Produit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('prix', models.PositiveIntegerField()),
                ('date_ajout', models.DateField()),
                ('date_expiration', models.DateField()),
                ('quantite', models.IntegerField()),
                ('description', models.TextField()),
                ('image', models.ImageField(blank=True, null=True, upload_to='produits/')),
                ('qrcode', models.CharField(max_length=50)),
                ('categorie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Produits', to='stock.categorie')),
            ],
            options={
                'ordering': ['date_ajout'],
            },
        ),
        migrations.CreateModel(
            name='PerteProduit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantite', models.PositiveIntegerField()),
                ('date_perte', models.DateField()),
                ('description', models.TextField()),
                ('total', models.IntegerField()),
                ('produit', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Pertes', to='stock.produit')),
            ],
        ),
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type_alerte', models.TextField()),
                ('description', models.TextField()),
                ('date_alerte', models.DateField()),
                ('produit', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Notifications', to='stock.produit')),
            ],
        ),
        migrations.CreateModel(
            name='ApprovisionnerProduit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantite', models.PositiveIntegerField()),
                ('date_achat', models.DateField()),
                ('total', models.IntegerField()),
                ('produit', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='approvisionners', to='stock.produit')),
            ],
        ),
        migrations.CreateModel(
            name='VenteProduit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantite', models.PositiveIntegerField()),
                ('date_vente', models.DateField()),
                ('total', models.IntegerField()),
                ('client', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ventes', to='stock.client')),
                ('produit', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ventes', to='stock.produit')),
            ],
        ),
    ]
