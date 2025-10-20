import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Product, SearchFilters } from '../types';

// Componente de búsqueda y filtros avanzados
// Ejercicio 9: Filtro de búsqueda sobre lista desde API
const SearchFilter: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: '',
    inStock: undefined
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [products, filters]);

  const fetchProducts = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get<Product[]>('/api/products');
      setProducts(response.data);
    } catch (err) {
      setError('Error al cargar los productos');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (): void => {
    let filtered = [...products];

    // Filtrar por término de búsqueda
    if (filters.query) {
      const query = filters.query.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }

    // Filtrar por categoría
    if (filters.category) {
      filtered = filtered.filter(product =>
        product.category.toLowerCase() === filters.category!.toLowerCase()
      );
    }

    // Filtrar por estado de stock
    if (filters.inStock !== undefined) {
      filtered = filtered.filter(product => product.inStock === filters.inStock);
    }

    setFilteredProducts(filtered);
  };

  // Función para manejar cambios en los filtros
  const handleFilterChange = (key: keyof SearchFilters, value: string | boolean | undefined): void => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Función para limpiar todos los filtros
  const clearFilters = (): void => {
    setFilters({
      query: '',
      category: '',
      inStock: undefined
    });
  };

  const categories = Array.from(new Set(products.map(p => p.category)));

  // Función para formatear precios en pesos colombianos
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(price);
  };

  if (loading) {
    return (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center',
        border: '1px solid #ccc', 
        borderRadius: '8px',
        maxWidth: '1000px',
        margin: '20px auto'
      }}>
        <h2>Búsqueda y Filtros</h2>
        <p>Cargando productos...</p>
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
        maxWidth: '1000px',
        margin: '20px auto',
        backgroundColor: '#f8d7da',
        color: '#721c24'
      }}>
        <h2>Búsqueda y Filtros</h2>
        <p>{error}</p>
        <button
          onClick={fetchProducts}
          style={{
            padding: '8px 16px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '20px', 
      border: '1px solid #ccc', 
      borderRadius: '8px',
      maxWidth: '1000px',
      margin: '20px auto'
    }}>
      <h2>Búsqueda y Filtros Avanzados</h2>
      
      {/* Search and Filter Controls */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '15px', 
        marginBottom: '20px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px'
      }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            🔍 Buscar:
          </label>
          <input
            type="text"
            value={filters.query}
            onChange={(e) => handleFilterChange('query', e.target.value)}
            placeholder="Nombre o descripción..."
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            📂 Categoría:
          </label>
          <select
            value={filters.category || ''}
            onChange={(e) => handleFilterChange('category', e.target.value || undefined)}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          >
            <option value="">Todas las categorías</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            📦 Stock:
          </label>
          <select
            value={filters.inStock === undefined ? '' : filters.inStock.toString()}
            onChange={(e) => {
              const value = e.target.value;
              handleFilterChange('inStock', value === '' ? undefined : value === 'true');
            }}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          >
            <option value="">Todos</option>
            <option value="true">En Stock</option>
            <option value="false">Sin Stock</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'end' }}>
          <button
            onClick={clearFilters}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            🗑️ Limpiar Filtros
          </button>
        </div>
      </div>

      {/* Results Summary */}
      <div style={{ 
        marginBottom: '20px', 
        padding: '15px', 
        backgroundColor: '#e9ecef', 
        borderRadius: '4px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <strong>Resultados: {filteredProducts.length} de {products.length} productos</strong>
        </div>
        <div style={{ fontSize: '0.9rem', color: '#666' }}>
          {filters.query && `Buscando: "${filters.query}"`}
          {filters.category && ` • Categoría: ${filters.category}`}
          {filters.inStock !== undefined && ` • Stock: ${filters.inStock ? 'Disponible' : 'Agotado'}`}
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px',
          color: '#666',
          backgroundColor: '#f8f9fa',
          borderRadius: '4px'
        }}>
          <h3>No se encontraron productos</h3>
          <p>Intenta ajustar los filtros de búsqueda</p>
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '20px' 
        }}>
          {filteredProducts.map(product => (
            <div
              key={product.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '20px',
                backgroundColor: 'white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                <h3 style={{ margin: 0, color: '#333', fontSize: '1.1rem' }}>
                  {product.name}
                </h3>
                <span style={{
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  backgroundColor: product.inStock ? '#d4edda' : '#f8d7da',
                  color: product.inStock ? '#155724' : '#721c24'
                }}>
                  {product.inStock ? '✓ En Stock' : '✗ Agotado'}
                </span>
              </div>
              
              <p style={{ 
                color: '#666', 
                marginBottom: '15px',
                fontSize: '0.9rem',
                lineHeight: '1.4'
              }}>
                {product.description}
              </p>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                borderTop: '1px solid #eee',
                paddingTop: '15px'
              }}>
                <span style={{ 
                  fontSize: '1.3rem', 
                  fontWeight: 'bold', 
                  color: '#007bff' 
                }}>
                  {formatPrice(product.price)}
                </span>
                <span style={{ 
                  fontSize: '0.9rem', 
                  color: '#666',
                  backgroundColor: '#f8f9fa',
                  padding: '4px 8px',
                  borderRadius: '4px'
                }}>
                  {product.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
