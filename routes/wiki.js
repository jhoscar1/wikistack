const express = require('express');
const Page = require('../models').Page;
const User = require('../models').User;
const router = express.Router();

router.get('/', function(req, res) {
    res.redirect('/');
});

router.post('/', function(req, res, next) {
    User.findOrCreate({
        where: {
            name: req.body.name,
            email: req.body.email
        }
    }).then(data => {
        var user = data[0];
        var page = Page.build({
            title: req.body.title,
            content: req.body.content,
            tags: req.body.tags.split(" ")
        });
        return page.save().then(function(page) {
            return page.setAuthor(user);
        });
    })
    .then(function(page) {
        res.redirect(page.route)
    })
    .catch(next);
});

router.get('/add', function(req, res) {
    res.render('addpage');
});

router.get('/search', function(req, res, next) {
    Page.findByTag(req.query.tags)
    .then(pages => {
        console.log(pages);
        res.render('index', {pages});
    })
});

router.get('/:urlTitle', function(req, res, next) {
    Page.findOne({
        where: {
            urlTitle: req.params.urlTitle
        }
    })
    .then(page => {
        if (page === null) {
            res.sendStatus(404);
        }
        else {
            var tags = page.tags;
            page.getAuthor()
                .then(user => {
                res.render('wikipage', {page, user, tags})
            })
        }
    })
    .catch(next);
});


module.exports = router;