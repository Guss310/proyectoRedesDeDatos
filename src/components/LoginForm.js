import React, { useState, useEffect } from 'react';
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
  const [sensitiveData, setSensitiveData] = useState('');
  const [showBruteForce, setShowBruteForce] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Simular la obtención de datos sensibles
    setSensitiveData('datos_sensibles_123');
  }, []);

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

    // Simular una fuga de información sensible en los logs
    console.log(`Intento de inicio de sesión - Usuario: ${username}, Contraseña: ${password}, Datos sensibles: ${sensitiveData}`);
  };

  const isPasswordSecure = (pass) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(pass);
  };

  const simulateBruteForce = () => {
    setShowBruteForce(true);
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      console.log(`Intento de fuerza bruta #${attempts}: usuario=demo, contraseña=password${attempts}`);
      if (attempts >= 10) {
        clearInterval(interval);
        toast.error('Ataque de fuerza bruta simulado completado');
      }
    }, 500);
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
      <button type="submit" className="btn btn-primary w-100 mb-3">
        Iniciar sesión
      </button>
      <button type="button" className="btn btn-danger w-100" onClick={simulateBruteForce}>
        Simular ataque de fuerza bruta
      </button>
      {showBruteForce && (
        <div className="mt-3 alert alert-warning">
          Se está simulando un ataque de fuerza bruta. Revisa la consola del navegador para ver los intentos.
        </div>
      )}
    </form>
  );
}

export default LoginForm;

