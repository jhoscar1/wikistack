const express = require('express');
const nunjucks = require('nunjucks');
var bodyParser = require('body-parser');
const morgan = require('morgan');
var router = require('./routes');
const path = require('path');
const app = express();

nunjucks.configure('./views', { noCache: true });
app.engine('html', nunjucks.render);
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, '/public')));

app.listen(3000, function() {
    console.log('listening');
});

app.use('/', router);
