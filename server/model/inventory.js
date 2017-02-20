var mongoose = require('mongoose');

var inventorySchema = new mongoose.Schema({
  front: String, 
  back: String, 
  purchased: Boolean, 
  user_uuid: String
});

module.exports = mongoose.model('Inventory', inventorySchema);