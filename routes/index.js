var express = require('express');
const userRoutes = require('./user');
const wikiRoutes = require('./wiki');
const router = express.Router();

router.get('/', function(req, res) {
    res.render('index');
})

router.use('/user', userRoutes);

router.use('/wiki', wikiRoutes);

module.exports = router;