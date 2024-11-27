'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import CryptoJS from 'crypto-js'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const MAX_LOGIN_ATTEMPTS = 3
const LOCKOUT_TIME = 15 * 60 * 1000 // 15 minutes in milliseconds

interface LoginFormProps {
  onSuccessfulLogin: (username: string) => void
}

export function LoginForm({ onSuccessfulLogin }: LoginFormProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginAttempts, setLoginAttempts] = useState(0)
  const [lockoutUntil, setLockoutUntil] = useState<number | null>(null)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (lockoutUntil && Date.now() < lockoutUntil) {
      toast.error('Cuenta bloqueada. Intente más tarde.')
      return
    }

    // Simular verificación de contraseña
    const hashedPassword = CryptoJS.SHA256(password).toString()
    if (username === 'demo' && hashedPassword === CryptoJS.SHA256('password123').toString()) {
      toast.success('Inicio de sesión exitoso')
      setLoginAttempts(0)
      onSuccessfulLogin(username)
      router.push('/mfa')
    } else {
      const newAttempts = loginAttempts + 1
      setLoginAttempts(newAttempts)
      if (newAttempts >= MAX_LOGIN_ATTEMPTS) {
        setLockoutUntil(Date.now() + LOCKOUT_TIME)
        toast.error(`Demasiados intentos fallidos. Cuenta bloqueada por 15 minutos.`)
      } else {
        toast.error(`Inicio de sesión fallido. Intentos restantes: ${MAX_LOGIN_ATTEMPTS - newAttempts}`)
      }
    }
  }

  const isPasswordSecure = (pass: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return regex.test(pass)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <div>
        <Label htmlFor="username">Usuario</Label>
        <Input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="password">Contraseña</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {password && !isPasswordSecure(password) && (
          <p className="text-sm text-red-500 mt-1">
            La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas, números y caracteres especiales.
          </p>
        )}
      </div>
      <Button type="submit" className="w-full">
        Iniciar sesión
      </Button>
    </form>
  )
}

