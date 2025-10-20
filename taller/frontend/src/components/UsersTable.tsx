import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { User } from '../types';

// Componente para mostrar tabla de usuarios desde API
// Ejercicio 5: Tabla de usuarios con TypeScript y Axios
const UsersTable: React.FC = () => {
  // Estados para manejar datos, carga y errores
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  // Función para obtener usuarios de la API
  const fetchUsers = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      // Llamada a la API usando axios configurado
      const response = await api.get<User[]>('/users');
      setUsers(response.data);
    } catch (err) {
      setError('Error al cargar los usuarios');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center',
        border: '1px solid #ccc', 
        borderRadius: '8px',
        maxWidth: '800px',
        margin: '20px auto'
      }}>
        <h2>Tabla de Usuarios</h2>
        <p>Cargando usuarios...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center',
        border: '1px solid #dc3545', 
        borderRadius: '8px',
        maxWidth: '800px',
        margin: '20px auto',
        backgroundColor: '#f8d7da',
        color: '#721c24'
      }}>
        <h2>Tabla de Usuarios</h2>
        <p>{error}</p>
        <button
          onClick={fetchUsers}
          style={{
            padding: '8px 16px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '20px', 
      border: '1px solid #ccc', 
      borderRadius: '8px',
      maxWidth: '800px',
      margin: '20px auto'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Tabla de Usuarios</h2>
        <button
          onClick={fetchUsers}
          style={{
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Actualizar
        </button>
      </div>

      {users.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666' }}>
          No hay usuarios disponibles
        </p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            border: '1px solid #ddd'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                <th style={{ 
                  padding: '12px', 
                  textAlign: 'left', 
                  borderBottom: '1px solid #ddd',
                  borderRight: '1px solid #ddd'
                }}>
                  ID
                </th>
                <th style={{ 
                  padding: '12px', 
                  textAlign: 'left', 
                  borderBottom: '1px solid #ddd',
                  borderRight: '1px solid #ddd'
                }}>
                  Usuario
                </th>
                <th style={{ 
                  padding: '12px', 
                  textAlign: 'left', 
                  borderBottom: '1px solid #ddd',
                  borderRight: '1px solid #ddd'
                }}>
                  Email
                </th>
                <th style={{ 
                  padding: '12px', 
                  textAlign: 'left', 
                  borderBottom: '1px solid #ddd'
                }}>
                  Fecha de Registro
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr 
                  key={user.id}
                  style={{ 
                    backgroundColor: index % 2 === 0 ? 'white' : '#f8f9fa',
                    borderBottom: '1px solid #ddd'
                  }}
                >
                  <td style={{ 
                    padding: '12px', 
                    borderRight: '1px solid #ddd',
                    fontWeight: 'bold'
                  }}>
                    {user.id}
                  </td>
                  <td style={{ 
                    padding: '12px', 
                    borderRight: '1px solid #ddd'
                  }}>
                    {user.username}
                  </td>
                  <td style={{ 
                    padding: '12px', 
                    borderRight: '1px solid #ddd'
                  }}>
                    {user.email}
                  </td>
                  <td style={{ padding: '12px' }}>
                    {formatDate(user.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div style={{ 
        marginTop: '15px', 
        padding: '10px', 
        backgroundColor: '#e9ecef', 
        borderRadius: '4px',
        textAlign: 'center'
      }}>
        <p style={{ margin: 0, color: '#495057' }}>
          Total de usuarios: {users.length}
        </p>
      </div>
    </div>
  );
};

export default UsersTable;
