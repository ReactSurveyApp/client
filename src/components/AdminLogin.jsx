import React, {useCallback,useState,useEffect} from 'react';
import axios from 'axios';
import './styles/adminlogin.css'
import { MdAdminPanelSettings,MdError,MdCheckCircle } from 'react-icons/md';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { IoLogInSharp } from 'react-icons/io5';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { Route } from 'react-router-dom';
import Question from './Question';
import UserSelect from './UserSelect';
import {useNavigate} from 'react-router-dom';
function AdminLogin() {
    const [loginError, setLoginError] = useState(false);
    const [emptyAreas, setEmptyAreas] = useState(false);
    const [successLogin, setSuccessLogin] = useState(false);
    const navigate = useNavigate()
    const handleOnClick = useCallback(() => navigate('/user-select', {replace: true}), [navigate]);

    useEffect(() => {
        axios.get("http://localhost:8080/admin-login").then((response) => {
          if (response.data.loggedIn == true) {
            handleOnClick();
          }
        });
      }, []);

    const sendLoginData = () => {
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;

        if(username !== null && username !== "" && password !== null && password !== ""){
            let loginData = {
                username: username,
                password: password,
            }
            axios.post('http://localhost:8080/admin-login', loginData)
            .then((response) => {
                console.log(response.data);
                if(response.data==="success"){
                    // this.props.history.push("/admin-panel");
                    setLoginError(false);
                    setEmptyAreas(false);
                    setSuccessLogin(true);
                    handleOnClick();
                }else{
                    // alert("Kayıtlı kullanıcı bulunamadı!!!") bunu aşağıda kontrol edip duruma göre kırmızı uyarı yazısı çıakrılacak
                    setSuccessLogin(false);
                    setEmptyAreas(false);
                    setLoginError(true);
                }
            }
            )
        }else{
            setSuccessLogin(false);
            setLoginError(false);
            setEmptyAreas(true);
            //alert("Lütden alanları boş bırakmayınız.")
        }
        
    }

    return (
        <div className="admin-login-container">
            <div className='admin-login-form'>
                <div className='admin-login-company-logo-area'>
                    <img src="/logo.png" alt="" className='admin-login-company-logo'/>
                </div>
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
                {
                    loginError
                        ?
                        <div className='login-error'>
                            <MdError className='login-error-icon' />
                            <span className='login-error-text'>Kullanıcı Adı veya Şifre Hatalı.</span>
                        </div>
                        :
                        <span></span>
                }
                {
                    emptyAreas
                        ?
                        <div className='empty-error'>
                            <MdError className='empty-error-icon' />
                            <span className='empty-error-text'>Lütfen Bütün Alanları Doldurunuz.</span>
                        </div>
                        :
                        <span></span>
                }
                {
                    successLogin
                        ?
                        <div className='success-login'>
                            <MdCheckCircle className='success-login-icon' />
                            <span className='success-login-text'>Giriş Başarılı.</span>
                            <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                                <CircularProgress color="success" />
                            </Stack> 
                        </div>
                        :
                        <span></span>
                }
                <div className='login-form-button-area'>
                    <button
                        className='login-form-button'
                        type="button"
                        onClick={sendLoginData}
                    >
                        Giriş Yap<IoLogInSharp className='login-form-button-icon' />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;