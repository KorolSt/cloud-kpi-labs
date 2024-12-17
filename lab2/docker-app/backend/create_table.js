const { Pool } = require('pg');
 
require('dotenv').config();
 
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,  
  },
});

(async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        context TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    console.log('Connecting to the database...');
    const client = await pool.connect();
    console.log('Connected successfully.');

    console.log('Creating table...');
    await client.query(createTableQuery);
    console.log('Table created or already exists.');

    client.release();
  } catch (error) {
    console.error('Error creating table:', error);
  } finally {
    await pool.end();
    console.log('Database connection closed.');
  }
})();
