const express = require('express');
const db = require('../db/connection');
const router = express.Router();

router.get('/', (req, res) => {
  let loggedIn = 0
  if(req.session.user) loggedIn = 1;

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
      topUsers: result,
      loggedIn
    });
  });
});

router.get('/account', (req, res) => {
  res.render('pages/account', { title: 'My Account' });
});

router.get('/characters', (req, res) => {
  let loggedIn = 0
  if(req.session.user) loggedIn = 1;
  res.render('pages/characters', {
    title: 'Characters',
    loggedIn
  });
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
  let loggedIn = 0
  if(req.session.user) loggedIn = 1;
  res.render('pages/play', { 
    title: 'Play Game',
    loggedIn
  });
});

router.get('/samplecharacter', (req, res) => {
  let loggedIn = 0
  if(req.session.user) loggedIn = 1;
  res.render('pages/samplecharacter', { 
    title: 'Character',
    loggedIn
  });
});

module.exports = router;
