'use client'

import { useEffect } from 'react'
import { toast } from 'react-toastify'

export function AlertSystem() {
  useEffect(() => {
    // Simular la detección de actividad sospechosa
    const timer = setTimeout(() => {
      toast.warn('Alerta: Se ha detectado actividad sospechosa en la cuenta de usuario1')
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return null // Este componente no renderiza nada, solo maneja las alertas
}

