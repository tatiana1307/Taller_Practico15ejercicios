import React from 'react';
import { useError } from '../context/ErrorContext';

const ErrorDisplay: React.FC = () => {
  const { errors, removeError, clearAllErrors } = useError();

  const getErrorIcon = (type: 'error' | 'warning' | 'info'): string => {
    switch (type) {
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '❌';
    }
  };

  const getErrorColor = (type: 'error' | 'warning' | 'info'): string => {
    switch (type) {
      case 'error':
        return '#dc3545';
      case 'warning':
        return '#ffc107';
      case 'info':
        return '#17a2b8';
      default:
        return '#dc3545';
    }
  };

  const getErrorBackgroundColor = (type: 'error' | 'warning' | 'info'): string => {
    switch (type) {
      case 'error':
        return '#f8d7da';
      case 'warning':
        return '#fff3cd';
      case 'info':
        return '#d1ecf1';
      default:
        return '#f8d7da';
    }
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  if (errors.length === 0) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 9999,
      maxWidth: '400px',
      maxHeight: '80vh',
      overflowY: 'auto'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px',
        padding: '10px',
        backgroundColor: '#f8f9fa',
        borderRadius: '4px',
        border: '1px solid #dee2e6'
      }}>
        <h4 style={{ margin: 0, color: '#495057' }}>
          Notificaciones ({errors.length})
        </h4>
        <button
          onClick={clearAllErrors}
          style={{
            padding: '4px 8px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.8rem'
          }}
        >
          Limpiar Todo
        </button>
      </div>

      {/* Error List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {errors.map((error) => (
          <div
            key={error.id}
            style={{
              padding: '12px',
              borderRadius: '4px',
              border: `1px solid ${getErrorColor(error.type)}`,
              backgroundColor: getErrorBackgroundColor(error.type),
              color: getErrorColor(error.type),
              fontSize: '0.9rem',
              animation: 'slideIn 0.3s ease-out'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                  <span style={{ marginRight: '8px', fontSize: '1.1rem' }}>
                    {getErrorIcon(error.type)}
                  </span>
                  <span style={{ fontWeight: 'bold' }}>
                    {error.type === 'error' ? 'Error' : 
                     error.type === 'warning' ? 'Advertencia' : 'Información'}
                  </span>
                  {error.source && (
                    <span style={{ 
                      marginLeft: '8px', 
                      fontSize: '0.7rem', 
                      backgroundColor: 'rgba(0,0,0,0.1)',
                      padding: '2px 6px',
                      borderRadius: '3px'
                    }}>
                      {error.source}
                    </span>
                  )}
                </div>
                <p style={{ margin: '0 0 5px 0', lineHeight: '1.4' }}>
                  {error.message}
                </p>
                <div style={{ 
                  fontSize: '0.7rem', 
                  opacity: 0.7,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span>{formatTime(error.timestamp)}</span>
                  <button
                    onClick={() => removeError(error.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: getErrorColor(error.type),
                      cursor: 'pointer',
                      fontSize: '1.2rem',
                      padding: '0',
                      marginLeft: '10px'
                    }}
                    title="Cerrar"
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ErrorDisplay;
