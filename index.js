var express      = require('express');
var app          = express();
var mongoose     = require('mongoose');
var passport     = require('passport');
var flash        = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var config       = require('./config');


var abogadoController     = require('./controllers/abogadoController');
var botCaseController     = require('./controllers/botCaseController');
var botUserController     = require('./controllers/botUserController');
var caseController        = require('./controllers/caseController');
var commentController     = require('./controllers/commentController')
var descriptionController = require('./controllers/descriptionController');
var legalAppController    = require('./controllers/legalAppController')
// var setupController    = require('./controllers/setupController');
var userController        = require('./controllers/userController');

var port = process.env.PORT || 3000;

mongoose.connect(config.getDbConnectionString());

require('./config/passport')(passport); // pass passport for configuration

app.use(bodyParser()); // get information from html forms
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)

app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.use(session({
  secret: 'eraseunavezyyasondos',
  resave: false,
  saveUninitialized: false
})); // session secret

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

require('./routes.js')(app, passport);

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
console.log('The magic happens on port ' + port);