import React, { Fragment, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  const [user, setUser] = React.useState(null);
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };
  return (
    <div className="text-center my-3">
      <NavLink className="me-2 text-decoration-none" to="/home">
        Home
      </NavLink>
      <NavLink className="me-2 text-decoration-none" to="/products">
        Products
      </NavLink>
      <NavLink className="me-2 text-decoration-none" to="/addProduct">
        Add Product
      </NavLink>
      {user ? (
        <Fragment>
          <h5 className="d-inline me-2">{user?.name}</h5>
          <NavLink
            onClick={handleLogout}
            className="me-2 text-decoration-none"
            to="/addProduct"
          >
            Log out
          </NavLink>
        </Fragment>
      ) : (
        <NavLink className="me-2 text-decoration-none" to="/login">
          Login
        </NavLink>
      )}
    </div>
  );
};

export default Navigation;
