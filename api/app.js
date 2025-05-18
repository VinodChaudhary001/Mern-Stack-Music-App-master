require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mysql = require('mysql2');

// Import routes (make sure you update them to use MySQL too)
const adminRouter = require('./routes/auth');
const categoryRouter = require('./routes/category');
const songRouter = require('./routes/song');
const favoriteRouter = require('./routes/favorite');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/uploads', express.static(__dirname + '/uploads'));

// MySQL connection pool
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASS || '',
  database: process.env.MYSQL_DB || 'musicAppDB',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Simple helper to use pool.query with promises
const promisePool = pool.promise();

// API route to get admin profile
app.get('/api/getAdminProfile', async (req, res) => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM users WHERE role = "admin" LIMIT 1');
    if (rows.length > 0) {
      res.json({ AdminProfile: rows[0], successMsg: 'Admin profile retrieved successfully' });
    } else {
      res.status(404).json({ errorMsg: 'Admin profile not found' });
    }
  } catch (error) {
    console.error('❌ Error retrieving admin profile:', error);
    res.status(500).json({ errorMsg: 'Server error while retrieving admin profile' });
  }
});

// Pass MySQL pool to routers if needed (you can modify your routes to accept it)
app.use('/api', adminRouter);
app.use('/api', songRouter);
app.use('/api', categoryRouter);
app.use('/api', favoriteRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = { pool, promisePool };
