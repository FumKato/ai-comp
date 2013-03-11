var mongoose = require('mongoose');

var uri = process.env.MONGOLAB_URI || 'mongodb://localhost/ai-comp';

console.log("DB Connecting: " + uri);
var db = mongoose.createConnection(uri);
console.log("DB Connected: " + uri);

var Schema = mongoose.Schema;

var SubmitSchema = new Schema({
  name: String,
  code: String,
  date: Date
});

var schemas = [
  SubmitSchema
];

// Set up a logger for mongoose
schemas.forEach(function(schema) {
  schema.pre ('save', function(next) {
    console.log('before save');
    next();
  });
});

// Initialize model accessors
exports.Submit = db.model('Submit', SubmitSchema);
