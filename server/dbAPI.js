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
}

export { getTransactionCount };