const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// ✅ Create a new account (with password hashing)
router.post('/register', (req, res) => {
  const { username, password } = req.body;

  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error hashing password');
    }

    const sql = `INSERT INTO Account (username, password) VALUES (?, ?)`;
    db.query(sql, [username, hashedPassword], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Username already exists or DB error');
      }
      res.send('Account created with hashed password!');
    });
  });
});

// (You can add other routes like /login or /game below this)

module.exports = router;
