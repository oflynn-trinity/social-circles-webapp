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
  if(!req.session.user) res.redirect('/login');

  const username = req.session.user.username;
  const sqlScore = `
  SELECT username, score FROM Account WHERE username = ?
  `;

  db.query(sqlScore, [username], (err, scoreResult) => {
    if(err) throw err;

    const score = scoreResult[0].score;

    const sqlRank = `
      SELECT COUNT(*) + 1 AS ranking
      FROM Account
      WHERE score > ?
    `;

    db.query(sqlRank, [score], (err, rankResult) => {
      if(err) throw err;

      const rank = rankResult[0].ranking;

      res.render('pages/account', {
        title: 'My Account',
        username: username,
        score: score,
        rank: rank
      });
    });
  });
});

router.get('/characters', (req, res) => {
  let loggedIn = 0
  if(req.session.user) loggedIn = 1;

  const sql = `SELECT name, thumbnail_url FROM Characters`;

  db.query(sql, (err, result) => {
    if(err) throw err;

    let chars = []
    result.forEach(row =>{
      chars.push({name : row.name, thumbnail_url: row.thumbnail_url})
    });

    res.render('pages/characters', {
      title: 'Characters',
      loggedIn,
      chars : chars
    });
  });
});

router.get('/login', (req, res) => {
  if(req.session.user) res.redirect('/account');
  res.render('pages/login', { title: 'Login' });
});

router.get('/createaccount', (req, res) => {
  if(req.session.user) res.redirect('/account');
  res.render('pages/createaccount', { title : 'Create Account'});
});

router.get('/editaccount', (req, res) => {
  if(!req.session.user) res.redirect('/login');
  res.render('pages/editaccount', { title : 'Edit Account'});
});

router.get('/playoffline', (req, res) => {
  if(req.session.user) res.redirect('/playonline');

  const sqlChars = `
  SELECT name, thumbnail_url, likes_compliments, likes_help, likes_events
  FROM Characters;
  `;

  db.query(sqlChars,(err, charResult) => {
    if(err) throw err;

    let chars = [];

    charResult.forEach(character => {
      chars.push({
        name: character.name,
        thumbnail_url: character.thumbnail_url,
        likes: [
          character.likes_compliments,
          character.likes_help,
          character.likes_events
        ]
      });
    });

    res.render('pages/playoffline', { 
      title: 'Play Game',
      chars
    });
  });
});

router.get('/playonline', (req, res) => {
  if(!req.session.user) res.redirect('/playoffline');
  const sqlChars = `
  SELECT name, thumbnail_url, likes_compliments, likes_help, likes_events
  FROM Characters;
  `;

  db.query(sqlChars,(err, charResult) => {
    if(err) throw err;

    let chars = [];

    charResult.forEach(character => {
      chars.push({
        name: character.name,
        thumbnail_url: character.thumbnail_url,
        likes: [
          character.likes_compliments,
          character.likes_help,
          character.likes_events
        ]
      });
    });

    const username = req.session.user.username;
    const sqlUser = `
    SELECT score FROM Account WHERE username = ?;
    `;

    db.query(sqlUser, username, (err, scoreResult) => {
      if(err) throw err;

      res.render('pages/playonline', { 
        title: 'Play Game',
        chars,
        username,
        userScore: scoreResult[0].score
      });
    });
  });
});

router.post('/update-score', (req, res) => {
  const username = req.session.user.username;
  const newScore = req.body.score; 

  const sql = `UPDATE Account SET score = ? WHERE username = ?`;

  db.query(sql, [newScore, username], (err, result) => {
    if (err) throw err;
    res.json(null);

  });
});

router.get('/character/:name', (req, res) => {
  const name = req.params.name;
  let loggedIn = 0
  if(req.session.user) loggedIn = 1;

  const sql = `
    SELECT thumbnail_url, likes_compliments, likes_help, likes_events
    FROM Characters
    WHERE name = ?;
  `;

  db.query(sql, [name], (err, result) => {
    if(err) throw err;

    const character = result[0];

    res.render('pages/samplecharacter', { 
      title: 'Character',
      loggedIn,
      name,
      thumbnail_url: character.thumbnail_url,
      likes_compliments: character.likes_compliments,
      likes_help: character.likes_help,
      likes_events: character.likes_events
    });
  });
});

module.exports = router;
