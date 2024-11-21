import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [userRole, setUserRole] = useState(""); // New state for user role

  useEffect(() => {
    getProducts();
    setUserRole(JSON.parse(localStorage.getItem("user")));
  }, []);

  console.log(userRole.role);
  const getProducts = async () => {
    try {
      let result = await fetch("http://localhost:5000/products", {
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      if (result.error) {
        console.error(result.error);
        return;
      }
      console.log(result);
      setProducts(result);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      let result = await fetch(`http://localhost:5000/product/${id}`, {
        method: "Delete",
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      if (result) {
        getProducts();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const searchHandle = async (event) => {
    let key = event.target.value;
    try {
      if (key) {
        let result = await fetch(`http://localhost:5000/search/${key}`, {
          headers: {
            authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        });
        result = await result.json();
        if (result) {
          setProducts(result);
        }
      } else {
        getProducts();
      }
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  const addToCart = async (id) => {
    console.log("you are in cart");
    try {
      await fetch("http://localhost:5000/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        body: JSON.stringify({ productId: id }),
      });
      console.log("Product added to cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Product List</h1>
      <input
        type="text"
        placeholder="Search Product"
        className="mb-4 p-2 border border-gray-300 rounded w-full max-w-md"
        onChange={searchHandle}
      />

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md p-4"
            >
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600">Price: {product.price}</p>
              <p className="text-gray-600">Category: {product.category}</p>
              <p className="text-gray-600">
                Description: {product.description}
              </p>
              {userRole.role === "user" ? (
                <div className="mt-4">
                  <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition mr-2">buy</button>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    onClick={() => addToCart(product._id)}
                  >
                    Add to cart
                  </button>
                </div>
              ) : (
                    <div className="mt-4">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition mr-2"
                    onClick={() => deleteProduct(product._id)}
                  >
                    Delete
                  </button>
                  <button>
                    <Link
                      to={`/update/${product._id}`}
                      className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                      style={{ textDecoration: "none" }}
                    >
                      Update
                    </Link>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <h1 className="text-xl text-gray-600">No results found</h1>
      )}
    </div>
  );
};

export default ProductList;
