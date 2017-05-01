var express = require('express');
const userRoutes = require('./user');
const wikiRoutes = require('./wiki');
const router = express.Router();
const Page = require('../models').Page;

router.get('/', function(req, res, next) {
    Page.findAll()
    .then(data => res.render('index', {pages: data}))
    .catch(next);
})

router.get('/search', function(req, res, next) {
    res.render('tags');
});

router.use('/users', userRoutes);

router.use('/wiki', wikiRoutes);

module.exports = router;