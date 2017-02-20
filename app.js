var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ubnt');
var devices = mongoose.model('devices', {ip_address: String, username: String, password: String});
var throughput = mongoose.model('throughput', {ip_address_client: String, ip_address_server: String, throughput: String});
var index = require('./routes/index');
var add_device = require('./routes/add_device');

devices.find({ip_address: "127.0.0.1"}, function(err, data) {
    if (!data.length) {
        devices.create({ip_address: "127.0.0.1"});
    }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/get_devices', index);
app.use('/get_results', index);
app.use('/add_device', add_device);
app.use('/start_test', index);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(5000);
console.log("server listening on port :", 5000);
module.exports = app;
