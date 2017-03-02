var mongoose = require('mongoose');

var inventorySchema = new mongoose.Schema({
  front: String,
  back: String,
  expiration: Date,
  purchased: Boolean,
  pending: Boolean,
  user_uuid: String
});

module.exports = mongoose.model('Inventory', inventorySchema);