import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginForm from './components/LoginForm';
import MFAComponent from './components/MFAComponent';
import AdminPanel from './components/AdminPanel';
import AlertSystem from './components/AlertSystem';

function App() {
  return (
    <Router>
      <div className="container min-vh-100 d-flex flex-column justify-content-center align-items-center py-4">
        <h1 className="display-4 mb-4">Demo de Autenticación Segura</h1>
        <Routes>
          <Route path="/" element={<LoginForm onSuccessfulLogin={(username) => console.log(`${username} ha iniciado sesión`)} />} />
          <Route path="/mfa" element={<MFAComponent />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
        <AlertSystem />
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;

