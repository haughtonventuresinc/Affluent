require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 4000;
const DATA_FILE = path.join(__dirname, 'products.json');
const DIGITALGOODS_FILE = path.join(__dirname, 'digitalgoods.json');
const BOOKCLUB_FILE = path.join(__dirname, 'bookclub.json');
const ALLACCESS_FILE = path.join(__dirname, 'allaccess.json');

const allowedOrigins = [
  'http://localhost:5173',
  'https://tryaffluent.xyz',
  'https://affluent-eta.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl, postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
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
// Helper to read/write digital goods
function readDigitalGoods() {
  if (!fs.existsSync(DIGITALGOODS_FILE)) return [];
  return JSON.parse(fs.readFileSync(DIGITALGOODS_FILE, 'utf-8'));
}
function writeDigitalGoods(items) {
  fs.writeFileSync(DIGITALGOODS_FILE, JSON.stringify(items, null, 2));
}
// Helper to read/write book club
function readBookClub() {
  if (!fs.existsSync(BOOKCLUB_FILE)) return [];
  return JSON.parse(fs.readFileSync(BOOKCLUB_FILE, 'utf-8'));
}
function writeBookClub(items) {
  fs.writeFileSync(BOOKCLUB_FILE, JSON.stringify(items, null, 2));
}
// Helper to read/write All-Access Pass
function readAllAccess() {
  if (!fs.existsSync(ALLACCESS_FILE)) {
    // Default All-Access Pass object
    return {
      title: 'All-Access Pass',
      description: 'Get unlimited access to all current and future digital resources',
      price: '$297',
      originalPrice: '$499',
      discountLabel: '40% OFF',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800'
    };
  }
  return JSON.parse(fs.readFileSync(ALLACCESS_FILE, 'utf-8'));
}
function writeAllAccess(data) {
  fs.writeFileSync(ALLACCESS_FILE, JSON.stringify(data, null, 2));
}

// Helper to read/write book club
function readBookClub() {
  if (!fs.existsSync(BOOKCLUB_FILE)) return [];
  return JSON.parse(fs.readFileSync(BOOKCLUB_FILE, 'utf-8'));
}
function writeBookClub(items) {
  fs.writeFileSync(BOOKCLUB_FILE, JSON.stringify(items, null, 2));
}

// Public: Get all products
app.get('/api/products', (req, res) => {
  res.json(readProducts());
});

// All-Access Pass endpoints
app.get('/api/allaccess', (req, res) => {
  res.json(readAllAccess());
});
app.put('/api/allaccess', authMiddleware, (req, res) => {
  const data = req.body;
  writeAllAccess(data);
  res.json(data);
});

// Digital Goods CRUD
app.get('/api/digitalgoods', (req, res) => {
  res.json(readDigitalGoods());
});
app.post('/api/digitalgoods', authMiddleware, (req, res) => {
  const items = readDigitalGoods();
  const newItem = req.body;
  newItem.id = Date.now().toString();
  items.push(newItem);
  writeDigitalGoods(items);
  res.status(201).json(newItem);
});
app.put('/api/digitalgoods/:id', authMiddleware, (req, res) => {
  const items = readDigitalGoods();
  const idx = items.findIndex(i => i.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  items[idx] = { ...items[idx], ...req.body };
  writeDigitalGoods(items);
  res.json(items[idx]);
});
app.delete('/api/digitalgoods/:id', authMiddleware, (req, res) => {
  let items = readDigitalGoods();
  const idx = items.findIndex(i => i.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const deleted = items.splice(idx, 1);
  writeDigitalGoods(items);
  res.json(deleted[0]);
});

// Book Club CRUD
app.get('/api/bookclub', (req, res) => {
  res.json(readBookClub());
});
app.post('/api/bookclub', authMiddleware, (req, res) => {
  const items = readBookClub();
  const newItem = req.body;
  newItem.id = Date.now().toString();
  items.push(newItem);
  writeBookClub(items);
  res.status(201).json(newItem);
});
app.put('/api/bookclub/:id', authMiddleware, (req, res) => {
  const items = readBookClub();
  const idx = items.findIndex(i => i.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  items[idx] = { ...items[idx], ...req.body };
  writeBookClub(items);
  res.json(items[idx]);
});
app.delete('/api/bookclub/:id', authMiddleware, (req, res) => {
  let items = readBookClub();
  const idx = items.findIndex(i => i.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const deleted = items.splice(idx, 1);
  writeBookClub(items);
  res.json(deleted[0]);
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

// All-Access Pass endpoints
app.get('/api/allaccess', (req, res) => {
  res.json(readAllAccess());
});
app.put('/api/allaccess', authMiddleware, (req, res) => {
  const data = req.body;
  writeAllAccess(data);
  res.json(data);
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
