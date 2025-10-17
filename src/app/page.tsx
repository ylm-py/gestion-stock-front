"use client";
import { useState, useEffect } from "react";


const fetchCategories = () => {
  const baseURL = 'http://localhost:8000/api/category/';
  return fetch(baseURL, { cache: 'no-store' })
    .then((res) => res.json())
    .then((data) => data);

}

export default function Home() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetchCategories().then((data) => setCategories(data));
  }, []);


  
  return (
    <main className="container mx-auto p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-center">Categories</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Name</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category: any) => (
              <tr key={category.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b text-center">{category.id}</td>
                <td className="py-2 px-4 border-b">{category.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}