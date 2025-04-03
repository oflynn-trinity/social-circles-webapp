const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('pages/index', { title: 'Social Circles' });
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

router.get('/play', (req, res) => {
  res.render('pages/play', { title: 'Play Game' });
});

router.get('/samplecharacter', (req, res) => {
  res.render('pages/samplecharacter', { title: 'Character' });
});

module.exports = router;
