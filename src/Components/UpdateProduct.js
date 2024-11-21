import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      let result = await fetch(`http://localhost:5000/product/${params.id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const text = await result.text(); // Get the response as text
      console.log("from up product"); // Log the response for debugging
      result = JSON.parse(text); // Parse the text as JSON
      setName(result.name);
      setPrice(result.price);
      setCategory(result.category);
      setDescription(result.description);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const updateProduct = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      let result = await fetch(`http://localhost:5000/product/${params.id}`, {
        method: "PUT", // Ensure the method is uppercase
        body: JSON.stringify({ name, price, category, description }),
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`, // Include the token here
        },
      });

      const text = await result.text(); // Get the response as text
      console.log("Response:", text); // Log the response for debugging

      if (!result.ok) {
        throw new Error(`HTTP error! status: ${result.status}`);
      } else {
        console.log("hello");
      }

      result = JSON.parse(text); // Parse the text as JSON
      navigate("/");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Update Product</h1>
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
        <input
          type="text"
          placeholder="name"
          className="mb-4 p-2 border border-gray-300 rounded w-full"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <input
          type="text"
          placeholder="price"
          className="mb-4 p-2 border border-gray-300 rounded w-full"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />

        <input
          type="text"
          placeholder="category"
          className="mb-4 p-2 border border-gray-300 rounded w-full"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        />

        <input
          type="text"
          placeholder="company"
          className="mb-4 p-2 border border-gray-300 rounded w-full"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />

        <button
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          onClick={updateProduct}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default UpdateProduct;
