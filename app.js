var express = require('express')
var Ifttt = require('ifttt');
var bodyParser = require('body-parser')
var app = express()

app.use( bodyParser.json() )
 
app.get('/', function (req, res) {
  res.send('Hello World')
})

// Create new IFTTT channel.
var iftttChannel = new Ifttt({ channelKey: process.env.KEY });

// Add triggers & actions to your IFTTT channel.
iftttChannel.registerTrigger( new (require('./trigger/test'))() );
iftttChannel.registerAction(  new (require('./action/create'))() );

iftttChannel.handlers.status = function(request, callback) {
  //fetch('https://yoururl.com/api').then(function (response) {
  //  if (response.ok) {
      callback(null, true);
  //  }
  //})
};
iftttChannel.handlers.user_info = function(request, callback) {
  //fetch('https://yoururl.com/api')
  //.then(function (response) {
  //   if (response.ok) {
  //     return response.json()
  //   }
  // })
  // .then(function(data) {
  //     callback(data.error, {id: data.user.id, name: data.user.name, url: data.user.url});
         callback(data.error, {id: 234234, name:"John Doe",  url:"http://foobar.com/johndoe" })
  // });
};

// Add IFTTT channel routes to your express app.
iftttChannel.addExpressRoutes(app);
 
app.listen(4012)
