import React, { useEffect, useState } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await fetch("http://localhost:5000/cart", {
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      const data = await response.json();
      setCartItems(data.products || []);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await fetch(`http://localhost:5000/cart/${productId}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      fetchCart(); // Refresh cart after removal
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Cart</h1>
      {cartItems.length > 0 ? (
        <ul className="w-full max-w-md bg-white rounded-lg shadow-md">
          {cartItems.map((item) => (
            <li
              key={item.productId._id}
              className="flex justify-between items-center p-4 border-b border-gray-300"
            >
              <div>
                <h2 className="text-xl font-semibold">{item.productId.name}</h2>
                <p className="text-gray-600">Price: {item.productId.price}</p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.productId._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <h2 className="text-xl text-gray-600">Your cart is empty</h2>
      )}
    </div>
  );
};

export default Cart;
