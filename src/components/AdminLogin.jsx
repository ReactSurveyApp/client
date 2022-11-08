import React from 'react';
import axios from 'axios';
import './styles/adminlogin.css'
import { MdAdminPanelSettings } from 'react-icons/md';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { IoLogInSharp } from 'react-icons/io5';
function AdminLogin() {

    const sendLoginData = () => {
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;

        let loginData = {
            username: username,
            password: password,
        }
        axios.post('http://localhost:8080/admin-login', loginData)
            .then((response) => {
                console.log(response);
            }
            )
    }

    return (
        <div className="admin-login-container">
            <div className='admin-login-form'>
                <div className='login-form-header-area'>
                    <MdAdminPanelSettings className='login-form-header-icon' />
                    <h1 className="login-form-header">ADMİN PANEL GİRİŞ</h1>
                </div>
                <div className="login-form-input-container">
                    <div className="login-form-input-area">
                        <input className='login-form-input' type="text" id="username" placeholder='Kullanıcı Adı' />
                        <FaUserAlt className='login-form-input-icon' />
                    </div>
                    <div className="login-form-input-area">
                        <input className='login-form-input' type="password" id="password" placeholder='Şifre' />
                        <FaLock className='login-form-input-icon' />
                    </div>
                </div>
                <div className='login-form-button-area'>
                    <button
                        className='login-form-button'
                        onClick={() => {
                            sendLoginData();
                        }}
                    >
                        Giriş Yap<IoLogInSharp className='login-form-button-icon' />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;