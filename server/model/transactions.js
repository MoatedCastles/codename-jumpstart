var mongoose = require('mongoose');

var transactionSchema = new mongoose.Schema({
  uuid: String, 
  user_uuid: String,
  card_uuid: Array,
  time: String,
  btc_address: String,
  fulfilled: Boolean,
  pending: Boolean
});

module.exports = mongoose.model('Transactions', transactionSchema);