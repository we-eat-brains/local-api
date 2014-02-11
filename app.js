
/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes')
    , user = require('./routes/user')
    , ok = require('./routes/ok')
    , fake = require('./routes/fake')
    , fakeJson = require('./routes/fakeJson')
    , http = require('http')
    , path = require('path');

var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || 3005);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser({strict: false}));
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

app.get('/login', fake.login);
app.get('/', fake.login);
app.get('/client/:clientId/authorize', fakeJson.token);

app.all('/v1/system/*', fake.findAnswer);
app.all('/v1/admin/*', fakeJson.admin);

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});
