import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function AdminPanel() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Simular la obtención de logs
    const simulatedLogs = [
      { id: 1, timestamp: '2023-05-20 10:30:00', action: 'Login', username: 'user1', status: 'success' },
      { id: 2, timestamp: '2023-05-20 10:35:00', action: 'Login', username: 'user2', status: 'failure' },
      { id: 3, timestamp: '2023-05-20 11:00:00', action: 'MFA', username: 'user1', status: 'success' },
    ];
    setLogs(simulatedLogs);
  }, []);

  const handleAlertClick = (log) => {
    if (log.status === 'failure') {
      toast.warn(`Alerta: Intento de acceso fallido para ${log.username} el ${log.timestamp}`);
    }
  };

  return (
    <div className="w-100">
      <h2 className="mb-4">Panel de Administración</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Acción</th>
              <th>Usuario</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} onClick={() => handleAlertClick(log)} style={{cursor: 'pointer'}}>
                <td>{log.timestamp}</td>
                <td>{log.action}</td>
                <td>{log.username}</td>
                <td className={log.status === 'success' ? 'text-success' : 'text-danger'}>
                  {log.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPanel;

