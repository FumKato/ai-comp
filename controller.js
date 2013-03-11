var models = require('./models');
var exec = require('child_process').exec;
var cmd = "date";

exports.bind = function(app) {
  app.get('/', function(req, res) {
    exec(cmd,
    function(error, stdout, stderr) {
       res.send('stdout:' + stdout);
      if(error !== null) {
       res.send('exec error: '+error);
      }
    });
  });

  app.get('/test', function(req, res) {
    res.send('Hello Wanderful2 !!!!');
  });

  app.get('/test2', function(req, res) {
    res.render('index.ejs', {locals:{ problem: "abc" }});
  });

  app.get('/submit', function(req, res) {
    res.render('submit.ejs', {locals:{ }});
  });

  app.post('/submit', function(req, res) {
    var submit = new models.Submit({
      name: req.body.name,
      code: req.body.code,
      date: new Date()
    });

    submit.save(function(err) {
      if (err) { console.log('failed to save Submit'); }
      res.redirect('/');
    });
  });

  app.get('/submits', function(req, res) {
    models.Submit.find({}, function(err, docs) {
      if (err) { console.log('failed to find Submit.'); }
      res.render('submits.ejs', {locals:{ submits: docs }});
    });
  });
};
