import express from 'express';
import { Product } from '../types';

const router = express.Router();

// Base de datos simulada con productos en español y precios en pesos colombianos
let products: Product[] = [
  {
    id: 1,
    name: 'Laptop Gamer',
    description: 'Laptop de alto rendimiento para gaming con RTX 4060',
    price: 4500000, // 4.5 millones de pesos
    category: 'Electrónicos',
    inStock: true,
    createdAt: new Date('2023-01-15')
  },
  {
    id: 2,
    name: 'Smartphone Pro',
    description: 'Teléfono inteligente con sistema de cámara avanzado',
    price: 3200000, // 3.2 millones de pesos
    category: 'Electrónicos',
    inStock: true,
    createdAt: new Date('2023-02-20')
  },
  {
    id: 3,
    name: 'Audífonos Inalámbricos',
    description: 'Audífonos inalámbricos con cancelación de ruido',
    price: 750000, // 750 mil pesos
    category: 'Audio',
    inStock: false,
    createdAt: new Date('2023-03-10')
  },
  {
    id: 4,
    name: 'Teclado Mecánico',
    description: 'Teclado mecánico RGB para gaming',
    price: 550000, // 550 mil pesos
    category: 'Accesorios',
    inStock: true,
    createdAt: new Date('2023-04-05')
  },
  {
    id: 5,
    name: 'Mouse Gaming',
    description: 'Mouse de alta precisión para gaming con iluminación RGB',
    price: 300000, // 300 mil pesos
    category: 'Accesorios',
    inStock: true,
    createdAt: new Date('2023-05-12')
  },
  {
    id: 6,
    name: 'Monitor 4K',
    description: 'Monitor de 27 pulgadas con resolución 4K para gaming',
    price: 1800000, // 1.8 millones de pesos
    category: 'Electrónicos',
    inStock: true,
    createdAt: new Date('2023-06-01')
  },
  {
    id: 7,
    name: 'Tablet Pro',
    description: 'Tablet profesional para diseño y productividad',
    price: 2500000, // 2.5 millones de pesos
    category: 'Electrónicos',
    inStock: true,
    createdAt: new Date('2023-06-15')
  },
  {
    id: 8,
    name: 'Cámara Web HD',
    description: 'Cámara web de alta definición para streaming',
    price: 450000, // 450 mil pesos
    category: 'Accesorios',
    inStock: false,
    createdAt: new Date('2023-07-01')
  },
  {
    id: 9,
    name: 'Altavoces Bluetooth',
    description: 'Altavoces portátiles con conectividad Bluetooth',
    price: 280000, // 280 mil pesos
    category: 'Audio',
    inStock: true,
    createdAt: new Date('2023-07-10')
  },
  {
    id: 10,
    name: 'Disco Duro SSD',
    description: 'Disco duro sólido de 1TB para almacenamiento rápido',
    price: 380000, // 380 mil pesos
    category: 'Accesorios',
    inStock: true,
    createdAt: new Date('2023-07-20')
  }
];

// Get all products
router.get('/', (req, res) => {
  const { category, inStock, search } = req.query;
  
  let filteredProducts = [...products];
  
  // Filter by category
  if (category) {
    filteredProducts = filteredProducts.filter(p => 
      p.category.toLowerCase() === (category as string).toLowerCase()
    );
  }
  
  // Filter by stock status
  if (inStock !== undefined) {
    const inStockBool = inStock === 'true';
    filteredProducts = filteredProducts.filter(p => p.inStock === inStockBool);
  }
  
  // Search by name or description
  if (search) {
    const searchTerm = (search as string).toLowerCase();
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm)
    );
  }
  
  res.json(filteredProducts);
});

// Get product by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  res.json(product);
});

// Create new product
router.post('/', (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  
  if (!name || !description || !price || !category) {
    return res.status(400).json({ error: 'Name, description, price, and category are required' });
  }
  
  const newProduct: Product = {
    id: products.length + 1,
    name,
    description,
    price: parseFloat(price),
    category,
    inStock: inStock !== undefined ? inStock : true,
    createdAt: new Date()
  };
  
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Update product
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex(p => p.id === id);
  
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  const { name, description, price, category, inStock } = req.body;
  products[productIndex] = {
    ...products[productIndex],
    name: name || products[productIndex].name,
    description: description || products[productIndex].description,
    price: price !== undefined ? parseFloat(price) : products[productIndex].price,
    category: category || products[productIndex].category,
    inStock: inStock !== undefined ? inStock : products[productIndex].inStock
  };
  
  res.json(products[productIndex]);
});

// Delete product
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex(p => p.id === id);
  
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  products.splice(productIndex, 1);
  res.status(204).send();
});

export default router;
