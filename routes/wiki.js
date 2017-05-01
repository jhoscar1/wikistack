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
            page.getAuthor()
                .then(user => {
                res.render('wikipage', {page: page, user: user})
            })
        }
    })
    .catch(next);
})


module.exports = router;