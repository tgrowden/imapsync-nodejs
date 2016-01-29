var express = require('express');
var app = express();
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var spawn = require("child_process").spawn;
var imapsync = require("./config/config").bin;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res) {
  res.render('index', {
    title: 'Imapsync Nodejs'
  });
});
/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
io.on('connection', function(socket) {
  socket.on('message', function(Email) {
    var options = [];
    options.push("--user1", Email.from.user, "--user2", Email.to.user);
    options.push("--password1", Email.from.password, "--password2", Email.to.password);
    options.push("--host1", Email.from.host, "--host2", Email.to.host);
    if (Email.from.usessl !== false) {
      options.push("--ssl1");
    }
    if (Email.to.usessl !== false) {
      options.push("--ssl2");
    }
    if (Email.other.dryrun !== false) {
      options.push("--dry");
    }
    if (Email.other.args !== false) {
      for (var i = 0; i < Email.other.args.length; i++) {
        options.push(Email.other.args[i]);
      }
    }
    options.push("--debug");
    var utils = {
      run: function(command, argv, onmessage, finished, options) {
        var ps = command.split(" ").slice(0, 1)[0];
        argv = command.split(" ").slice(1).concat(argv ? argv : []);
        var script = spawn(ps, argv, options);
        script.stderr.on("data", function(error) {
          onmessage(error.toString('utf8'));
        });
        script.stdout.on("data", function(out) {
          onmessage(null, out.toString('utf8'));
        });
        script.on('close', function(code) {
          finished(null, code);
        });
        return script;
      }
    };
    var handleMessage = function(error, data) {
      console.log(error ? "Error" : "Data", error || data);
    };
    var finishProcess = function(data) {
      console.log("Process finished", data);
    };
    // this will inherit the parent process' current working directory and environment variables
    utils.run(imapsync, options, handleMessage, finishProcess, {
      cwd: process.cwd(),
      env: process.env
    });
    io.emit('log', Email);
    console.log("Email received: " + JSON.stringify(Email));
  });
});
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
http.listen(3000, function() {
  console.log('listening on *:3000');
});
