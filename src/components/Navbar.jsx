import React, { useState, useEffect, useCallback } from "react";
import "./styles/navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import { IoLogOut } from "react-icons/io5";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const OpenCloseMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const [loginStatus, setLoginStatus] = useState(false);
  const navigate = useNavigate()
  const handleOnClick = useCallback(() => navigate('/', {replace: true}), [navigate]);

  const logout = () => {
    axios.post("http://localhost:8080/log-out")
  }

  useEffect(() => {
    axios.get("http://localhost:8080/admin-login").then((response) => {
      if (response.data === true) {
        setLoginStatus(true);
      }
    });
  }, []);
  return (
    <>
      <nav>
        <a href="/user-select">
          <img src="https://i.hizliresim.com/clo9l14.png" alt="" />
        </a>
        <div>
          <ul className={menuOpen ? "navbar active" : "navbar"}>
            <li>
              <Link to="/admin-panel">ANKET OLUŞTUR</Link>
            </li>
            <li>
              <Link to="/add-admin">ADMİN EKLE</Link>
            </li>
            <li>
              <Link to="/anket-listele">ANKETLER</Link>
            </li>
            
            {loginStatus ? (
              
              <button 
              className="flex items-center justify-center border-2 border-red-200 text-m rounded shadow p-2 text-black font-semibold hover:border-red-400 transition duration-700 hover:bg-red-400 hover:text-white"
              onClick={() => {
                logout()
                handleOnClick()
              }}
              >
                {<IoLogOut className=" mr-1 mt-[1px]"/>}
                Çıkış Yap
              </button>
            ) : (
              <span></span>
            )}
          </ul>
        </div>
        <div className="responsive">
          {menuOpen ? (
            <FaTimes className="menu-close-icon" onClick={OpenCloseMenu} />
          ) : (
            <FaBars className="menu-icon" onClick={OpenCloseMenu} />
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
