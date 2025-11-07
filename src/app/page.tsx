"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // ✅ Pour la navigation dynamique

const fetchCategories = async () => {
  const baseURL = "http://localhost:8000/api/category/";
  const res = await fetch(baseURL, { cache: "no-store" });
  if (!res.ok) throw new Error("Erreur lors du chargement des catégories");
  return res.json();
};

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // ✅ Hook pour rediriger

  useEffect(() => {
    fetchCategories()
      .then((data) => setCategories(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleCategoryClick = (id: number) => {
    // ✅ Redirige vers une page spécifique à la catégorie
    router.push(`/categories/${id}`);
  };

  if (loading) {
    return (
      <main className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-500">Chargement des catégories...</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-700 uppercase tracking-wide">
        Liste des Catégories
      </h1>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full bg-white border border-gray-200 text-center">
          <thead className="bg-blue-600 text-white uppercase text-sm tracking-wider">
            <tr>
              <th className="py-3 px-4 border-r border-gray-300">
                Numéro de Catégorie
              </th>
              <th className="py-3 px-4">Nom Catégorie</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => (
              <tr
                key={category.id}
                onClick={() => handleCategoryClick(category.id)} // ✅ Clique actif
                className="hover:bg-blue-50 transition duration-200 cursor-pointer" // ✅ Curseur + hover
              >
                <td className="py-3 px-4 border-t border-gray-200 text-gray-800 font-medium">
                  {category.id}
                </td>
                <td
                  className="py-3 px-4 border-t border-gray-200 text-blue-600 font-semibold hover:underline hover:text-blue-800"
                >
                  {category.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
