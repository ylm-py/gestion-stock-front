"use client";
import { useState } from "react";

export default function ProductCard({ product, onDelete }: any) {
  const [error, setError] = useState<string>("");

  const isOutOfStock = product.quantity === 0;
  const needsRestock = product.quantity < 15 && product.quantity >= 0;
  const isRestockPlanned = product.restockDate !== null && product.restockDate !== "";

  const hasRestockPlanned =
    product.restock_date !== null &&
    product.restock_date !== "" &&
    product.restock_date !== undefined;

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 12);
  const maxDateStr = maxDate.toISOString().split("T")[0];

  return (
    <div className="border rounded-lg p-4 mb-3 shadow-sm bg-white">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-lg">{product.name}</h2>
        {/* 
        <button
          onClick={() => onDelete(product.id)}
          className="text-sm text-red-600 hover:underline"
        >
          Delete
        </button>
        */}
      </div>

      <p>
        <strong>Catégorie :</strong> {product.category}
      </p>
      <p>
        <strong>Date d’expiration :</strong> {product.expiration_date}
      </p>
      <p>
        <strong>Quantité :</strong> {product.quantity}
      </p>
      <p>
        <strong>Fournisseur :</strong> {product.supplier || "Inconnu"}
      </p>

      {/* 🟥 Produit non disponible */}
      {isOutOfStock && (
        <p className="text-red-600 font-semibold mt-2">Non disponible</p>
      )}

        {/* 🟧 Produit à réapprovisionner */ }
        {needsRestock && !isRestockPlanned && (
            <p className="text-orange-600 font-semibold mt-2">
                À réapprovisionner
            </p>
            )}
        {/* 🟩 Réapprovisionnement prévu */ }
        {isRestockPlanned && (
            <div className="text-green-700 font-medium mt-2">
                ✅ Réapprovisionnement prévu le{" "}
                <span className="font-semibold">
                    {new Date(product.restockDate).toLocaleDateString()}
                </span>
                <p className="font-semibold">
                    {product.quantityReaprov} unités
                </p>
            </div>
        )}
    </div>
  );
}
