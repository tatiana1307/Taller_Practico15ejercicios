import React from 'react';
import { GenericListItem } from '../types';

interface GenericListProps<T extends GenericListItem> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T) => string | number;
  emptyMessage?: string;
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  className?: string;
  itemClassName?: string;
}

const GenericList = <T extends GenericListItem>({
  items,
  renderItem,
  keyExtractor,
  emptyMessage = 'No hay elementos para mostrar',
  loading = false,
  error = null,
  onRetry,
  className = '',
  itemClassName = ''
}: GenericListProps<T>): React.ReactElement => {
  if (loading) {
    return (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center',
        border: '1px solid #ccc', 
        borderRadius: '8px',
        margin: '20px auto'
      }}>
        <div style={{ 
          display: 'inline-block',
          width: '40px',
          height: '40px',
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #007bff',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <p style={{ marginTop: '10px', color: '#666' }}>Cargando...</p>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
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
        margin: '20px auto',
        backgroundColor: '#f8d7da',
        color: '#721c24'
      }}>
        <h3 style={{ marginTop: 0, color: '#721c24' }}>Error</h3>
        <p>{error}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            style={{
              padding: '8px 16px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            Reintentar
          </button>
        )}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div style={{ 
        padding: '40px', 
        textAlign: 'center',
        border: '1px solid #ddd', 
        borderRadius: '8px',
        margin: '20px auto',
        backgroundColor: '#f8f9fa',
        color: '#666'
      }}>
        <h3 style={{ marginTop: 0, color: '#666' }}>Sin elementos</h3>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={className} style={{ margin: '20px auto' }}>
      {items.map((item, index) => (
        <div
          key={keyExtractor(item)}
          className={itemClassName}
          style={{
            marginBottom: '10px',
            padding: '15px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            backgroundColor: 'white',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
};

export default GenericList;
