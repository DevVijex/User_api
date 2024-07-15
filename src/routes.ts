import express from 'express';
const router = express.Router();

interface User {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
}

let users: User[] = [];
let currentId = 1;

// Create a new user
router.post('/users', (req, res) => {
  const { firstName, lastName, dateOfBirth, email } = req.body;
  const newUser: User = { id: currentId++, firstName, lastName, dateOfBirth, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Get all users
router.get('/users', (req, res) => {
  res.json(users);
});

// Get a specific user by ID
router.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

// Update a user by ID
router.put('/users/:id', (req, res) => {
  const { firstName, lastName, dateOfBirth, email } = req.body;
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.firstName = firstName || user.firstName;
  user.lastName = lastName || user.lastName;
  user.dateOfBirth = dateOfBirth || user.dateOfBirth;
  user.email = email || user.email;

  res.json(user);
});

// Delete a user by ID
router.delete('/users/:id', (req, res) => {
  users = users.filter(u => u.id !== parseInt(req.params.id));
  res.status(204).end();
});

export default router;
