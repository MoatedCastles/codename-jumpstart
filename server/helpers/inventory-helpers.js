import Inventory from '../model/inventory';

var addCard = function(cardDataObj){
  var base64ImgData = {
    front: cardDataObj.image.front,
    back: cardDataObj.image.back
  };;
  var expiration_data = new Date(cardDataObj.expiration_date);
  // return new promise db call 
};

module.exports.getNextCard = function(quantity, callback){
  Inventory.find({pending: false}).sort({"expiration":1}).limit(quantity).exec((err,cards) => {
    callback(cards);
  });
};

module.exports.setAsPending = function(cards, userId, callback){
  Inventory.update({_id: {"$in": cards}}, {pending: true}, {multi: true}, (response) => {
    callback(response);
  })
}

module.exports.resetPending = function(cards, callback){
  Inventory.update({_id: {"$in": cards}}, {pending: false}, {multi: true}, (response) => {
    callback(response);
  })
}

module.exports.setAsPurchased = function(cards, callback){

  // not tested, hopefully working
  Inventory.update({_id: {"$in": cards}}, {purchased: true}, {multi: true}, (response) => {
    callback(response);
  })
}

module.exports.getInventoryCount = function(callback){
  Inventory.find({pending: false}).exec((err, response) => {
    callback(response);
  })
}

module.exports.resetInventory = function(callback){
  Inventory.update({pending:true}, {pending:false}, {multi:true}, (response) => {
    callback(response)
  })
}
