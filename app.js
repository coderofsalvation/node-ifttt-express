var express = require('express')
var Ifttt = require('ifttt');
var bodyParser = require('body-parser')
var app = express()

app.use( bodyParser.json() )
 
app.get('/', function (req, res) {
  res.send('Hello World')
})

var t = require('./trigger/test')
var c = require('./action/create')

// Create new IFTTT channel.
var iftttChannel = new Ifttt({ channelKey: process.env.KEY });
console.log("key: "+process.env.KEY)

// Add triggers & actions to your IFTTT channel.
iftttChannel.registerTrigger( new t() );
iftttChannel.registerAction( new c() );

// Add IFTTT channel routes to your express app.
iftttChannel.addExpressRoutes(app);
 
app.listen(4012)
