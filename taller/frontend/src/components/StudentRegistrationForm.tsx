import React, { useState } from 'react';
import { Student } from '../types';

interface StudentFormData {
  name: string;
  email: string;
  age: string;
  course: string;
  grade: string;
}

interface StudentRegistrationFormProps {
  onSubmit: (students: Student[]) => void;
}

const StudentRegistrationForm: React.FC<StudentRegistrationFormProps> = ({ onSubmit }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [formData, setFormData] = useState<StudentFormData>({
    name: '',
    email: '',
    age: '',
    course: '',
    grade: ''
  });
  const [errors, setErrors] = useState<Partial<StudentFormData>>({});

  const courses = [
    'Computer Science',
    'Engineering',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Medicine',
    'Law',
    'Business',
    'Arts'
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<StudentFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    } else if (formData.name.length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!formData.age) {
      newErrors.age = 'La edad es requerida';
    } else {
      const age = parseInt(formData.age);
      if (isNaN(age) || age < 16 || age > 100) {
        newErrors.age = 'La edad debe estar entre 16 y 100 años';
      }
    }

    if (!formData.course) {
      newErrors.course = 'El curso es requerido';
    }

    if (!formData.grade) {
      newErrors.grade = 'La calificación es requerida';
    } else {
      const grade = parseFloat(formData.grade);
      if (isNaN(grade) || grade < 0 || grade > 100) {
        newErrors.grade = 'La calificación debe estar entre 0 y 100';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof StudentFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleAddStudent = (e: React.FormEvent): void => {
    e.preventDefault();
    
    if (validateForm()) {
      const newStudent: Student = {
        id: students.length + 1,
        name: formData.name.trim(),
        email: formData.email.trim(),
        age: parseInt(formData.age),
        course: formData.course,
        grade: parseFloat(formData.grade),
        createdAt: new Date().toISOString()
      };

      setStudents(prev => [...prev, newStudent]);
      setFormData({
        name: '',
        email: '',
        age: '',
        course: '',
        grade: ''
      });
      setErrors({});
    }
  };

  const handleRemoveStudent = (id: number): void => {
    setStudents(prev => prev.filter(student => student.id !== id));
  };

  const handleSubmitAll = (): void => {
    if (students.length > 0) {
      onSubmit(students);
    }
  };

  const handleClearAll = (): void => {
    setStudents([]);
  };

  return (
    <div style={{ 
      padding: '20px', 
      border: '1px solid #ccc', 
      borderRadius: '8px',
      maxWidth: '800px',
      margin: '20px auto'
    }}>
      <h2>Formulario Dinámico de Registro de Estudiantes</h2>
      
      {/* Add Student Form */}
      <form onSubmit={handleAddStudent} style={{ 
        padding: '20px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '4px',
        marginBottom: '20px'
      }}>
        <h3>Agregar Estudiante</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Nombre Completo:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '8px',
                border: errors.name ? '1px solid red' : '1px solid #ccc',
                borderRadius: '4px'
              }}
              placeholder="Ej: Juan Pérez"
            />
            {errors.name && (
              <span style={{ color: 'red', fontSize: '0.8rem' }}>
                {errors.name}
              </span>
            )}
          </div>

          <div>
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
                border: errors.email ? '1px solid red' : '1px solid #ccc',
                borderRadius: '4px'
              }}
              placeholder="juan@email.com"
            />
            {errors.email && (
              <span style={{ color: 'red', fontSize: '0.8rem' }}>
                {errors.email}
              </span>
            )}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginBottom: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Edad:
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              min="16"
              max="100"
              style={{
                width: '100%',
                padding: '8px',
                border: errors.age ? '1px solid red' : '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
            {errors.age && (
              <span style={{ color: 'red', fontSize: '0.8rem' }}>
                {errors.age}
              </span>
            )}
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Curso:
            </label>
            <select
              name="course"
              value={formData.course}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '8px',
                border: errors.course ? '1px solid red' : '1px solid #ccc',
                borderRadius: '4px'
              }}
            >
              <option value="">Seleccionar curso</option>
              {courses.map(course => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
            {errors.course && (
              <span style={{ color: 'red', fontSize: '0.8rem' }}>
                {errors.course}
              </span>
            )}
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Calificación (0-100):
            </label>
            <input
              type="number"
              name="grade"
              value={formData.grade}
              onChange={handleInputChange}
              min="0"
              max="100"
              step="0.1"
              style={{
                width: '100%',
                padding: '8px',
                border: errors.grade ? '1px solid red' : '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
            {errors.grade && (
              <span style={{ color: 'red', fontSize: '0.8rem' }}>
                {errors.grade}
              </span>
            )}
          </div>
        </div>

        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Agregar Estudiante
        </button>
      </form>

      {/* Students List */}
      {students.length > 0 && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h3>Estudiantes Registrados ({students.length})</h3>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleSubmitAll}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Enviar Todos
              </button>
              <button
                onClick={handleClearAll}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Limpiar Lista
              </button>
            </div>
          </div>

          <div style={{ 
            display: 'grid', 
            gap: '10px',
            maxHeight: '400px',
            overflowY: 'auto'
          }}>
            {students.map(student => (
              <div
                key={student.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '15px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  backgroundColor: 'white'
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <div>
                      <strong>{student.name}</strong>
                      <div style={{ fontSize: '0.9rem', color: '#666' }}>
                        {student.email} • {student.age} años
                      </div>
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>
                      {student.course}
                    </div>
                    <div style={{ 
                      fontSize: '0.9rem', 
                      fontWeight: 'bold',
                      color: student.grade >= 80 ? '#28a745' : student.grade >= 60 ? '#ffc107' : '#dc3545'
                    }}>
                      {student.grade}%
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveStudent(student.id)}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentRegistrationForm;
