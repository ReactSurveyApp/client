import React from 'react';
import Question from './components/Question'
import UserSelect from './components/UserSelect';
import User from './components/User';
import AddAdmin from './components/AddAdmin';
import AdminLogin from "./components/AdminLogin";
import {BrowserRouter, Router, Routes, Route} from 'react-router-dom';
import './App.css'
function App() {
    return (
        <div className='Container'>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<UserSelect />} />
                <Route path="admin-panel" element={<Question />} />
                <Route path="user-panel" element={<User />} />
                <Route path="add-admin" element={<AddAdmin />} />
                <Route path="admin-login" element={<AdminLogin />} />
            </Routes>
        </BrowserRouter>
        </div>
    );
}

export default App;