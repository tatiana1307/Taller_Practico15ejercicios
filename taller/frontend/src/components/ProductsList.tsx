import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Product } from '../types';

const ProductsList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [inStockFilter, setInStockFilter] = useState<boolean | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

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

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || product.category.toLowerCase() === categoryFilter.toLowerCase();
    const matchesStock = inStockFilter === null || product.inStock === inStockFilter;
    
    return matchesSearch && matchesCategory && matchesStock;
  });

  const categories = Array.from(new Set(products.map(p => p.category)));

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
        <h2>Lista de Productos</h2>
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
        <h2>Lista de Productos</h2>
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Lista de Productos</h2>
        <button
          onClick={fetchProducts}
          style={{
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Actualizar
        </button>
      </div>

      {/* Filters */}
      <div style={{ 
        display: 'flex', 
        gap: '15px', 
        marginBottom: '20px', 
        flexWrap: 'wrap',
        padding: '15px',
        backgroundColor: '#f8f9fa',
        borderRadius: '4px'
      }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Buscar:
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Nombre o descripción..."
            style={{
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              width: '200px'
            }}
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Categoría:
          </label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              width: '150px'
            }}
          >
            <option value="">Todas</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Stock:
          </label>
          <select
            value={inStockFilter === null ? '' : inStockFilter.toString()}
            onChange={(e) => {
              const value = e.target.value;
              setInStockFilter(value === '' ? null : value === 'true');
            }}
            style={{
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              width: '120px'
            }}
          >
            <option value="">Todos</option>
            <option value="true">En Stock</option>
            <option value="false">Sin Stock</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666', padding: '40px' }}>
          No se encontraron productos
        </p>
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
                padding: '15px',
                backgroundColor: 'white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <h3 style={{ margin: 0, color: '#333' }}>{product.name}</h3>
                <span style={{
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  backgroundColor: product.inStock ? '#d4edda' : '#f8d7da',
                  color: product.inStock ? '#155724' : '#721c24'
                }}>
                  {product.inStock ? 'En Stock' : 'Sin Stock'}
                </span>
              </div>
              
              <p style={{ 
                color: '#666', 
                marginBottom: '10px',
                fontSize: '0.9rem',
                lineHeight: '1.4'
              }}>
                {product.description}
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ 
                  fontSize: '1.2rem', 
                  fontWeight: 'bold', 
                  color: '#007bff' 
                }}>
                  {formatPrice(product.price)}
                </span>
                <span style={{ 
                  fontSize: '0.8rem', 
                  color: '#666' 
                }}>
                  {product.category}
                </span>
              </div>
              
              <div style={{ 
                marginTop: '10px', 
                fontSize: '0.8rem', 
                color: '#999',
                borderTop: '1px solid #eee',
                paddingTop: '8px'
              }}>
                Agregado: {formatDate(product.createdAt)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      <div style={{ 
        marginTop: '20px', 
        padding: '15px', 
        backgroundColor: '#e9ecef', 
        borderRadius: '4px',
        textAlign: 'center'
      }}>
        <p style={{ margin: 0, color: '#495057' }}>
          Mostrando {filteredProducts.length} de {products.length} productos
        </p>
      </div>
    </div>
  );
};

export default ProductsList;
