import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const addProduct = async () => {
    try {
      // Form validation
      console.log("Hit Add Product");

      if (!name || !price || !category || !description) {
        setError(true);
        return false;
      }

      // Price validation
      if (isNaN(Number(price))) {
        alert("Price must be a number");
        return false;
      }

      setLoading(true);
      const userId = JSON.parse(localStorage.getItem("user"))._id;
      let result = await fetch("http://localhost:5000/add-product", {
        method: "POST",
        body: JSON.stringify({ name, price, category, description, userId }),
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();

      if (result) {
        setLoading(false);
        alert("Product added successfully");
        navigate("/"); // Navigate to product list
      }
    } catch (error) {
      setLoading(false);
      console.error("Error adding product:", error);
      alert("Error adding product. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Add Product</h1>
        <form>
          <input
            type="text"
            placeholder="Enter product name"
            className="inputbox mb-4 p-2 border border-gray-300 rounded w-full"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          {error && !name && (
            <span className="text-red-500 text-sm">Name is required *</span>
          )}

          <input
            type="text"
            placeholder="Enter product price"
            className="inputbox mb-4 p-2 border border-gray-300 rounded w-full"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          {error && !price && (
            <span className="text-red-500 text-sm">Price is required *</span>
          )}

          <input
            type="text"
            placeholder="Enter product category"
            className="inputbox mb-4 p-2 border border-gray-300 rounded w-full"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
          {error && !category && (
            <span className="text-red-500 text-sm">Category is required *</span>
          )}

          <input
            type="text"
            placeholder="Enter description"
            className="inputbox mb-4 p-2 border border-gray-300 rounded w-full"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          {error && !description && (
            <span className="text-red-500 text-sm">
              description name is required *
            </span>
          )}

          <button
            className="AppButton w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
            onClick={addProduct}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
