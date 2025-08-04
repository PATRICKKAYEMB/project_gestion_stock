@api_view(["POST"])
def initier_paiement_mobile_money(request):
    montant = request.data.get("montant")
    numero = request.data.get("numero")
    client_name = request.data.get("client")
    produits = request.data.get("produits", [])
    date_vente = request.data.get("date_vente")

    if not produits or not client_name:
        return Response({"message": "Client ou produits manquants"}, status=400)

    transaction_id = str(uuid.uuid4())

    # Init CinetPay
    client = Cinetpay(settings.CINETPAY_APIKEY, settings.CINETPAY_SITE_ID)

    payload = {
    "amount": montant,
    "currency": "CDF",
    "transaction_id": transaction_id,
    "description": "Paiement test via LocalTunnel",
    "return_url": "http://localhost:3000/retour",  # ton frontend local
    "notify_url": "https://cool-queens-itch.loca.lt/api/paiement/callback/",  # ← celle-ci est cruciale
    "customer_name": client_name,
    "customer_surname": "TEST"
}


    try:
        response = client.PaymentInitialization(payload)

        # Enregistre le paiement avec statut "en_attente"
        client_obj, _ = Client.objects.get_or_create(name=client_name)

        Paiement.objects.create(
            client=client_obj,
            montant=montant,
            mode_paiement="mobile_money",
            statut="en_attente",
            transaction_id=transaction_id
        )

        # Stocke les produits en session ou base temporaire si nécessaire

        if response.get("code") == "201":
            return Response({
                "status": "en_attente",
                "payment_url": response["data"]["payment_url"],
                "transaction_id": transaction_id
            })
        else:
            return Response({"message": "Erreur CinetPay", "detail": response}, status=400)

    except Exception as e:
        return Response({"message": "Erreur interne", "detail": str(e)}, status=500)


@api_view(["POST"])
@permission_classes([AllowAny])
def paiement_callback(request):
    transaction_id = request.data.get("transaction_id")
    statut_api = request.data.get("status")  # "ACCEPTED", "REFUSED", etc.

    try:
        paiement = Paiement.objects.get(transaction_id=transaction_id)

        if statut_api == "ACCEPTED":
            paiement.statut = "valide"
            paiement.save()

            client_obj = paiement.client
            total_global = 0

            # ⚠️ Tu dois retrouver les produits liés à cette vente (soit dans session, soit en DB)
            # Exemple : VenteTemporaire.objects.filter(transaction_id=transaction_id)

            vente_temp = VenteTemporaire.objects.filter(transaction_id=transaction_id)
            if not vente_temp.exists():
                return Response({"message": "Aucun produit associé à cette vente."}, status=400)

            for item in vente_temp:
                produit = item.produit
                quantite = item.quantite

                if produit.quantite < quantite:
                    return Response({"message": f"Stock insuffisant pour {produit.nom}"}, status=400)

                total = produit.prix * quantite
                total_global += total

                VenteProduit.objects.create(
                    produit=produit,
                    quantite=quantite,
                    total=total,
                    client=client_obj,
                    transaction_id=transaction_id
                )

                produit.quantite -= quantite
                produit.save()

            vente_temp.delete()  # Nettoyage

            return Response({"message": "Paiement confirmé, vente enregistrée."}, status=200)

        else:
            paiement.statut = "echoue"
            paiement.save()
            return Response({"message": "Paiement échoué."}, status=200)

    except Paiement.DoesNotExist:
        return Response({"message": "Transaction non reconnue"}, status=404)



https://api.lygosapp.com/
