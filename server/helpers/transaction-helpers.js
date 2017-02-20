import Transactions from '../model/transactions';
import { getNextCard } from './inventory-helpers';

var createTransaction = function(btcAddress, uuid, quantity, callback){
  return new Promise(function(resolve,reject) {
    getNextCard(quantity, (cardsArray) => {
      var cards = cardsArray.map((card) => {
        return card._id;
      })
      var purchaseTime = new Date().toUTCString()
      var transX = {
        user_uuid: uuid,
        card_uuid: cards,
        time: purchaseTime,
        btc_address: btcAddress,
        fulfilled: false,
        pending: true
      }
      var newTransX = new Transactions(transX);
      newTransX.save((err, post) => {
        if(err){
          console.log("Error in creating transaction")
        }
        callback(post);
        console.log('tx created');
      })
    })
  })
}

var checkUnused = function(address){
  return new Promise(function(resolve,reject) {
    request(`https://blockchain.info/unspent?active=${address}`, function (error, response, body) {
        if (!error && response.statusCode == 500 && body.includes('No free outputs to spend')) {
          resolve(address);
        } else {
          reject('Possible Error: ' + error);
        }
    });
  });
};

var getTransactionsByUser = function(uuid, callback){
  Transactions.find({
    user_uuid: uuid,
    $or: [{fulfilled: true}, {pending: true}]
  }, (transactions) => {
    console.log('tx list is: ', transactions);
    callback(transactions);
  })
  // transaction must be in fulfilled state or less than 20 minutes old
  // return Array of TX objects - { expire_date, img: { frontData: <base64>, rearData: <base64> } }
};

export { createTransaction, getTransactionsByUser };