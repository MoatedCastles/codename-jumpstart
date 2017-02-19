//import http from 'http';
import request from 'request';
import bitcoin from 'bitcoinjs-lib';
import bip32utils from 'bip32-utils';
import dbAPI from 'dbAPI';

const PUBLIC_SEED = '03b748b86da220a7737e93f0e025cbd7fb23f0bf815afbd366b33d9311e18316ef';

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

var getBTCPrice = function(){
	return new Promise((resolve,reject) => {
		request(`https://blockchain.info/ticker`, function (error, response, body) {
  			if (!error && response.statusCode == 200 ) {
    			var priceData = JSON.parse(body).USD.sell;
    			resolve(String(priceData));
  			} else {
  				console.error('error getting btc price');
  				reject('Error getting BTC price');
  			}
		});
	});
};

// [Generates address, checks for no unspent outputs, return promise!]
var getNewAddress = function(){
	// need to get real transaction count from db
	var index = dbAPI.getTransactionCount();
	var hdNode = bitcoin.HDNode.fromSeedHex(PUBLIC_SEED);
	var chain = new bip32utils.Chain(hdNode,index);
	var address = chain.get();
	return checkUnused(address); // this returns a promise
};

var createBitcoinURI = function(address,amount){
	return `bitcoin:${address}?amount=${parseInt(amount)}&label=lounge&message=United_Club_pass_purchase`;
};


export { getNewAddress , getBTCPrice, createBitcoinURI };