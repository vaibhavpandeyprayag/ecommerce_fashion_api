const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // required for Supabase
  },
});

pool.connect().then((res, err) => {
  if (res) {
    console.log("Database connected");
  }
  if (err) {
    console.log(err);
  }
});

module.exports = pool;
