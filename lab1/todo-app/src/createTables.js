const { Pool } = require('pg');
require('/vars/dotenv').config();
 
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

 
const createTables = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      completed BOOLEAN DEFAULT FALSE
    );
  `;

  try {
    console.log('Creating tables...');
    await pool.query(query);
    console.log('Tables created successfully.');
  } catch (err) {
    console.error('Error creating tables:', err.message);
  } finally {
    await pool.end();
    console.log('Database connection closed.');
  }
};
 
createTables();
