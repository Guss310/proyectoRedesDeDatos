import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import OtpInput from 'react-otp-input';

function MFAComponent() {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simular verificación de OTP
    if (otp === '123456') {
      toast.success('Autenticación de dos factores exitosa');
      navigate('/admin');
    } else {
      toast.error('Código OTP incorrecto');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-100 max-w-md">
      <h2 className="text-center mb-4">Autenticación de dos factores</h2>
      <p className="text-center mb-4">Ingrese el código de 6 dígitos enviado a su dispositivo</p>
      <div className="mb-4 d-flex justify-content-center">
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span className="mx-2"></span>}
          renderInput={(props) => <input {...props} className="form-control text-center" style={{width: '3rem'}} />}
        />
      </div>
      <button type="submit" className="btn btn-primary w-100" disabled={otp.length !== 6}>
        Verificar
      </button>
    </form>
  );
}

export default MFAComponent;

