import React from 'react';
import Question from './components/Question'
import UserSelect from './components/UserSelect';
import User from './components/User';
import AddAdmin from './components/AddAdmin';
import AdminLogin from "./components/AdminLogin";
import Surveys from './components/Surveys';
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom';
import './App.css'
import SurveyUserPanel from './components/SurveyUserPanel';
import SurveyDetail from './components/SurveyDetail';
function App() {
    return (
        <>
            
            <div className='Container'>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<AdminLogin />} />
                        <Route path="admin-panel" element={<Question />} />
                        <Route path="user-panel" element={<User />} />
                        <Route path="add-admin" element={<AddAdmin />} />
                        <Route path="user-select" element={<UserSelect />} />
                        <Route path="anket-listele" element={<Surveys />} />
                        <Route path="anket-detay" element={<SurveyDetail />} />
                        <Route path="survey-input/*" element={<SurveyUserPanel />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    );
}

export default App;