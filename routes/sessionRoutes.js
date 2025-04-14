const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.post('/update', (req, res) => {
    const { session_id } = req.body;
    const query = `UPDATE Session SET last_active = NOW() WHERE session_id = ?`;

    db.query(query, [session_id], (err) => {
        if (err) {
            return res.status(500).send('DB error');
        }
        res.send('Session updated');
    });
});

module.exports = router;
