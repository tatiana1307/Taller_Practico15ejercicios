import React, { useState } from 'react';
import { useTodos } from '../context/TodoContext';

const TodoList: React.FC = () => {
  const { todos, addTodo, toggleTodo, deleteTodo, editTodo } = useTodos();
  const [newTodoText, setNewTodoText] = useState<string>('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>('');

  const handleAddTodo = (e: React.FormEvent): void => {
    e.preventDefault();
    if (newTodoText.trim()) {
      addTodo(newTodoText.trim());
      setNewTodoText('');
    }
  };

  const handleEditStart = (id: number, currentText: string): void => {
    setEditingId(id);
    setEditText(currentText);
  };

  const handleEditSave = (id: number): void => {
    if (editText.trim()) {
      editTodo(id, editText.trim());
      setEditingId(null);
      setEditText('');
    }
  };

  const handleEditCancel = (): void => {
    setEditingId(null);
    setEditText('');
  };

  return (
    <div style={{ 
      padding: '20px', 
      border: '1px solid #ccc', 
      borderRadius: '8px', 
      maxWidth: '600px',
      margin: '20px auto'
    }}>
      <h2>Todo List con Context API + TypeScript</h2>
      
      {/* Add new todo form */}
      <form onSubmit={handleAddTodo} style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            placeholder="Agregar nueva tarea..."
            style={{
              flex: 1,
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
          <button
            type="submit"
            style={{
              padding: '8px 16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Agregar
          </button>
        </div>
      </form>

      {/* Todo list */}
      <div>
        {todos.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666' }}>
            No hay tareas pendientes
          </p>
        ) : (
          todos.map(todo => (
            <div
              key={todo.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
                border: '1px solid #eee',
                borderRadius: '4px',
                marginBottom: '8px',
                backgroundColor: todo.completed ? '#f0f8f0' : 'white'
              }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                style={{ marginRight: '10px' }}
              />
              
              {editingId === todo.id ? (
                <div style={{ display: 'flex', flex: 1, gap: '5px' }}>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '4px',
                      border: '1px solid #ccc',
                      borderRadius: '4px'
                    }}
                    autoFocus
                  />
                  <button
                    onClick={() => handleEditSave(todo.id)}
                    style={{
                      padding: '4px 8px',
                      backgroundColor: '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    ✓
                  </button>
                  <button
                    onClick={handleEditCancel}
                    style={{
                      padding: '4px 8px',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    ✗
                  </button>
                </div>
              ) : (
                <>
                  <span
                    style={{
                      flex: 1,
                      textDecoration: todo.completed ? 'line-through' : 'none',
                      color: todo.completed ? '#666' : 'black'
                    }}
                  >
                    {todo.text}
                  </span>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <button
                      onClick={() => handleEditStart(todo.id, todo.text)}
                      style={{
                        padding: '4px 8px',
                        backgroundColor: '#ffc107',
                        color: 'black',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      style={{
                        padding: '4px 8px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>

      {/* Stats */}
      <div style={{ 
        marginTop: '20px', 
        padding: '10px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '4px',
        textAlign: 'center'
      }}>
        <p>
          Total: {todos.length} | 
          Completadas: {todos.filter(t => t.completed).length} | 
          Pendientes: {todos.filter(t => !t.completed).length}
        </p>
      </div>
    </div>
  );
};

export default TodoList;
