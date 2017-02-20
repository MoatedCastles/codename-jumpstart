import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import http from 'http';
import request from 'request';
import { getNewAddress , getBTCUSD, createBitcoinURI, totalUnspentAtAddress } from './BlockchainAPI';
import uuidv4 from 'uuidv4';

const BlockchainAPI = {
	getNewAddress,
	getBTCUSD,
	createBitcoinURI,
	totalUnspentAtAddress
};

const USD_CARD_PRICE = '25';

const consoleLogError = error => console.log(error);

let app = express();

app.use(cookieParser());
app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', (req,res) => {
	res.end('Current UUID: '+ JSON.stringify(req.cookies.uuid));
}); 

app.get('/uuid', (req,res) => {
	
	var uuid = req.cookies.uuid || uuidv4();
	console.log(req.cookies)
	if(!req.cookies.uuid)
		res.cookie('uuid', uuid);
	res.end(uuid);
});

app.get('/payment_confirmed/:address', (req,res) => {
	BlockchainAPI.totalUnspentAtAddress(req.params.address).then(amt => {
		if(amt > 0){
			BlockchainAPI.getBTCUSD().then(spotPrice => {
				res.send(`Total Unspent BTC: ${amt} ($${amt*spotPrice})`);
			});
		} else {
			res.send('Outta dough, bro. <small>or too many freakin\' outputs');
		}	
	}).catch(consoleLogError)	
});

app.get('/random', (req,res) => {
	BlockchainAPI.getNewAddress().then(address=>{
		res.end(address);
	}).catch(error=> {
		res.end(String(error));
	});
});

app.get('/price', (req,res) => {
	BlockchainAPI.getBTCUSD().then(price=>{
		res.end(String(price));
	}).catch(consoleLogError);
});

app.get('/buy/:quantity', (req,res) => {
	BlockchainAPI.getBTCUSD().then(price => {
		BlockchainAPI.getNewAddress().then(address => {
			let amtBTC = USD_CARD_PRICE * req.params.quantity / price;
			let URI = BlockchainAPI.createBitcoinURI(address,amtBTC);
			// Make new pending TX with soonest expiring stock
			// setTimeout (remove uuid from db to free up stock if not purchased)
			// Send  { btcURI, price, address} as response
			//res.end(`<a href="${URI}">Click me</a>`);
			res.end(JSON.stringify({URI,price,amtBTC}));

		}).catch(consoleLogError)
	}).catch(consoleLogError);
});

app.post('/addCard', (req,res) => {
	// { image: { frontData, rearData }, expiration_date}
	dbAPI.addCard(req.body.card).then(success=>{
		res.end('Card data added to database.')
	}).catch(consoleLogError);
});

app.use(express.static('build'));

app.listen(3000, () => {
	console.log('Listening on port 3000...');
});