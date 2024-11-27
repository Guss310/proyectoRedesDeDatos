import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function AdminPanel() {
  const [logs, setLogs] = useState([]);
  const [comment, setComment] = useState('');

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

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    // Vulnerabilidad XSS simulada: el comentario se renderiza sin sanitización
    const newLog = {
      id: logs.length + 1,
      timestamp: new Date().toLocaleString(),
      action: 'Comment',
      username: 'admin',
      status: 'success',
      comment: comment
    };
    setLogs([...logs, newLog]);
    setComment('');
  };

  return (
    <div className="w-100">
      <h2 className="mb-4">Panel de Administración</h2>
      <div className="table-responsive mb-4">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Acción</th>
              <th>Usuario</th>
              <th>Estado</th>
              <th>Comentario</th>
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
                <td dangerouslySetInnerHTML={{__html: log.comment || ''}}></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <form onSubmit={handleCommentSubmit} className="mb-4">
        <div className="mb-3">
          <label htmlFor="comment" className="form-label">Agregar comentario (Vulnerable a XSS)</label>
          <input
            type="text"
            className="form-control"
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Ingrese un comentario (pruebe con <script>alert('XSS')</script>)"
          />
        </div>
        <button type="submit" className="btn btn-primary">Agregar Comentario</button>
      </form>
    </div>
  );
}

export default AdminPanel;

