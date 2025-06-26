require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 4000;
const DATA_FILE = path.join(__dirname, 'products.json');

app.use(cors());
app.use(express.json({ limit: '20mb' }));

// Auth middleware
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
}

// Login route
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '6h' });
    return res.json({ token });
  }
  res.status(401).json({ error: 'Invalid credentials' });
});


// Helper to read/write products
function readProducts() {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
}
function writeProducts(products) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2));
}

// Public: Get all products
app.get('/api/products', (req, res) => {
  res.json(readProducts());
});

// Protected: Add a new product
app.post('/api/products', authMiddleware, (req, res) => {
  const products = readProducts();
  const newProduct = req.body;
  newProduct.id = Date.now().toString();
  products.push(newProduct);
  writeProducts(products);
  res.status(201).json(newProduct);
});

// Protected: Update a product
app.put('/api/products/:id', authMiddleware, (req, res) => {
  const products = readProducts();
  const idx = products.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Product not found' });
  products[idx] = { ...products[idx], ...req.body };
  writeProducts(products);
  res.json(products[idx]);
});

// Protected: Delete a product
app.delete('/api/products/:id', authMiddleware, (req, res) => {
  let products = readProducts();
  const idx = products.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Product not found' });
  const deleted = products.splice(idx, 1);
  writeProducts(products);
  res.json(deleted[0]);
});


// Start server
app.listen(PORT, () => {
  console.log(`Affluent Admin API running on http://localhost:${PORT}`);
});
