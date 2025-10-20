import React, { useState } from 'react';

interface CounterProps {
  initialValue?: number;
  step?: number;
}

const Counter: React.FC<CounterProps> = ({ initialValue = 0, step = 1 }) => {
  const [count, setCount] = useState<number>(initialValue);

  const increment = (): void => {
    setCount(prevCount => prevCount + step);
  };

  const decrement = (): void => {
    setCount(prevCount => prevCount - step);
  };

  const reset = (): void => {
    setCount(initialValue);
  };

  return (
    <div style={{ 
      padding: '20px', 
      border: '1px solid #ccc', 
      borderRadius: '8px', 
      textAlign: 'center',
      maxWidth: '300px',
      margin: '20px auto'
    }}>
      <h2>Contador con TypeScript</h2>
      <div style={{ fontSize: '2rem', margin: '20px 0' }}>
        {count}
      </div>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button onClick={decrement} style={{ padding: '8px 16px' }}>
          -{step}
        </button>
        <button onClick={reset} style={{ padding: '8px 16px' }}>
          Reset
        </button>
        <button onClick={increment} style={{ padding: '8px 16px' }}>
          +{step}
        </button>
      </div>
    </div>
  );
};

export default Counter;
