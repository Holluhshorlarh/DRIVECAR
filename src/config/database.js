const mongoose = require("mongoose");
require("dotenv").config();
const { MONGO_URI } = process.env;
const { Pool } = require('pg');

// mongodb connection
 exports.connectDB = async () => { 
  try {
  const connection = await mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  console.log("Connected to MongoDb")
} catch(error) {
    console.error(error);
}
 }

// postgres connection

exports.pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// otherModule.js
const { pool } = require('./database');

pool.connect((error) => {
  if (error) {
      throw error;
  }
  console.log('Connected to postgres');
});