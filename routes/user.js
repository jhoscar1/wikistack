const express = require('express');
const router = express.Router();
const User = require('../models').User;

module.exports = router;

router.get('/', function(req, res, next) {
  User.findAll({}).then(function(users){
    res.render('users', { users: users });
  }).catch(next);
});


router.get('/:id', function(req, res, next) {
    User.findOne({
        where: {
           id : req.params.id
        }
    })
    .then(data => res.render('authors', {page: data}))
    .catch(next);
})


