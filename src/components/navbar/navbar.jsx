import React from 'react';
import './navbar.scss';
import argentBankLogo from '../../assets/img/argentBankLogo.png';
import { FaCircleUser } from "react-icons/fa6";

const Navbar = () => {
    return (
        <nav className="main-nav">
        <a class="main-nav-logo" >
          <img
           className="main-nav-logo-image"
            src={argentBankLogo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </a>
        <div>
          <a className="main-nav-item" >
          <FaCircleUser className='main-nav-item-logo'/>
            Sign In
          </a>
        </div>
      </nav>
    );
};

export default Navbar;