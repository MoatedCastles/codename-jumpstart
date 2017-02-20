//import http from 'http';
import request from 'request';
import bitcoin from 'bitcoinjs-lib';
import bip32utils from 'bip32-utils';

//import dbAPI from 'dbAPI';

const PUBLIC_SEED = '03b748b86da220a7737e93f0e025cbd7fb23f0bf815afbd366b33d9311e18316ef';
const bitsPerBTC = 1000000;
const NO_UNSPENT_OUTPUTS = 'No free outputs to spend';
const BLOCK_CYPHER_TOKEN = '58cc413dd1ee48c3862b205b99a51d50';
const MIN_CONFIDENCE = .93;

const sum = (x,y) => parseFloat(x)+parseFloat(y);

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

var totalUnspentAtAddress = function(address){
	//arr.map(x => x.value / 100000000).reduce( (x,y) => x+y)
	return new Promise ( (resolve,reject) => {
		request(`https://blockchain.info/unspent?active=${address}`, function(error,response,body) {
			console.log(body);
			if(!error && response.statusCode === 200 && body !== NO_UNSPENT_OUTPUTS){
				var data = JSON.parse(body).unspent_outputs;
				var totalBTC = data.filter(output => parseInt(output.confirmations) > 0)
									.map(output => ( (parseInt(output.value)/100) / bitsPerBTC) )
									.reduce(sum);
				resolve(totalBTC);
			} else if ( body === NO_UNSPENT_OUTPUTS) {
				resolve(0);
			} else {
				reject(error);
			}
		});
	});
};

var convertDollarsToBTC = function(dollars){
	return new Promise( (resolve,reject) => {
		request(`https://blockchain.info/tobtc?currency=USD&value=${dollars}`, function (error, response, body) {
			if (!error && response.statusCode == 200 ) {
    			var priceData = parseFloat(body);
    			resolve(parseFloat(priceData));
  			} else {
  				console.error('error getting btc price');
  				reject('Error getting BTC price');
  			}
  		});
	});
};

var getBTCUSD = function(){
	return new Promise((resolve,reject) => {
		request(`https://blockchain.info/ticker`, function (error, response, body) {
  			if (!error && response.statusCode == 200 ) {
    			var priceData = JSON.parse(body).USD.sell;
    			//console.log(body);
    			resolve(parseFloat(priceData));
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
	var index = 1;//dbAPI.getTransactionCount();
	var hdNode = bitcoin.HDNode.fromSeedHex(PUBLIC_SEED);
	var chain = new bip32utils.Chain(hdNode,index);
	var address = chain.get();
	return checkUnused(address); // this returns a promise
};

var createBitcoinURI = function(address,amount){
	return `bitcoin:${address}?amount=${parseInt(amount)}&label=lounge&message=United_Club_pass_purchase`;
};

var allowZeroConfTransaction = function(hash){
	const endpoint = `api.blockcypher.com/v1/btc/main/txs/${hash}/confidence?token=BLOCK_CYPHER_TOKEN`;
	return new Promise( (resolve,reject) => {
		request(endpoint, function(error,response,body) {
			if(!error && response.statusCode === 200){
				let confidence = parseFloat(JSON.parse(body).confidence);
				return confidence > MIN_CONFIDENCE;
			} else {
				return false;
			}
		});
	});
};


export { getNewAddress , getBTCUSD, createBitcoinURI, totalUnspentAtAddress, allowZeroConfTransaction };