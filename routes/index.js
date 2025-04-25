const express = require('express');
const db = require('../db/connection');
const router = express.Router();

router.get('/', (req, res) => {
  let sql = `
    SELECT username, score
    FROM Account
    ORDER BY score DESC
    LIMIT 10;
  `;

  db.query(sql,(err,result) =>{
    if(err) throw err;

    res.render('pages/index', { 
      title: 'Home',
      topUsers: result
    });
  });
});

router.get('/account', (req, res) => {
  res.render('pages/account', { title: 'My Account' });
});

router.get('/characters', (req, res) => {
  res.render('pages/characters', { title: 'Characters' });
});

router.get('/login', (req, res) => {
  res.render('pages/login', { title: 'Login' });
});

router.get('/createaccount', (req, res) => {
  res.render('pages/createaccount', { title : 'Create Account'});
});

router.get('/editaccount', (req, res) => {
  res.render('pages/editaccount', { title : 'Edit Account'});
});

router.get('/play', (req, res) => {
  res.render('pages/play', { title: 'Play Game' });
});

router.get('/samplecharacter', (req, res) => {
  res.render('pages/samplecharacter', { title: 'Character' });
});

module.exports = router;
