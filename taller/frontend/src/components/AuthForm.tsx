import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LoginCredentials, RegisterData } from '../types';

const AuthForm: React.FC = () => {
  const { login, register, loading, error, user, logout } = useAuth();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [formData, setFormData] = useState<LoginCredentials & RegisterData>({
    username: '',
    email: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState<Partial<LoginCredentials & RegisterData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginCredentials & RegisterData> = {};

    if (!formData.username.trim()) {
      newErrors.username = 'El nombre de usuario es requerido';
    } else if (formData.username.length < 3) {
      newErrors.username = 'El nombre de usuario debe tener al menos 3 caracteres';
    }

    if (!isLogin && !formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!isLogin && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    if (validateForm()) {
      let success = false;
      
      if (isLogin) {
        const credentials: LoginCredentials = {
          username: formData.username,
          password: formData.password
        };
        success = await login(credentials);
      } else {
        const registerData: RegisterData = {
          username: formData.username,
          email: formData.email,
          password: formData.password
        };
        success = await register(registerData);
      }
      
      if (success) {
        setFormData({
          username: '',
          email: '',
          password: ''
        });
        setFormErrors({});
      }
    }
  };

  const handleToggleMode = (): void => {
    setIsLogin(!isLogin);
    setFormData({
      username: '',
      email: '',
      password: ''
    });
    setFormErrors({});
  };

  if (user) {
    return (
      <div style={{ 
        padding: '20px', 
        border: '1px solid #28a745', 
        borderRadius: '8px',
        maxWidth: '400px',
        margin: '20px auto',
        backgroundColor: '#d4edda',
        color: '#155724'
      }}>
        <h2>¡Bienvenido, {user.username}!</h2>
        <p>Email: {user.email}</p>
        <p>Usuario desde: {new Date(user.createdAt).toLocaleDateString('es-ES')}</p>
        <button
          onClick={logout}
          style={{
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          Cerrar Sesión
        </button>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '20px', 
      border: '1px solid #ccc', 
      borderRadius: '8px',
      maxWidth: '400px',
      margin: '20px auto'
    }}>
      <h2>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h2>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Usuario:
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '8px',
              border: formErrors.username ? '1px solid red' : '1px solid #ccc',
              borderRadius: '4px'
            }}
            disabled={loading}
            placeholder="Nombre de usuario"
          />
          {formErrors.username && (
            <span style={{ color: 'red', fontSize: '0.8rem' }}>
              {formErrors.username}
            </span>
          )}
        </div>

        {!isLogin && (
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '8px',
                border: formErrors.email ? '1px solid red' : '1px solid #ccc',
                borderRadius: '4px'
              }}
              disabled={loading}
              placeholder="tu@email.com"
            />
            {formErrors.email && (
              <span style={{ color: 'red', fontSize: '0.8rem' }}>
                {formErrors.email}
              </span>
            )}
          </div>
        )}

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Contraseña:
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '8px',
              border: formErrors.password ? '1px solid red' : '1px solid #ccc',
              borderRadius: '4px'
            }}
            disabled={loading}
            placeholder="Tu contraseña"
          />
          {formErrors.password && (
            <span style={{ color: 'red', fontSize: '0.8rem' }}>
              {formErrors.password}
            </span>
          )}
        </div>

        {error && (
          <div style={{ 
            color: 'red', 
            marginBottom: '15px',
            padding: '8px',
            backgroundColor: '#f8d7da',
            borderRadius: '4px',
            border: '1px solid #f5c6cb'
          }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: loading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginBottom: '15px'
          }}
        >
          {loading ? 'Procesando...' : (isLogin ? 'Iniciar Sesión' : 'Registrarse')}
        </button>
      </form>

      <div style={{ textAlign: 'center' }}>
        <button
          onClick={handleToggleMode}
          style={{
            background: 'none',
            border: 'none',
            color: '#007bff',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
