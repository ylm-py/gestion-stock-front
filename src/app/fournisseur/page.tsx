"use client";
import { useState, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  expiration_date: string;
  quantity: number;
  restockDate: string | null;
  supplier: string;
  category: string;
  quantityReaprov: number | null;
}

interface Supplier {
  name: string;
  category: string;
  products: Product[];
}

export default function EspaceFournisseur() {
  const [products, setProducts] = useState<Product[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<number | null>(null);

  const today = new Date().toISOString().split("T")[0];

  // 🧩 Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/products", {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to load products");
        const data = await res.json();
        setProducts(data);

        // Grouper par fournisseur
        const grouped = data.reduce((acc: Record<string, Supplier>, prod: Product) => {
          if (!prod.supplier) return acc;
          if (!acc[prod.supplier]) {
            acc[prod.supplier] = {
              name: prod.supplier,
              category: prod.category,
              products: [],
            };
          }
          acc[prod.supplier].products.push(prod);
          return acc;
        }, {});
        setSuppliers(Object.values(grouped));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const supplierSelected = suppliers.find(
    (s) => s.name === selectedSupplier
  );

  // 🧩 PATCH - Mise à jour du produit
  const handleRestock = async (productId: number, newStock: number, restockDate: string) => {
    if (isNaN(newStock) || newStock < 5 || newStock > 30) {
      alert("⚠️ Le stock doit être compris entre 5 et 30 unités.");
      return;
    }
    if (!restockDate) {
      alert("⚠️ Veuillez indiquer une date approximative de réapprovisionnement.");
      return;
    }
    if (new Date(restockDate) < new Date(today)) {
      alert("⚠️ La date ne peut pas être antérieure à aujourd'hui.");
      return;
    }

    try {
      setUpdating(productId);

      const res = await fetch(`http://localhost:8000/api/products/${productId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          restockDate: restockDate,
          quantityReaprov: newStock,
        }),
      });

      if (!res.ok) {
        throw new Error("Erreur lors de la mise à jour du produit");
      }

      const updatedProduct = await res.json();

      // ✅ Met à jour localement l’état du produit
      setProducts((prev) =>
        prev.map((p) => (p.id === productId ? updatedProduct : p))
      );

      // ✅ Met à jour aussi les fournisseurs
      setSuppliers((prev) =>
        prev.map((s) => ({
          ...s,
          products: s.products.map((p) =>
            p.id === productId ? updatedProduct : p
          ),
        }))
      );

      alert("✅ Réapprovisionnement enregistré avec succès !");
    } catch (error) {
      console.error(error);
      alert("❌ Une erreur est survenue pendant la mise à jour.");
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return (
      <main className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-500">Chargement des fournisseurs...</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8 uppercase tracking-wide">
        Espace Fournisseur
      </h1>

      {/* Sélecteur fournisseur */}
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
                  value={selectedSupplier}
                  onChange={(e) => setSelectedSupplier(e.target.value)}
                  className="border border-gray-300 rounded px-4 py-2 w-64 focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">-- Sélectionner un fournisseur --</option>
                  {suppliers.map((s) => (
                    <option key={s.name} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Tableau produits */}
      {supplierSelected && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
            Catégorie :{" "}
            <span className="text-blue-600">{supplierSelected.category}</span>
          </h2>

          <table className="min-w-full border border-gray-200 text-center">
            <thead className="bg-blue-600 text-white uppercase text-sm">
              <tr>
                <th className="py-3 px-4 border-r">Produit</th>
                <th className="py-3 px-4 border-r">Stock</th>
                <th className="py-3 px-4">Réapprovisionnement</th>
              </tr>
            </thead>
            <tbody>
              {supplierSelected.products.map((p) => {
                const isLowStock = p.quantity < 15;
                const restockPlanned = p.restockDate !== null;

                return (
                  <tr key={p.id} className="hover:bg-blue-50">
                    <td className="py-3 px-4 border-t border-gray-200">
                      {p.name}
                    </td>
                    <td className="py-3 px-4 border-t border-gray-200 font-semibold">
                      <span
                        className={`${
                          isLowStock ? "text-red-600" : "text-green-600"
                        }`}
                      >
                        {p.quantity} unités
                      </span>
                    </td>
                    <td className="py-3 px-4 border-t border-gray-200">
                      {restockPlanned ? (
                        <div className="text-green-700 font-medium">
                          ✅ Réapprovisionnement prévu le{" "}
                          <span className="font-semibold">
                            {new Date(p.restockDate!).toLocaleDateString()}
                          </span>
                          <p className="font-semibold">
                            {p.quantityReaprov} unités
                          </p>
                        </div>
                      ) : isLowStock ? (
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
                            disabled={updating === p.id}
                            className={`${
                              updating === p.id
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                            } text-white px-3 py-1 rounded`}
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
                              handleRestock(p.id, stockValue, dateValue);
                            }}
                          >
                            {updating === p.id ? "Mise à jour..." : "Valider"}
                          </button>
                        </div>
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
