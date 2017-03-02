import Inventory from '../model/inventory';

var addCard = function(cardDataObj){
  var base64ImgData = {
    front: cardDataObj.image.front,
    back: cardDataObj.image.back
  };;
  var expiration_data = new Date(cardDataObj.expiration_date);
  // return new promise db call 
};

var getNextCard = function(quantity, callback){
  Inventory.find({pending: false}).sort({"expiration":1}).limit(quantity).exec((err,cards) => {
    console.log('cards are: ', cards);
    callback(cards);
  });
  // Find card with the expiration date that is soonest upcoming
  // return promise that resolves with uuid of card
};

var setAsPending = function(cards, userId, callback){
  Inventory.update({_id: {"$in": cards}}, {pending: true}, {multi: true}, (response) => {
    callback(response);
    console.log('inventory updated: ', response);
  })
}

var getInventoryCount = function(callback){
  Inventory.find({pending: false}).exec((err, response) => {
    console.log('inv count response: ', response);
    callback(response);
  })
}

export { addCard, getNextCard, setAsPending, getInventoryCount };