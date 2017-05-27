var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config');

var abogadoController = require('./controllers/abogadoController');
var botCaseController = require('./controllers/botCaseController');
var botUserController = require('./controllers/botUserController');
var caseController = require('./controllers/caseController');
var commentController = require('./controllers/commentController')
var descriptionController = require('./controllers/descriptionController');
var legalAppController = require('./controllers/legalAppController')
// var setupController = require('./controllers/setupController');
var userController = require('./controllers/userController');

var port = process.env.PORT || 3000;

app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

mongoose.connect(config.getDbConnectionString());
// setupController(app);
abogadoController(app)
botCaseController(app)
botUserController(app)
caseController(app)
commentController(app)
descriptionController(app)
legalAppController(app)
userController(app)


app.listen(port);