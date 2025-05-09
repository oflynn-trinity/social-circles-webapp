const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Create a new account (with password hashing)
router.post('/register', (req, res) => {
  const { username, password, confirm_password } = req.body;

  if (!username || !password || !confirm_password) {
    return  res.render('pages/createaccount', { title : 'Create Account', error: "Please fill in all fills"});
  }

  if (password !== confirm_password) {
    return  res.render('pages/createaccount', { title : 'Create Account', error: "Incorrect Password"});
  }

  // Check if username already exists
  const checkSql = `SELECT * FROM Account WHERE username = ?`;
  db.query(checkSql, [username], (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      return res.render('pages/createaccount', { title : 'Create Account', error: "Username already exists"});
    }

    // Proceed with adding account
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
      if (err) throw err;

      const sql = `INSERT INTO Account (username, password) VALUES (?, ?)`;
      db.query(sql, [username, hashedPassword], (err, result) => {
        if (err) throw err;

        req.session.user = { username: username };
        res.redirect('/playonline');
      });
    });
  });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const sql = `SELECT * FROM Account WHERE username = ? AND active = 1`;
  db.query(sql, [username], (err, result) => {
    if (err) throw err;

    if (result.length === 0) {
      let errorMsg ="No Such Username"
      res.render('pages/login', { title: 'Login', error: errorMsg});
    }else{ 
      const user = result[0];

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;

        if (isMatch) {
          req.session.user = { username: user.username };
          res.redirect('/playonline');
        } else {
          errorMsg = "Incorrect Paswword";
          res.render('pages/login', { title: 'Login', error: errorMsg});
        }
      });
    }
  });
});

router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) throw err;
    res.redirect('/');
  });
});

router.post('/change-username', (req, res) => {
  const { newUsername } = req.body;

  if (!newUsername) {
    return res.render('pages/editaccount', { title : 'Edit Account', error: 'Username cannot be blank.'});
  }

  if (!req.session.user) {
    return res.render('pages/editaccount', { title : 'Edit Account', error: 'You must be logged in to change your username.'});
  }
  const currentUsername = req.session.user.username;

  // Check if new username already exists
  const checkSql = `SELECT * FROM Account WHERE username = ?`;
  db.query(checkSql, [newUsername], (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      return res.render('pages/editaccount', { title : 'Edit Account', error: 'Username already exists.'});
    }

    // If username doesn't exist, proceed with update
    const sql = `UPDATE Account SET username = ? WHERE username = ?`;
    db.query(sql, [newUsername, currentUsername], (err, result) => {
      if (err) throw err;

      req.session.user.username = newUsername;
      res.redirect('/account');
    });
  });
});

router.post('/change-password', (req, res) => {
  const { newPassword, confirm_new_password } = req.body;

  if (!req.session.user) {
    return res.render('pages/editaccount', { title : 'Edit Account', error: 'You must be logged in to change your password.'});
  }

  const username = req.session.user.username;

  if (!newPassword || !confirm_new_password) {
    return res.render('pages/editaccount', { title : 'Edit Account', error: 'Password and confirmation are required.'});    
  }

  if (newPassword !== confirm_new_password) {
    return res.render('pages/editaccount', { title : 'Edit Account', error: 'Passwords do not match.'});    
  }

  bcrypt.hash(newPassword, 10, (err, newHashedPassword) => {
    if (err) throw err;

    const updateSql = `UPDATE Account SET password = ? WHERE username = ?`;
    db.query(updateSql, [newHashedPassword, username], (err, result) => {
      if (err) throw err;
      res.redirect('/account');
    });
  });
});

router.post('/delete-account', (req, res) => {
  if (!req.session.user) {
    return res.status(401).send('You must be logged in to delete your account.');
  }

  const username = req.session.user.username;
  const sql = `DELETE FROM Account WHERE username = ?`;
  
  db.query(sql, [username], (err, result) => {
    if (err) throw err;
    
    req.session.destroy(err => {
      if (err) throw err;
      res.redirect('/');
    });
  });
});

module.exports = router;
