const express = require('express');
const Page = require('../models').Page;
const User = require('../models').User;
const router = express.Router();

router.get('/', function(req, res) {
    res.redirect('/');
});

router.post('/', function(req, res) {
    //res.json(req.body);
    var page = Page.build({
        title: req.body.title,
        content: req.body.content
    });
    page.save()
    .then(function(data) {
        res.json(data);
    })
    .catch(console.error);
});

router.get('/add', function(req, res) {
    res.render('addpage');
});

router.get('/:urlTitle', function(req, res) {
    Page.findOne({
        where: {
            urlTitle: req.params.urlTitle
        }
    })
    .then(data => res.json(data))
    .catch(next);
})


module.exports = router;