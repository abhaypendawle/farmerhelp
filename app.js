var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require("express-session");
var MongoStore = require("connect-mongo/es5")(session);
var MongoDB = require("./javascripts/commons/mongodbhandler");
var routes = require('./routes/index');
var farmersRoute = require("./routes/farmers");
var trucksRoute = require("./routes/trucks");
var customersRoute = require("./routes/customers");
var AdminRoute = require("./routes/admin");
var Auth = require("./routes/authentication");
var TripsRoute = require("./routes/trips");
var productsRoute = require("./routes/products");
var billsRoute = require("./routes/bills");
var passport = require('passport');
require("./javascripts/commons/passport")(passport);
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
	secret: '$@n-j05e-5+@+e-un!ver5!+y',
	resave: true,
	saveUninitialized: true,
	duration: 30 * 60 * 1000,
	activeDuration: 5 * 60 * 1000,
	store: new MongoStore({
		url: MongoDB.MONGODB_URL
	})
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
//app.use(passport.session());

app.use('/', routes);
app.use('/farmers', farmersRoute);
app.use('/trucks', trucksRoute);
app.use('/customers', customersRoute);
app.use('/products',productsRoute);
app.use('/admin',AdminRoute);
app.use("/auth", Auth);
app.use("/trips", TripsRoute);
app.use('/bills',billsRoute);

passport.serializeUser(function(user, done) {
	done(null, user._id);
});

passport.deserializeUser(function(id, done) {
	db.users.findById(id, function(err, user){
		if(!err) done(null, user);
		else done(err, null);
	});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

MongoDB.connect(MongoDB.MONGODB_URL, function(){
	console.log('Connected to MongoDB at: ' + MongoDB.MONGODB_URL);
});

module.exports = app;