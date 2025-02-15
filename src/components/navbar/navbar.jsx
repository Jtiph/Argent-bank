import React, { useEffect } from "react";
import "./navbar.scss";
import argentBankLogo from "../../assets/img/argentBankLogo.png";
import { FaSignOutAlt } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import {
  clearProfile,
  autoFetchUserProfile,
} from "../../redux/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.user.profile);

  useEffect(() => {
    dispatch(autoFetchUserProfile()); // Charge le profil automatiquement si un token est présent
  }, [dispatch]); // S'exécute uniquement au chargement du composant

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearProfile());
    navigate("/");
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
        {token && user ? (
          <>
            <Link className="main-nav-item" to="/profile">
              <FaCircleUser className="main-nav-item-logo" /> {user.firstName}
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
