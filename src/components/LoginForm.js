import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CryptoJS from 'crypto-js';

const MAX_LOGIN_ATTEMPTS = 3;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes in milliseconds

function LoginForm({ onSuccessfulLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lockoutUntil, setLockoutUntil] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (lockoutUntil && Date.now() < lockoutUntil) {
      toast.error('Cuenta bloqueada. Intente más tarde.');
      return;
    }

    // Simular verificación de contraseña
    const hashedPassword = CryptoJS.SHA256(password).toString();
    if (username === 'demo' && hashedPassword === CryptoJS.SHA256('password123').toString()) {
      toast.success('Inicio de sesión exitoso');
      setLoginAttempts(0);
      onSuccessfulLogin(username);
      navigate('/mfa');
    } else {
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      if (newAttempts >= MAX_LOGIN_ATTEMPTS) {
        setLockoutUntil(Date.now() + LOCKOUT_TIME);
        toast.error(`Demasiados intentos fallidos. Cuenta bloqueada por 15 minutos.`);
      } else {
        toast.error(`Inicio de sesión fallido. Intentos restantes: ${MAX_LOGIN_ATTEMPTS - newAttempts}`);
      }
    }
  };

  const isPasswordSecure = (pass) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(pass);
  };

  return (
    <form onSubmit={handleSubmit} className="w-100 max-w-md">
      <div className="mb-3">
        <label htmlFor="username" className="form-label">Usuario</label>
        <input
          id="username"
          type="text"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Contraseña</label>
        <input
          id="password"
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {password && !isPasswordSecure(password) && (
          <p className="text-danger mt-1 small">
            La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas, números y caracteres especiales.
          </p>
        )}
      </div>
      <button type="submit" className="btn btn-primary w-100">
        Iniciar sesión
      </button>
    </form>
  );
}

export default LoginForm;

