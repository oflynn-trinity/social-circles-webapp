const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Create a new account (with password hashing)
router.post('/register', (req, res) => {
  const { username, password } = req.body;

  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) throw err;

    const sql = `INSERT INTO Account (username, password) VALUES (?, ?)`;
    db.query(sql, [username, hashedPassword], (err, result) => {
      if (err) throw err;

      req.session.user = { username: username };
      res.redirect('/play');
    });
  });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const sql = `SELECT * FROM Account WHERE username = ?`;
  db.query(sql, [username], (err, result) => {
    if (err) throw err;

    if (result.length === 0) {
      return res.send('Invalid username or password.');
    }

    const user = result[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;

      if (isMatch) {
        req.session.user = { username: user.username };
        res.redirect('/play');
      } else {
        res.send('Invalid username or password.');
      }
    });
  });
});

router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) throw err;
    res.redirect('/');
  });
});

module.exports = router;
