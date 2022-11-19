import React, { useState } from 'react'
import './styles/navbar.css'
import { FaBars,FaTimes } from 'react-icons/fa';
const Navbar = () => {
    const [menuOpen, setMenuOpen]= useState(false) 
    const OpenCloseMenu = () => {
        setMenuOpen(!menuOpen)
    }
  return (
    <>
        <nav>
            <a href="/user-select">
                <img src="./logo.png" alt="" />
            </a>
            <div>
                <ul className={
                    menuOpen
                    ? 
                    "navbar active"
                    :
                    "navbar"
                }>
                    <li><a href="/admin-panel" className='active-link'>ADMİN PANELE GİT</a></li>
                    <li><a href="/user-panel">USER PANELE GİT</a></li>
                    <li><a href="/add-admin">ADMİN EKLE</a></li>
                    <li><a href="/add-login">ADMIN LOGİN</a></li>
                    <li><a href="/anket-listele">ANKETLER</a></li>
                </ul>
            </div>
            <div className="responsive">
                {
                    menuOpen
                    ?
                    <FaTimes className='menu-close-icon' onClick={OpenCloseMenu}/>
                    :
                    <FaBars className='menu-icon' onClick={OpenCloseMenu}/>
                }
            </div>
        </nav>
    </>
  )
}

export default Navbar