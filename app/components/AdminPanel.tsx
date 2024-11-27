'use client'

import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

interface LogEntry {
  id: number
  timestamp: string
  action: string
  username: string
  status: 'success' | 'failure'
}

export function AdminPanel() {
  const [logs, setLogs] = useState<LogEntry[]>([])

  useEffect(() => {
    // Simular la obtención de logs
    const simulatedLogs: LogEntry[] = [
      { id: 1, timestamp: '2023-05-20 10:30:00', action: 'Login', username: 'user1', status: 'success' },
      { id: 2, timestamp: '2023-05-20 10:35:00', action: 'Login', username: 'user2', status: 'failure' },
      { id: 3, timestamp: '2023-05-20 11:00:00', action: 'MFA', username: 'user1', status: 'success' },
    ]
    setLogs(simulatedLogs)
  }, [])

  const handleAlertClick = (log: LogEntry) => {
    if (log.status === 'failure') {
      toast.warn(`Alerta: Intento de acceso fallido para ${log.username} el ${log.timestamp}`)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Panel de Administración</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Timestamp</th>
            <th className="px-4 py-2 border">Acción</th>
            <th className="px-4 py-2 border">Usuario</th>
            <th className="px-4 py-2 border">Estado</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id} onClick={() => handleAlertClick(log)} className="cursor-pointer hover:bg-gray-100">
              <td className="px-4 py-2 border">{log.timestamp}</td>
              <td className="px-4 py-2 border">{log.action}</td>
              <td className="px-4 py-2 border">{log.username}</td>
              <td className={`px-4 py-2 border ${log.status === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                {log.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

