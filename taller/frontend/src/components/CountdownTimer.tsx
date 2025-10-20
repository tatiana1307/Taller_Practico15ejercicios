import React, { useState } from 'react';
import { useCountdown } from '../hooks/useCountdown';

const CountdownTimer: React.FC = () => {
  const { timeLeft, isRunning, isFinished, start, pause, resume, reset, formatTime } = useCountdown();
  const [inputMinutes, setInputMinutes] = useState<string>('5');
  const [inputSeconds, setInputSeconds] = useState<string>('0');

  const handleStart = (): void => {
    const totalSeconds = parseInt(inputMinutes) * 60 + parseInt(inputSeconds);
    if (totalSeconds > 0) {
      start(totalSeconds);
    }
  };

  const handleInputChange = (minutes: string, seconds: string): void => {
    setInputMinutes(minutes);
    setInputSeconds(seconds);
  };

  return (
    <div style={{ 
      padding: '20px', 
      border: '1px solid #ccc', 
      borderRadius: '8px', 
      maxWidth: '400px',
      margin: '20px auto',
      textAlign: 'center'
    }}>
      <h2>Temporizador Regresivo</h2>
      
      {/* Timer Display */}
      <div style={{
        fontSize: '3rem',
        fontWeight: 'bold',
        color: isFinished ? '#dc3545' : isRunning ? '#007bff' : '#28a745',
        margin: '20px 0',
        fontFamily: 'monospace'
      }}>
        {formatTime(timeLeft)}
      </div>

      {/* Status */}
      <div style={{ marginBottom: '20px' }}>
        {isFinished && (
          <p style={{ color: '#dc3545', fontWeight: 'bold' }}>
            ¡Tiempo agotado!
          </p>
        )}
        {isRunning && (
          <p style={{ color: '#007bff' }}>
            ⏱️ Ejecutándose...
          </p>
        )}
        {!isRunning && !isFinished && timeLeft > 0 && (
          <p style={{ color: '#ffc107' }}>
            ⏸️ Pausado
          </p>
        )}
      </div>

      {/* Input Controls */}
      {!isRunning && timeLeft === 0 && (
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '10px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>Minutos:</label>
              <input
                type="number"
                value={inputMinutes}
                onChange={(e) => handleInputChange(e.target.value, inputSeconds)}
                min="0"
                max="59"
                style={{
                  width: '80px',
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>Segundos:</label>
              <input
                type="number"
                value={inputSeconds}
                onChange={(e) => handleInputChange(inputMinutes, e.target.value)}
                min="0"
                max="59"
                style={{
                  width: '80px',
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Control Buttons */}
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        {!isRunning && timeLeft === 0 && (
          <button
            onClick={handleStart}
            style={{
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Iniciar
          </button>
        )}

        {isRunning && (
          <button
            onClick={pause}
            style={{
              padding: '10px 20px',
              backgroundColor: '#ffc107',
              color: 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Pausar
          </button>
        )}

        {!isRunning && timeLeft > 0 && !isFinished && (
          <button
            onClick={resume}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Reanudar
          </button>
        )}

        {timeLeft > 0 && (
          <button
            onClick={reset}
            style={{
              padding: '10px 20px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Resetear
          </button>
        )}
      </div>

      {/* Quick Start Buttons */}
      {!isRunning && timeLeft === 0 && (
        <div style={{ marginTop: '20px' }}>
          <p>Inicio rápido:</p>
          <div style={{ display: 'flex', gap: '5px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[1, 5, 10, 15, 30].map(minutes => (
              <button
                key={minutes}
                onClick={() => start(minutes * 60)}
                style={{
                  padding: '5px 10px',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                {minutes}min
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;
