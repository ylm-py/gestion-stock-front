"use client";
import ProductForm from "../../components/ProductForm";
import { createProduct } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function CreateProductPage() {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    await createProduct(data);
    router.push("/products");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-3">Add New Product</h1>
      <ProductForm onSubmit={handleSubmit} />
    </div>
  );
}
