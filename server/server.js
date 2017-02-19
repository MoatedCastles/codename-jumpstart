import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import http from 'http';
import request from 'request';
//import { getNewAddress , getBTCPrice, createBitcoinURI } from './server/BlockchainAPI';
import uuidv4 from 'uuidv4';


const consoleLogError = error => console.log(error);

let app = express();

app.use(cookieParser());
app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', (req,res) => {
	res.end('Current UUID: '+ JSON.stringify(req.cookies.uuid));
});

app.get('/uuid', (req,res) => {
	var uuid = uuidv4();
	res.cookie('uuid', uuid);
	res.end(uuid);
});

app.get('/random', (req,res) => {
	BlockchainAPI.getNewAddress().then(address=>{
		res.end(address);
	}).catch(error=> {
		res.end(String(error));
	});
});

app.get('/buy/:amount', (req,res) => {
	BlockchainAPI.getBTCPrice().then(price => {
		BlockchainAPI.getNewAddress().then(address => {
			var URI = BlockchainAPI.createBitcoinURI(address,amount);
			// Make new pending TX with soonest expiring stock
			// setTimeout (remove uuid from db to free up stock if not purchased)
			// Send  { btcURI, price, address, token } as response

		}).catch(consoleLogError)
	}).catch(consoleLogError);
});

app.post('/addCard', (req,res) => {
	// { image: { frontData, rearData }, expiration_date}
	dbAPI.addCard(req.body.card).then(success=>{
		res.end('Card data added to database.')
	}).catch(consoleLogError);
});

app.use(express.static('client'));

app.listen(3000, () => {
	console.log('Listening on port 3000...');
});