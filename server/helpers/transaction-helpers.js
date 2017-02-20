import Transactions from '../model/transactions';

var createTransaction = function(uuid, callback){
  
}

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