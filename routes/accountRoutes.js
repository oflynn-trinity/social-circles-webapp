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
      if (err) {
        let duplicSQL = `select username from Account where username = ` 
        + db.escape(username) + `;`;
        db.query(duplicSQL, (err,result) =>{
          if(err) throw err;
          
          if(result[0].length != 0){
            res.render('pages/createaccount', { title : 'Create Account', error: 'Duplicate Username'});
          }
        })
      }
      else {
        req.session.user = { username: username };
        res.redirect('/playonline');
      }
    });
  });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const sql = `SELECT * FROM Account WHERE username = ?`;
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
  if (!req.session.user) {
    return res.status(401).send('You must be logged in to change your username.');
  }
  const currentUsername = req.session.user.username;

  const sql = `UPDATE Account SET username = ? WHERE username = ?`;
  db.query(sql, [newUsername, currentUsername], (err, result) => {
    if (err) throw err;

    req.session.user.username = newUsername;

    res.redirect('/account');
  });
});

router.post('/change-password', (req, res) => {
  const { newPassword } = req.body;

  if (!req.session.user) {
    return res.status(401).send('You must be logged in to change your password.');
  }

  const username = req.session.user.username;

  bcrypt.hash(newPassword, 10, (err, newHashedPassword) => {
    if (err) throw err;

    const updateSql = `UPDATE Account SET password = ? WHERE username = ?`;
    db.query(updateSql, [newHashedPassword, username], (err, result) => {
      if (err) throw err;
      res.redirect('/account');
    });
  });
});

module.exports = router;
