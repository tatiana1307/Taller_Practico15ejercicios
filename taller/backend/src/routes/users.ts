import express from 'express';
import { User } from '../types';

const router = express.Router();

// Mock database
let users: User[] = [
  {
    id: 1,
    username: 'john_doe',
    email: 'john@example.com',
    createdAt: new Date('2023-01-15')
  },
  {
    id: 2,
    username: 'jane_smith',
    email: 'jane@example.com',
    createdAt: new Date('2023-02-20')
  },
  {
    id: 3,
    username: 'bob_wilson',
    email: 'bob@example.com',
    createdAt: new Date('2023-03-10')
  },
  {
    id: 4,
    username: 'alice_brown',
    email: 'alice@example.com',
    createdAt: new Date('2023-04-05')
  },
  {
    id: 5,
    username: 'charlie_davis',
    email: 'charlie@example.com',
    createdAt: new Date('2023-05-12')
  }
];

// Get all users
router.get('/', (req, res) => {
  res.json(users);
});

// Get user by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  res.json(user);
});

// Create new user
router.post('/', (req, res) => {
  const { username, email } = req.body;
  
  if (!username || !email) {
    return res.status(400).json({ error: 'Username and email are required' });
  }
  
  const newUser: User = {
    id: users.length + 1,
    username,
    email,
    createdAt: new Date()
  };
  
  users.push(newUser);
  res.status(201).json(newUser);
});

// Update user
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  const { username, email } = req.body;
  users[userIndex] = {
    ...users[userIndex],
    username: username || users[userIndex].username,
    email: email || users[userIndex].email
  };
  
  res.json(users[userIndex]);
});

// Delete user
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  users.splice(userIndex, 1);
  res.status(204).send();
});

export default router;
