import mongoose from 'mongoose';

//mongoose.connect('mongodb://localhost/test');

// db models
// 
var txSchema = mongoose.Schema({
    uuid: String, 
    user_uuid: String, 
    card_uuid: String, 
    time: String, 
    fulfilled: Boolean, 
    pending: Boolean
});

var cardSchema = mongoose.Schema({ 
	uuid: String, 
	front: String, 
	back: String, 
	purchased: Boolean, 
	user_uuid: String
});

var countSchema = mongoose.Schema({
	count: Number
});
var transactionCount = mongoose.model('Count', { count: Number});

var getTransactionCount = function(){
	var count = 0; // change this part
	return count;
}

var getTransactionsByUUID = function(uuid){
	// transaction must be in fulfilled state or less than 20 minutes old
	// return Array of TX objects - { expire_date, img: { frontData: <base64>, rearData: <base64> } }
};

var addCard = function(cardDataObj){
	var base64ImgData = {
		front: cardDataObj.image.front,
		back: cardDataObj.image.back
	};;
	var expiration_data = new Date(cardDataObj.expiration_date);
	// return new promise db call 
};

var getNextCard = function(){
	// Find card with the expiration date that is soonest upcoming
	// return promise that resolves with uuid of card
};

export { getTransactionCount };