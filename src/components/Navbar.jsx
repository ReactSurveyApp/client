import React, { useState } from 'react'
import './styles/navbar.css'
import { FaBars,FaTimes } from 'react-icons/fa';
import {Link} from 'react-router-dom'

const Navbar = () => {
    const [menuOpen, setMenuOpen]= useState(false) 
    const OpenCloseMenu = () => {
        setMenuOpen(!menuOpen)
    }
  return (
    <>
        <nav>
            <a href="/user-select">
                <img src="https://i.hizliresim.com/clo9l14.png" alt="" />
            </a>
            <div>
                <ul className={
                    menuOpen
                    ? 
                    "navbar active"
                    :
                    "navbar"
                }>
                    <li><Link to="/admin-panel">ANKET OLUŞTUR</Link></li>
                    <li><Link to="/add-admin" >ADMİN EKLE</Link></li>
                    <li><Link to="/anket-listele" >ANKETLER</Link></li>
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