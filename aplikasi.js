var express  = require('express');
var app      = express();
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();
var authServer = 'http://localhost:10000',
    backEndServer = 'http://localhost:10000'
 
app.all("/oauth/*", function(req, res) {
    console.log('redirecting to authServer');
    apiProxy.web(req, res, {target: authServer});
});

app.all("/api/*", function(req, res) {
    console.log('redirecting to backEndServer');
    apiProxy.web(req, res, {target: backEndServer});
});

app.use(express.static(__dirname + '/dist'));

console.log("Aplikasi sudah dijalankan...");

app.listen(process.env.PORT || 3000);