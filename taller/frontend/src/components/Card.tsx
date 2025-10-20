import React from 'react';
import { CardProps } from '../types';

const Card: React.FC<CardProps> = ({ title, description, date, onClick }) => {
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div
      onClick={onClick}
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
        maxWidth: '350px',
        margin: '10px'
      }}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        }
      }}
    >
      <h3 style={{ 
        margin: '0 0 10px 0', 
        color: '#333',
        fontSize: '1.2rem',
        fontWeight: 'bold'
      }}>
        {title}
      </h3>
      
      <p style={{ 
        color: '#666', 
        marginBottom: '15px',
        lineHeight: '1.5',
        fontSize: '0.95rem'
      }}>
        {description}
      </p>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderTop: '1px solid #eee',
        paddingTop: '10px'
      }}>
        <span style={{ 
          fontSize: '0.8rem', 
          color: '#999',
          fontStyle: 'italic'
        }}>
          {formatDate(date)}
        </span>
        {onClick && (
          <span style={{ 
            fontSize: '0.8rem', 
            color: '#007bff',
            fontWeight: 'bold'
          }}>
            Click para ver más →
          </span>
        )}
      </div>
    </div>
  );
};

export default Card;
