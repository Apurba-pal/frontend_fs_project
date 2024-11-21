import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  const handleLogin = async () => {
    console.log(email, password);
    let result = await fetch("http://localhost:5000/login", {
      method: "POST",
      body: JSON.stringify({ email, role, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));
      console.log("token stored:", result.auth);
      //     navigate("/")
      //   }else{
      //     alert("enter valid details")
      //   }
      // };

      if (result.user.role === "admin") {
        navigate("/"); // Navigate to admin page
      } else if (result.user.role === "user") {
        navigate("/userproductlist"); // Navigate to user page
      }
    } else {
      alert("Enter valid details");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <input
          className="inputbox mb-4 p-2 border border-gray-300 rounded w-full"
          type="text"
          placeholder="enter email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          className="inputbox mb-4 p-2 border border-gray-300 rounded w-full"
          type="text"
          placeholder="enter role"
          onChange={(e) => setRole(e.target.value)}
          value={role}
        />
        <input
          className="inputbox mb-4 p-2 border border-gray-300 rounded w-full"
          type="password"
          placeholder="enter password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button
          className="AppButton w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          onClick={handleLogin}
          type="button"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
