'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import OtpInput from 'react-otp-input'
import { Button } from '@/components/ui/button'

export function MFAComponent() {
  const [otp, setOtp] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simular verificación de OTP
    if (otp === '123456') {
      toast.success('Autenticación de dos factores exitosa')
      router.push('/admin')
    } else {
      toast.error('Código OTP incorrecto')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <h2 className="text-2xl font-bold text-center">Autenticación de dos factores</h2>
      <p className="text-center">Ingrese el código de 6 dígitos enviado a su dispositivo</p>
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        renderSeparator={<span className="w-2"></span>}
        renderInput={(props) => <input {...props} className="w-12 h-12 text-center border rounded" />}
      />
      <Button type="submit" className="w-full" disabled={otp.length !== 6}>
        Verificar
      </Button>
    </form>
  )
}

