const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL ,
  ssl: { rejectUnauthorized: false },
});

const createTableQuery = `
CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

const initializeDB = async () => {
  try {
    await pool.query(createTableQuery);
    console.log('Database table created successfully!');
  } catch (err) {
    console.error('Error creating table:', err);
  } finally {
    pool.end();
  }
};

initializeDB();
