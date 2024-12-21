const { Pool } = require('pg');

// Create a connection pool
const pool = new Pool({
  host: 'localhost',       // Database host
  user: 'postgres',        // Replace with your DB username
  password: 'mysecurepassword', // Replace with your DB password
  database: 'mydatabase', // Replace with your DB name
  port: 5432,              // PostgreSQL port (default: 5432)
  max: 20,                 // Maximum number of connections in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Timeout for new connections (2 seconds)
});

// Function to test connection
async function connectDB() {
  let client;
  try {
    // Test the pool by getting a client
    client = await pool.connect();
    console.log("Connected to the database successfully >>>");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }finally{
    if(client){
      client.release();
    }
  }
}

module.exports = { connectDB,pool };
