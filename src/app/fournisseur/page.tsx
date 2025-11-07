"use client";
import { useState } from "react";

export default function EspaceFournisseur() {
  const [selectedFournisseur, setSelectedFournisseur] = useState("");
  const [pendingRequests, setPendingRequests] = useState<
    {
      fournisseurId: number;
      produitId: number;
      newStock: number;
      date: string;
    }[]
  >([]);

  // 📅 Date du jour au format YYYY-MM-DD
  const today = new Date().toISOString().split("T")[0];

  const fournisseurs = [
    {
      id: 1,
      name: "Fournisseur 1",
      categorie: "Nutrition",
      produits: [
        { id: 1, nom: "Viande rouge", stock: 12 },
        { id: 2, nom: "Pomme", stock: 6 },
        { id: 3, nom: "Pain complet", stock: 22 },
        { id: 4, nom: "Lait", stock: 4 },
        { id: 5, nom: "Yaourt", stock: 18 },
      ],
    },
    {
      id: 2,
      name: "Fournisseur 2",
      categorie: "Sport",
      produits: [
        { id: 1, nom: "Ballon", stock: 10 },
        { id: 2, nom: "Chaussures", stock: 30 },
        { id: 3, nom: "Haltères", stock: 8 },
        { id: 4, nom: "Gants", stock: 20 },
        { id: 5, nom: "Tapis", stock: 5 },
      ],
    },
    {
      id: 3,
      name: "Fournisseur 3",
      categorie: "Beauté",
      produits: [
        { id: 1, nom: "Crème", stock: 14 },
        { id: 2, nom: "Shampoing", stock: 18 },
        { id: 3, nom: "Savon", stock: 3 },
        { id: 4, nom: "Parfum", stock: 25 },
        { id: 5, nom: "Lotion", stock: 11 },
      ],
    },
    {
      id: 4,
      name: "Fournisseur 4",
      categorie: "Hygiène",
      produits: [
        { id: 1, nom: "Dentifrice", stock: 16 },
        { id: 2, nom: "Gel douche", stock: 12 },
        { id: 3, nom: "Mouchoirs", stock: 9 },
        { id: 4, nom: "Déodorant", stock: 22 },
        { id: 5, nom: "Cotons", stock: 4 },
      ],
    },
    {
      id: 5,
      name: "Fournisseur 5",
      categorie: "Décoration",
      produits: [
        { id: 1, nom: "Vase", stock: 8 },
        { id: 2, nom: "Cadre", stock: 17 },
        { id: 3, nom: "Lampe", stock: 5 },
        { id: 4, nom: "Tableau", stock: 10 },
        { id: 5, nom: "Bougie", stock: 19 },
      ],
    },
  ];

  const fournisseurSelectionne = fournisseurs.find(
    (f) => f.name === selectedFournisseur
  );

  const handleStockRequest = (
    fournisseurId: number,
    produitId: number,
    newStock: number,
    date: string
  ) => {
    if (isNaN(newStock) || newStock < 5 || newStock > 30)
      return alert("⚠️ Le stock doit être compris entre 5 et 30 unités.");
    if (!date) return alert("⚠️ Veuillez indiquer une date approximative de réapprovisionnement.");
    if (new Date(date) < new Date(today))
      return alert("⚠️ La date ne peut pas être antérieure à aujourd'hui.");

    setPendingRequests((prev) => [
      ...prev,
      { fournisseurId, produitId, newStock, date },
    ]);
  };

  const isPending = (fournisseurId: number, produitId: number) =>
    pendingRequests.some(
      (req) =>
        req.fournisseurId === fournisseurId && req.produitId === produitId
    );

  const getPendingRequest = (fournisseurId: number, produitId: number) =>
    pendingRequests.find(
      (req) =>
        req.fournisseurId === fournisseurId && req.produitId === produitId
    );

  return (
    <main className="container mx-auto p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8 uppercase tracking-wide">
        Espace Fournisseur
      </h1>

      {/* Sélecteur de fournisseur */}
      <div className="overflow-x-auto rounded-lg shadow-md mb-8">
        <table className="min-w-full bg-white border border-gray-200 text-center">
          <thead className="bg-blue-600 text-white uppercase text-sm">
            <tr>
              <th className="py-3 px-4">Nom du Fournisseur</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-4 px-4 border-t border-gray-200">
                <select
                  value={selectedFournisseur}
                  onChange={(e) => setSelectedFournisseur(e.target.value)}
                  className="border border-gray-300 rounded px-4 py-2 w-64 focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">-- Sélectionner un fournisseur --</option>
                  {fournisseurs.map((f) => (
                    <option key={f.id} value={f.name}>
                      {f.name}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Tableau produits */}
      {fournisseurSelectionne && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
            Catégorie :{" "}
            <span className="text-blue-600">
              {fournisseurSelectionne.categorie}
            </span>
          </h2>

          <table className="min-w-full border border-gray-200 text-center">
            <thead className="bg-blue-600 text-white uppercase text-sm">
              <tr>
                <th className="py-3 px-4 border-r">Produit</th>
                <th className="py-3 px-4 border-r">Stock disponible</th>
                <th className="py-3 px-4">Réapprovisionnement</th>
              </tr>
            </thead>
            <tbody>
              {fournisseurSelectionne.produits.map((p) => {
                const pending = getPendingRequest(
                  fournisseurSelectionne.id,
                  p.id
                );

                return (
                  <tr key={p.id} className="hover:bg-blue-50">
                    <td className="py-3 px-4 border-t border-gray-200">
                      {p.nom}
                    </td>
                    <td className="py-3 px-4 border-t border-gray-200 font-semibold">
                      <span
                        className={`${
                          p.stock < 15 ? "text-red-600" : "text-green-600"
                        }`}
                      >
                        {p.stock} unités
                      </span>
                      {p.stock < 15 && (
                        <p className="text-red-600 text-sm mt-1">
                          Produit indisponible
                        </p>
                      )}
                    </td>
                    <td className="py-3 px-4 border-t border-gray-200">
                      {p.stock < 15 ? (
                        pending ? (
                          <div className="text-yellow-600 font-medium">
                            🕓 Demande en attente de confirmation par le client
                            <br />
                            📅 Réapprovisionnement prévu le :{" "}
                            <span className="font-semibold text-gray-800">
                              {pending.date}
                            </span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-2">
                            <input
                              type="number"
                              min="5"
                              max="30"
                              placeholder="5 à 30 unités"
                              className="border border-gray-300 rounded px-2 py-1 w-36 text-center focus:ring-2 focus:ring-blue-400"
                              id={`stock-${p.id}`}
                            />
                            <input
                              type="date"
                              min={today}
                              className="border border-gray-300 rounded px-2 py-1 w-44 text-center focus:ring-2 focus:ring-blue-400"
                              id={`date-${p.id}`}
                            />
                            <button
                              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                              onClick={() => {
                                const stockValue = parseInt(
                                  (
                                    document.getElementById(
                                      `stock-${p.id}`
                                    ) as HTMLInputElement
                                  ).value
                                );
                                const dateValue = (
                                  document.getElementById(
                                    `date-${p.id}`
                                  ) as HTMLInputElement
                                ).value;
                                handleStockRequest(
                                  fournisseurSelectionne.id,
                                  p.id,
                                  stockValue,
                                  dateValue
                                );
                              }}
                            >
                              Valider
                            </button>
                          </div>
                        )
                      ) : (
                        <span className="text-gray-400 italic">Stock OK</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
