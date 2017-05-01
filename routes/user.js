const express = require('express');
const router = express.Router();
const User = require('../models').User;
const Page = require('../models').Page;

module.exports = router;

router.get('/', function(req, res, next) {
  User.findAll({}).then(function(users){
    res.render('users', { users: users });
  }).catch(next);
});


router.get('/:id', function(req, res, next) {
    var userPromise = User.findOne({
        where: {
           id : req.params.id
        }
    });
    var pagePromise = Page.findAll({
        where: {
            authorId: req.params.id
        }
    });
    Promise.all([userPromise, pagePromise])
    .then(data => {
        res.render('userpage', {user: data[0], pages: data[1]});

    })
    .catch(next);
})


