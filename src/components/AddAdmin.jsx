import React, { useState } from 'react';
import axios from 'axios';
import './styles/addadmin.css'
import { MdPersonAddAlt1,MdError,MdCheckCircle } from 'react-icons/md';
import { FaUserAlt, FaLock, FaSave } from 'react-icons/fa';
import { IoMail } from 'react-icons/io5';
import Navbar from './Navbar';


function AddAdmin() {
    const [emptyAreaError, setEmptyAreaError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [successAlert, setSuccessAlert] = useState(false)
    const saveNewAdmin = () => {

        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        let password_again = document.getElementById('password-again').value;
        let email = document.getElementById('e-mail').value;
        if (username !== null && username !== "" && password !== null && password !== "" && password_again !== null && password_again !== "" && email !== null && email !== "") {
            if(password === password_again){
                let newAdmin = {
                    username: username,
                    password: password,
                    password_again: password_again,
                    email: email,
                }
    
                axios.post("http://localhost:8080/add_admin", newAdmin)
                    .then((response) => {
                        console.log(response);
                    }
                    )
                setEmptyAreaError(false)
                setPasswordError(false)
                setSuccessAlert(true)
            }else{
                setSuccessAlert(false)
                setEmptyAreaError(false)
                setPasswordError(true)
            }
        }else {
            setSuccessAlert(false)
            setEmptyAreaError(true)
        }
    }

    return (
        <>
            <Navbar />
            <div className='create-admin-container'>
            <div className='create-admin-form'>
                <div className='admin-login-company-logo-area'>
                    <img src="/logo.png" alt="" className='admin-login-company-logo'/>
                </div>
                <div className='crate-admin-header-area'>
                    <MdPersonAddAlt1 className='create-admin-header-icon' />
                    <h1 className='create-admin-header'>ADMİN OLUŞTUR</h1>
                </div>
                <div className='create-form-input-container'>
                    <div className='create-form-input-area'>
                        <input id='username' type='text' className='create-form-input' />
                        <FaUserAlt className='create-form-input-icon' />
                    </div>
                    <div className='create-form-input-area'>
                        <input id='password' type='password' className='create-form-input' />
                        <FaLock className='create-form-input-icon' />
                    </div>
                    <div className='create-form-input-area'>
                        <input id='password-again' type='password' className='create-form-input' />
                        <FaLock className='create-form-input-icon' />
                    </div>
                    <div className='create-form-input-area'>
                        <input id='e-mail' type='text' className='create-form-input' />
                        <IoMail className='create-form-input-icon' />
                    </div>
                </div>
                {
                    emptyAreaError
                        ?
                        <div className='login-error'>
                            <MdError className='login-error-icon' />
                            <span className='login-error-text'>Lütfen Bütün Bilgileri Doldurunuz</span>
                        </div>
                        :
                        <span></span>
                }
                {
                    passwordError
                        ?
                        <div className='login-error'>
                            <MdError className='login-error-icon' />
                            <span className='login-error-text'>Şifreler Birbiriyle Uyuşmuyor</span>
                        </div>
                        :
                        <span></span>
                }
                {
                    successAlert
                        ?
                        <div className='success-login'>
                            <MdCheckCircle className='success-login-icon' />
                            <span className='success-login-text'>Kayıt Başarılı.</span>
                        </div>
                        :
                        <span></span>
                }
                <div className='create-form-button-area'>
                    <button
                        type="submit"
                        className='create-form-button'
                        onClick={() => {
                            saveNewAdmin();
                        }}
                    >
                        Kaydet<FaSave className='create-form-button-icon' />
                    </button>
                </div>
            </div>
        </div>
        </>
        
    );
}

export default AddAdmin;