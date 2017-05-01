const express = require('express');
const db = require('../models')
const router = express.Router();

router.get('/', function(req, res) {
    res.redirect('/');
});

router.post('/', function(req, res) {
    res.json(req.body);
});

router.get('/add', function(req, res) {
    res.render('addpage');
});

module.exports = router;