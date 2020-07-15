var nforce = require('nforce');
var express = require('express');
var port = process.env.PORT || 3000;


var org = nforce.createConnection({
  clientId: process.env.CONSUMER_KEY,
  clientSecret: process.env.CONSUMER_SECRET,
  redirectUri: process.env.CALLBACK_URL,
  apiVersion: 'v48.0',  // optional, defaults to current salesforce API version
  environment: 'sandbox',  // optional, salesforce 'sandbox' for a scratch org or 'production', production default
  mode: 'multi' // optional, 'single' or 'multi' user mode, multi default
});

var app = express();

// Require Routes js
var routesHome = require('./routes/home');

// Serve static files
app.use(express.static(__dirname + '/public'));

app.use('/home', routesHome);

app.set('view engine', 'ejs');

app.get('/', function(req,res){
  console.log('auth uri: ' + org.getAuthUri());
  res.redirect(org.getAuthUri());
});

app.get('/oauth/_callback', function(req, res) {
  org.authenticate({code: req.query.code}, function(err, resp){
    if(!err) {
      console.log('Access Token: ' + resp.access_token);
      app.locals.oauthtoken = resp.access_token;
      app.locals.lightningEndPointURI = process.env.LIGHTNING_URL;
      var myVar = app.locals.lightningEndPointURI + '/lightning/lightning.out.js';
      console.log('Access Token #2: ' + app.locals.oauthtoken);
      console.log('LightningEndpoint URI: ' +  app.locals.lightningEndPointURI);
      res.redirect('/home');
    } else {
      console.log('URI attempted: ' + process.env.LIGHTNING_URL);
      console.log('Error: ' + err.message);
    }
  });
});

// Served Localhost
console.log('Served: http://localhost:' + port);
app.listen(port);
