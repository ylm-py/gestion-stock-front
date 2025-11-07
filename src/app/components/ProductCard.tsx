"use client";
import { useState } from "react";

export default function ProductCard({ product, onDelete }: any) {
  const [restockDate, setRestockDate] = useState<string>("");
  const [supplier, setSupplier] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isRestocked, setIsRestocked] = useState<boolean>(false);

  const isOutOfStock = product.quantity === 0;
  const needsRestock = product.quantity < 15 && product.quantity > 0;

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 12);
  const maxDateStr = maxDate.toISOString().split("T")[0];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // ✅ Validation
    if (!restockDate) {
      setError("La date de réapprovisionnement est obligatoire.");
      return;
    }

    const selectedDate = new Date(restockDate);
    if (selectedDate > maxDate) {
      setError("La date doit être dans les 12 jours à partir d'aujourd'hui.");
      return;
    }

    if (!supplier.trim()) {
      setError("Le fournisseur est obligatoire.");
      return;
    }

    setError("");
    setIsRestocked(true);

    // Tu pourrais ici faire un PATCH vers ton API pour persister la modification
    // Exemple :
    // await updateProduct(product.id, { restockDate, supplier });
  }

  return (
    <div className="border rounded-lg p-4 mb-3 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-lg">{product.name}</h2>
        {/* <button
          onClick={() => onDelete(product.id)}
          className="text-sm text-red-600 hover:underline"
          disabled={isRestocked}
        >
          Delete
        </button> */}
      </div>

      <p><strong>Catégorie :</strong> {product.category}</p>
      <p><strong>Date d’expiration :</strong> {product.expirationDate}</p>
      <p><strong>Quantité :</strong> {product.quantity}</p>

      {isOutOfStock && (
        <p className="text-red-600 font-semibold mt-2">Non disponible</p>
      )}

      {needsRestock && !isRestocked && (
        <>
          <p className="text-yellow-600 font-semibold mt-2">
            Réapprovisionnement nécessaire
          </p>

          <form onSubmit={handleSubmit} className="mt-3 space-y-2">
            <div>
              <label className="block text-sm font-medium">
                Date de réapprovisionnement
              </label>
              <input
                type="date"
                value={restockDate}
                onChange={(e) => setRestockDate(e.target.value)}
                required
                min={today.toISOString().split("T")[0]}
                max={maxDateStr}
                className="border p-1 rounded w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Fournisseur</label>
              <input
                type="text"
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
                required
                placeholder="Nom du fournisseur"
                className="border p-1 rounded w-full"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
            >
              Confirmer
            </button>
          </form>
        </>
      )}

      {needsRestock && isRestocked && (
        <div className="mt-3 p-2 bg-gray-50 rounded border border-gray-200">
          <p className="text-green-700 font-semibold mb-1">
            Réapprovisionnement planifié ✅
          </p>
          <p><strong>Date prévue :</strong> {restockDate}</p>
          <p><strong>Fournisseur :</strong> {supplier}</p>
        </div>
      )}
    </div>
  );
}
