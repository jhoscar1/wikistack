const express = require('express');
const db = require('../models')
const router = express.Router();

router.get('/', function(req, res) {
    res.send('<h1>Wiki</h1>');
})

router.post('/', function(req, res) {
    res.send('<h1>Wiki</h1>');
})

router.get('/add', function(req, res) {
    res.send('<h1>Wiki</h1>');
})

module.exports = router;