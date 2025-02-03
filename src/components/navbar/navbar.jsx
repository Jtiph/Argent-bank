import React from "react";
import "./navbar.scss";
import argentBankLogo from "../../assets/img/argentBankLogo.png";
import { FaSignOutAlt } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={argentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {token ? (
          <>
            <Link className="main-nav-item" to="/profile">
              <FaCircleUser className="main-nav-item-logo" /> {user.name}
            </Link>
            <button className="main-nav-item" onClick={handleLogout}>
              <FaSignOutAlt /> Sign Out
            </button>
          </>
        ) : (
          <Link className="main-nav-item" to="/signin">
            <FaCircleUser /> Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
