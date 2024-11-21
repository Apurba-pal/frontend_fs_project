import { useState, useEffect } from "react";
import "./App.css";
import Nav from "./Components/Nav";
import { Routes, Route, useNavigate } from "react-router-dom";
// import Footer from "./Components/Footer";
import SignUp from "./Components/SignUp";
import PrivateComponent from "./Components/PrivateComponent";
import Login from "./Components/Login";
import AddProduct from "./Components/AddProduct";
import ProductList from "./Components/ProductList";
import UpdateProduct from "./Components/UpdateProduct";
import UserProductList from "./Components/UserProductList";
import Cart from "./Components/Cart";

function App() {
  const [userRole, setUserRole] = useState(null); // State to hold user role
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserRole(user.role);
      console.log(user.role); // Set the user role from local storage
      // Redirect based on role
      if (user.role === "user") {
        // navigate("/userproductlist"); // Redirect to UserProductList for users
      } else if (user.role === "admin") {
        console.log("hello");
        // navigate("/"); // Redirect to home for admins
      }
    }
  }, [navigate]);

  // Use userRole to conditionally render components or perform actions
  useEffect(() => {
    if (userRole) {
      // Example action based on userRole
      console.log(`User role is: ${userRole}`);
    }
  }, [userRole]);

  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route element={<PrivateComponent />}>
          <Route path="/" element={<ProductList />} />
          <Route path="/userproductlist" element={<UserProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/update/:id" element={<UpdateProduct />} />
          <Route path="/logout" element={<h1>logout component</h1>} />
          <Route path="/profile" element={<h1>profile component</h1>} />
        </Route>
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
