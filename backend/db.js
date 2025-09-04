// c:\Users\Stylust 360\OneDrive\Desktop\Corporate-Booking\backend\db.js
const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error('FATAL: DATABASE_URL environment variable is not set.');
}

const isProduction = process.env.NODE_ENV === 'production';

// In a production environment like Render, SSL is required.
// The `rejectUnauthorized: false` is necessary because we are connecting
// within Render's secure internal network and don't need to verify the CA cert.
const sslConfig = isProduction ? { rejectUnauthorized: false } : false;

const pool = new Pool({
    connectionString: connectionString,
    ssl: sslConfig,
});

// Add a listener for connection errors on idle clients.
// This helps detect and log issues with long-lived connections.
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1); // Exit the process to allow the service to restart
});

module.exports = pool;
