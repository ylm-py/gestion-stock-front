export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export async function getProducts() {
  const res = await fetch(`${API_URL}/products`, { cache: "no-store" });
  return res.json();
}

export async function getProduct(id: number) {
  const res = await fetch(`${API_URL}/products/${id}`);
  return res.json();
}

export async function createProduct(data: any) {
  const res = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateProduct(id: number, data: any) {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteProduct(id: number) {
  await fetch(`${API_URL}/products/${id}`, { method: "DELETE" });
}

export async function getCategories() {
  const res = await fetch(`${API_URL}/categories`);
  return res.json();
}

export async function getProductsByCategory(category: string) {
  const res = await fetch(`${API_URL}/products?category=${encodeURIComponent(category)}`);
  return res.json();
}

