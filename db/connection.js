const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    console.log('DB Name:', process.env.DB_NAME);
    if (err) {
        console.error(' DB connection failed:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

module.exports = db;
