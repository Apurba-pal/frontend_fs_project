import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, [navigate]);

  const collectData = async () => {
    console.log(name, role, email, password);
    let result = await fetch("http://localhost:5000/register", {
      method: "post",
      body: JSON.stringify({ name, role, email, password }),
      headers: {
        "Content-type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);

    //   navigate("/");
    //   localStorage.setItem("user", JSON.stringify(result.result));
    //   localStorage.setItem("token", JSON.stringify(result.auth));
    //        console.log("Token stored:", result.auth); // Log the token

    // };

    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.result));
      localStorage.setItem("token", JSON.stringify(result.auth));
      console.log("Token stored:", result.auth); // Log the token

      // Check the role and navigate accordingly
      if (result.result.role === "admin") {
        navigate("/"); // Navigate to home page for admin
      } else if (result.result.role === "user") {
        navigate("/userproductlist"); // Navigate to product list for user
      }
    } else {
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        <input
          className="inputbox mb-4 p-2 border border-gray-300 rounded w-full"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="enter name"
        />
        <input
          className="inputbox mb-4 p-2 border border-gray-300 rounded w-full"
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="enter role"
        />
        <input
          className="inputbox mb-4 p-2 border border-gray-300 rounded w-full"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="enter email"
        />
        <input
          className="inputbox mb-4 p-2 border border-gray-300 rounded w-full"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="enter password"
        />
        <button
          className="AppButton w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          onClick={collectData}
          type="button"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignUp;
