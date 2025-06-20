const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 5500;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ONLINE_PET-STORE',
  password: 'password',
  port: 5432,
});

app.use(cors());
app.use(express.json());

app.post('/signup', async (req, res) => {
    const { username, password, email } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO signup (user_name, e_mail, password) VALUES ($1, $2, $3) returning *',
        [username, email, password]
      );
      res.json({ success: true, message: 'Signup successful' });
    } catch (error) {
      console.error('Error executing database query:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message,
      });
    }
  });

  app.post('/users', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const client = await pool.connect();
      const result = await client.query(
        'SELECT * FROM signup WHERE user_name = $1 AND password = $2',
        [username, password]
      );
  
      client.release();
  
      if (result.rows.length > 0) {
        res.json({
          success: true,
          message: 'Login successful',
        });
      } else {
        res.json({ success: false, message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Error executing database query:', error);
      res.status(500).json({ success: false, message: 'Internal server error'});
    }
  });

  app.get('/products', async (req, res) => {
    try {
      const result = await pool.query(
        'SELECT * FROM products '
      );
        res.json(result.rows);
    } catch (error) {
      console.error('Error executing database query:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
  }
  
  });

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });














