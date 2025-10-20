import React, { useState } from 'react';
import { useApi, useApiMutation } from '../hooks/useApi';
import { Student } from '../types';
import GenericList from './GenericList';

// Componente CRUD completo para estudiantes
// Ejercicio 14: CRUD básico con React, TypeScript y Node.js
const StudentCRUD: React.FC = () => {
  // Hooks personalizados para manejar API calls
  const { data: students, loading, error, refetch } = useApi<Student[]>('/api/students');
  const { mutate: createStudent, loading: creating } = useApiMutation<Omit<Student, 'id' | 'createdAt'>, Student>();
  const { mutate: updateStudent, loading: updating } = useApiMutation<Partial<Student>, Student>();
  const { mutate: deleteStudent, loading: deleting } = useApiMutation();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [formData, setFormData] = useState<Omit<Student, 'id' | 'createdAt'>>({
    name: '',
    email: '',
    age: 0,
    course: '',
    grade: 0
  });

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

  const handleCreate = async (): Promise<void> => {
    try {
      await createStudent('/api/students', 'POST', formData);
      setFormData({ name: '', email: '', age: 0, course: '', grade: 0 });
      setShowForm(false);
      refetch();
    } catch (err) {
      console.error('Error creating student:', err);
    }
  };

  const handleUpdate = async (id: number, data: Partial<Student>): Promise<void> => {
    try {
      await updateStudent(`/api/students/${id}`, 'PUT', data);
      setEditingId(null);
      refetch();
    } catch (err) {
      console.error('Error updating student:', err);
    }
  };

  const handleDelete = async (id: number): Promise<void> => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este estudiante?')) {
      try {
        await deleteStudent(`/api/students/${id}`, 'DELETE');
        refetch();
      } catch (err) {
        console.error('Error deleting student:', err);
      }
    }
  };

  const handleEdit = (student: Student): void => {
    setEditingId(student.id);
    setFormData({
      name: student.name,
      email: student.email,
      age: student.age,
      course: student.course,
      grade: student.grade
    });
  };

  const handleCancelEdit = (): void => {
    setEditingId(null);
    setFormData({ name: '', email: '', age: 0, course: '', grade: 0 });
  };

  const handleSaveEdit = (): void => {
    if (editingId) {
      handleUpdate(editingId, formData);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' || name === 'grade' ? parseFloat(value) || 0 : value
    }));
  };

  const renderStudent = (student: Student, index: number): React.ReactNode => {
    if (editingId === student.id) {
      return (
        <div style={{ padding: '15px', border: '2px solid #007bff', borderRadius: '4px' }}>
          <h4 style={{ marginTop: 0, color: '#007bff' }}>Editando: {student.name}</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Nombre:
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
              />
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
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
              />
            </div>
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
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
              />
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
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
              >
                {courses.map(course => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Calificación:
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
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handleSaveEdit}
              disabled={updating}
              style={{
                padding: '8px 16px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: updating ? 'not-allowed' : 'pointer'
              }}
            >
              {updating ? 'Guardando...' : 'Guardar'}
            </button>
            <button
              onClick={handleCancelEdit}
              style={{
                padding: '8px 16px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      );
    }

    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div>
              <strong style={{ fontSize: '1.1rem' }}>{student.name}</strong>
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
        <div style={{ display: 'flex', gap: '5px' }}>
          <button
            onClick={() => handleEdit(student)}
            style={{
              padding: '5px 10px',
              backgroundColor: '#ffc107',
              color: 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.8rem'
            }}
          >
            Editar
          </button>
          <button
            onClick={() => handleDelete(student.id)}
            disabled={deleting}
            style={{
              padding: '5px 10px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: deleting ? 'not-allowed' : 'pointer',
              fontSize: '0.8rem'
            }}
          >
            {deleting ? 'Eliminando...' : 'Eliminar'}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div style={{ 
      padding: '20px', 
      border: '1px solid #ccc', 
      borderRadius: '8px',
      maxWidth: '1000px',
      margin: '20px auto'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>CRUD de Estudiantes</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {showForm ? 'Cancelar' : 'Agregar Estudiante'}
        </button>
      </div>

      {/* Create Form */}
      {showForm && (
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          <h3>Agregar Nuevo Estudiante</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Nombre:
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
                placeholder="Nombre completo"
              />
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
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
                placeholder="email@ejemplo.com"
              />
            </div>
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
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
              />
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
                  border: '1px solid #ccc',
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
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handleCreate}
              disabled={creating}
              style={{
                padding: '10px 20px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: creating ? 'not-allowed' : 'pointer'
              }}
            >
              {creating ? 'Creando...' : 'Crear Estudiante'}
            </button>
            <button
              onClick={() => setShowForm(false)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Students List */}
      <GenericList
        items={students || []}
        renderItem={renderStudent}
        keyExtractor={(student) => `student-${student.id}`}
        emptyMessage="No hay estudiantes registrados"
        loading={loading}
        error={error}
        onRetry={refetch}
      />
    </div>
  );
};

export default StudentCRUD;
