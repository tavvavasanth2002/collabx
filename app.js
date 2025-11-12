// Core dependencies
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
var cors = require('cors');

// Load environment variables
dotenv.config();

// Initialize Express app
var app = express();


// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// CORS configuration
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true
}));

// Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// Start server
var port = 4300;
app.listen(port, () => {
  console.log(` Server running at http://localhost:${port}`);
});
// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/collabx")
  .then(() => console.log("Database connected..."))
  .catch((e) => console.log("Database connection error:", e));

// Export app
module.exports = app;
