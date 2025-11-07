"use client";
import { getProducts, deleteProduct } from "@/lib/api";
import ProductCard from "../components/ProductCard";
import { useState } from "react";

const categories = [
  { name: "All" },
  { name: "Nutrition" },
  { name: "Sport" },
  { name: "Beaute" },
  { name: "Hygiene" },
  { name: "Decoration" },
];

export default function ProductsPage() {
  const products1 = [
    { id: 1, name: "Protein Powder", expirationDate: "2024-12-31", quantity: 20, category: "Nutrition" },
    { id: 2, name: "Yoga Mat", expirationDate: "2026-01-15", quantity: 5, category: "Sport" },
    { id: 3, name: "Face Cream", expirationDate: "2023-11-20", quantity: 0, category: "Beaute" },
    { id: 4, name: "Shampoo", expirationDate: "2025-05-10", quantity: 30, category: "Hygiene" },
    { id: 5, name: "Candle Set", expirationDate: "2027-08-25", quantity: 12, category: "Decoration" },
  ];

  const [products, setProducts] = useState<any[]>(products1);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0].name);

  async function handleDelete(id: number) {
    await deleteProduct(id);
    setProducts(products.filter((p) => p.id !== id));
  }

  const filteredProducts = products.filter(
    selectedCategory === "All"
      ? () => true
      : (p) => p.category === selectedCategory
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <div className="mb-4">
        <label htmlFor="category" className="mr-2 font-semibold">Category:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          {categories.map((cat) => (
            <option key={cat.name} value={cat.name}>{cat.name}</option>
          ))}
        </select>
      </div>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      {filteredProducts.map((p: any) => (
        <ProductCard key={p.id} product={p} onDelete={handleDelete} />
      ))}
    </div>
  );
}
