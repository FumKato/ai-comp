var express = require('express');
var controller = require('./controller');

var app = express.createServer(express.logger());

app.use(express.bodyParser());
app.use(express.methodOverride());

controller.bind(app);

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
