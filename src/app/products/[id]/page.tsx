"use client";
import { getProduct, updateProduct } from "@/lib/api";
import ProductForm from "../../components/ProductForm";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const id = Number(params.id);
    if (!isNaN(id)) {
      getProduct(id).then(setProduct);
    }
  }, [params.id]);

  const handleSubmit = async (data: any) => {
    await updateProduct(Number(params.id), data);
    router.push("/products");
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-3">Edit Product</h1>
      <ProductForm onSubmit={handleSubmit} initialData={product} />
    </div>
  );
}
