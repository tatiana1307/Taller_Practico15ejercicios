import React, { useRef, useState } from 'react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

const UncontrolledForm: React.FC = () => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const checkboxRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  const [submittedData, setSubmittedData] = useState<FormData | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    // Get values from refs
    const formData: FormData = {
      firstName: firstNameRef.current?.value || '',
      lastName: lastNameRef.current?.value || '',
      email: emailRef.current?.value || '',
      phone: phoneRef.current?.value || '',
      message: messageRef.current?.value || ''
    };

    // Get additional values
    const newsletter = checkboxRef.current?.checked || false;
    const country = selectRef.current?.value || '';

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email) {
      alert('Por favor completa los campos requeridos (Nombre, Apellido, Email)');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Por favor ingresa un email válido');
      return;
    }

    setSubmittedData(formData);
    setIsSubmitted(true);

    // Log all form data
    console.log('Form Data:', {
      ...formData,
      newsletter,
      country
    });
  };

  const handleReset = (): void => {
    // Reset form using refs
    if (firstNameRef.current) firstNameRef.current.value = '';
    if (lastNameRef.current) lastNameRef.current.value = '';
    if (emailRef.current) emailRef.current.value = '';
    if (phoneRef.current) phoneRef.current.value = '';
    if (messageRef.current) messageRef.current.value = '';
    if (checkboxRef.current) checkboxRef.current.checked = false;
    if (selectRef.current) selectRef.current.value = '';

    setSubmittedData(null);
    setIsSubmitted(false);
  };

  const handleClearField = (fieldName: string): void => {
    switch (fieldName) {
      case 'firstName':
        if (firstNameRef.current) firstNameRef.current.value = '';
        break;
      case 'lastName':
        if (lastNameRef.current) lastNameRef.current.value = '';
        break;
      case 'email':
        if (emailRef.current) emailRef.current.value = '';
        break;
      case 'phone':
        if (phoneRef.current) phoneRef.current.value = '';
        break;
      case 'message':
        if (messageRef.current) messageRef.current.value = '';
        break;
    }
  };

  return (
    <div style={{ 
      padding: '20px', 
      border: '1px solid #ccc', 
      borderRadius: '8px',
      maxWidth: '600px',
      margin: '20px auto'
    }}>
      <h2>Formulario No Controlado con useRef + TypeScript</h2>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        Este formulario utiliza useRef para acceder a los valores de los inputs sin estado controlado.
      </p>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Nombre *:
            </label>
            <div style={{ display: 'flex', gap: '5px' }}>
              <input
                ref={firstNameRef}
                type="text"
                placeholder="Tu nombre"
                style={{
                  flex: 1,
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
              />
              <button
                type="button"
                onClick={() => handleClearField('firstName')}
                style={{
                  padding: '10px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
                title="Limpiar campo"
              >
                ✕
              </button>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Apellido *:
            </label>
            <div style={{ display: 'flex', gap: '5px' }}>
              <input
                ref={lastNameRef}
                type="text"
                placeholder="Tu apellido"
                style={{
                  flex: 1,
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
              />
              <button
                type="button"
                onClick={() => handleClearField('lastName')}
                style={{
                  padding: '10px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
                title="Limpiar campo"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Email *:
            </label>
            <div style={{ display: 'flex', gap: '5px' }}>
              <input
                ref={emailRef}
                type="email"
                placeholder="tu@email.com"
                style={{
                  flex: 1,
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
              />
              <button
                type="button"
                onClick={() => handleClearField('email')}
                style={{
                  padding: '10px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
                title="Limpiar campo"
              >
                ✕
              </button>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Teléfono:
            </label>
            <div style={{ display: 'flex', gap: '5px' }}>
              <input
                ref={phoneRef}
                type="tel"
                placeholder="+34 123 456 789"
                style={{
                  flex: 1,
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
              />
              <button
                type="button"
                onClick={() => handleClearField('phone')}
                style={{
                  padding: '10px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
                title="Limpiar campo"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            País:
          </label>
          <select
            ref={selectRef}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          >
            <option value="">Seleccionar país</option>
            <option value="ES">España</option>
            <option value="MX">México</option>
            <option value="AR">Argentina</option>
            <option value="CO">Colombia</option>
            <option value="PE">Perú</option>
            <option value="CL">Chile</option>
            <option value="US">Estados Unidos</option>
            <option value="FR">Francia</option>
            <option value="DE">Alemania</option>
            <option value="IT">Italia</option>
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Mensaje:
          </label>
          <div style={{ display: 'flex', gap: '5px' }}>
            <textarea
              ref={messageRef}
              placeholder="Escribe tu mensaje aquí..."
              rows={4}
              style={{
                flex: 1,
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                resize: 'vertical'
              }}
            />
            <button
              type="button"
              onClick={() => handleClearField('message')}
              style={{
                padding: '10px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                alignSelf: 'flex-start'
              }}
              title="Limpiar campo"
            >
              ✕
            </button>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              ref={checkboxRef}
              type="checkbox"
            />
            <span>Suscribirme al newsletter</span>
          </label>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="submit"
            style={{
              padding: '12px 24px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Enviar Formulario
          </button>
          <button
            type="button"
            onClick={handleReset}
            style={{
              padding: '12px 24px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Limpiar Todo
          </button>
        </div>
      </form>

      {/* Submitted Data Display */}
      {isSubmitted && submittedData && (
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#d4edda', 
          border: '1px solid #c3e6cb',
          borderRadius: '4px',
          marginTop: '20px'
        }}>
          <h3 style={{ color: '#155724', marginTop: 0 }}>✅ Datos Enviados:</h3>
          <div style={{ color: '#155724' }}>
            <p><strong>Nombre:</strong> {submittedData.firstName} {submittedData.lastName}</p>
            <p><strong>Email:</strong> {submittedData.email}</p>
            {submittedData.phone && <p><strong>Teléfono:</strong> {submittedData.phone}</p>}
            {submittedData.message && <p><strong>Mensaje:</strong> {submittedData.message}</p>}
            <p><strong>Newsletter:</strong> {checkboxRef.current?.checked ? 'Sí' : 'No'}</p>
            <p><strong>País:</strong> {selectRef.current?.value || 'No seleccionado'}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UncontrolledForm;
