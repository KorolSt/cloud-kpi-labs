const express = require("express");
const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = 3000;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

app.get("/", async (req, res) => {
    const result = await pool.query("SELECT NOW()");
    res.send(`Hello from Backend! Current time: ${result.rows[0].now}`);
});

app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`);
});
