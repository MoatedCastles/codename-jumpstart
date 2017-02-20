var mongoose = require('mongoose');

var countSchema = new mongoose.Schema({
  count: Number
});

module.exports = mongoose.model('Count', countSchema);

