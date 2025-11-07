"use client";
import React, { useState } from "react";

export default function ProductForm({ onSubmit, initialData }: any) {
    const [form, setForm] = useState(
        initialData || {
            name: "",
            quantity: 0,
            expirationDate: "",
            restockDate: "",
            supplier: "",
            category: "",
        }
    );

    const handleChange = (e: any) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit(form);
            }}
            className="flex flex-col gap-4 p-6 max-w-md mx-auto bg-white rounded shadow"
        >
            <label className="flex flex-col gap-1 font-medium">
                Name
                <input
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
            </label>
            <label className="flex flex-col gap-1 font-medium">
                Quantity
                <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={form.quantity}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
            </label>
            <label className="flex flex-col gap-1 font-medium">
                Expiration Date
                <input
                    type="date"
                    name="expirationDate"
                    value={form.expirationDate}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
            </label>
            {form.quantity < 15 && (
                <>
                    <label className="flex flex-col gap-1 font-medium">
                        Restock Date
                        <input
                            type="date"
                            name="restockDate"
                            value={form.restockDate ?? ""}
                            onChange={handleChange}
                            className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                    </label>
                    <label className="flex flex-col gap-1 font-medium">
                        Supplier
                        <input
                            name="supplier"
                            placeholder="Supplier"
                            value={form.supplier ?? ""}
                            onChange={handleChange}
                            className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                    </label>
                </>
            )}
            <label className="flex flex-col gap-1 font-medium">
                Category
                <select
                    name="category"
                    value={form.category || ""}
                    onChange={handleChange}
                    required
                    className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                    <option value="">Select category</option>
                    <option value="Nutrition">Nutrition</option>
                    <option value="Sport">Sport</option>
                    <option value="Beaute">Beaute</option>
                    <option value="Hygiene">Hygiene</option>
                    <option value="Decoration">Decoration</option>
                </select>
            </label>
            <button
                type="submit"
                className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
                Save
            </button>
        </form>
    );
}
