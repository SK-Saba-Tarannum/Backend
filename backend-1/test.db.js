require('dotenv').config();

const fs = require('fs');

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    ca: fs.readFileSync('./certs/ca.pem').toString()

    // rejenodectUnauthorized: false // Use true + CA cert in prod
  }
});

client.connect()
  .then(() => {
    console.log('✅ Connection successful');
    return client.end();
  })
  .catch(err => {
    console.error('❌ Connection failed:', err.message);
  });
