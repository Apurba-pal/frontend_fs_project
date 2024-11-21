import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const user = auth ? JSON.parse(auth) : null; // Parse user data if it exists

  // console.log(user);

  const logout = () => {
    localStorage.clear();
    navigate("/SignUp");
  };

  return (
    <nav className="bg-white shadow-md">
    <div className="container mx-auto flex justify-between items-center p-4">
      <img
        src="https://thumbs.dreamstime.com/b/vector-birdsdove-design-white-background-wild-animals-bird-logo-icon-easy-editable-layered-vector-illustration-vector-147458864.jpg"
        alt="logo"
        // className="logo"
        className="h-10 w-auto"
      />
      {user ? (
        <ul className="flex space-x-4">
          {user.role === "admin" && (
            <>
              <li>
                <Link to="/" className="text-blue-500 hover:text-blue-700">Product</Link>
              </li>
              <li>
                <Link to="/add" className="text-blue-500 hover:text-blue-700">Add Product</Link>
              </li>
              <li>{/* <Link to="/update">Update Product</Link> */}</li>
            </>
          )}
          {user.role === "user" && (
            <>
              <li>
                <Link to="/userproductlist" className="text-blue-500 hover:text-blue-700">User Product List</Link>
              </li>
              <li>
                <Link to="/cart" className="text-blue-500 hover:text-blue-700">cart</Link>
              </li>
            </>
          )}
          {/* <li><Link to="/profile">Profile</Link></li> */}
          <li>
            <Link onClick={logout} to="/SignUp" className="text-blue-500 hover:text-blue-700">
              Logout ({user.name})
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="flex space-x-4">
          <li>
            <Link to="/SignUp" className="text-blue-500 hover:text-blue-700">SignUp</Link>
          </li>
          <li>
            <Link to="/Login" className="text-blue-500 hover:text-blue-700">Login</Link>
          </li>
        </ul>
      )}
    </div>
    </nav>
  );
};

export default Nav;
