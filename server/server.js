import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import http from 'http';
import request from 'request';
import { getNewAddress , getBTCUSD, createBitcoinURI, totalUnspentAtAddress } from './BlockchainAPI';
import uuidv4 from 'uuidv4';

// importing DB models
import dbAPI from './model/dbAPI';
import Count from './model/count';
import Inventory from './model/inventory';
import Transactions from './model/transactions';

// importing helper functions
import { getCount, incrementCount } from './helpers/count-helpers';
import { addCard, getNextCard } from './helpers/inventory-helpers';

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

/*
app.get('/', (req,res) => {
	res.end('Current UUID: '+ JSON.stringify(req.cookies.uuid));
}); 
*/
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
	}).catch(consoleLogError);
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

app.post('/inventory', (req, res) => {
  console.log("inventory req.body: ", req.body);
  var date = new Date(2017, 6, 5).toUTCString();
  var NewCard = new Inventory({
    front: 'data:image/png;base64,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',
    back: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAAD6CAYAAACI7Fo9AAAcoklEQVR42u2d3atVVRfG+we67aqrLrroogshCCKIQEQkJKSIUArDCKkwITXQ/AitTMOPkjLFNLM0S/xI0zKz1LKyMj3mSS0rLTXNyj60r/3yrJd1WI4z5lxjzjX3OXvt/fxgUu/b2WuvvdZ85hxzzDHHuKRBCGl7LuEjIIRCJ4RQ6IQQCp0QQqETQih0QgiFTgih0AkhFDohFDohhEInhFDohBAKnRBCoRNCKHRCCIVOCKHQCaHQCSEUOiGEQieEUOiEEAqdEEKhE0IodEIIhU4IhU4IodAJIRQ6IYRCJ4RQ6IQQCp0QQqETQih0QgiFTgiFTgih0AkhFDohhEInhFDohBAKnRBCoRNCKHRCKHRCCIVOCKHQCSEUOiGk/kL/6aefGjt37mw899xzjYkTJzbGjBmTtQkTJjSeeeaZxrvvvts4ffp01LUvXLjQOHHiROPMmTM9Df/7559/DrrOr7/+mn3u5MmTpfeS/03M97juG9eMpXgtXAf/TMHvv//e69nKhu/7+++/ve++7BplDZ//7bffgq+f//9nz57NPv/PP/9EPwt8tvjez507V/md49///PNP02e7u7sbq1atasyePbsxbdq0rM2cObPx1FNPNV599dXGBx980Pjhhx8a//33X98LHV8+bNiwxiWXXGJqt9xyS+P9998P+o4VK1ao17r88ssz8Vq56667ej572WWXZR1I48svv7zoe66//vqoDrRx48Ze94wBLxS82NGjR190nSuvvNIrPivLly83vbcPP/xQ/Tw68RVXXGF+/742a9asJNe/6aabGgsXLsxEEcIXX3zR6zr//vuv+fO41+uuu67X/WzatMn5mfPnz2f9G/3R+vsuvfTSxvjx47OJ1TqIRAsdAisKJ7TdeeedzhFc8sorrzivAwvCyn333Rcl9FtvvTXohefgMzfccMNF10Kn/eOPP4Kugxcqf/fHH3+cZEb3Pdti++ijj5yd++qrr04idMxcqa//2GOPmQfEKu8d3zF06NBe3//SSy85P7N79+4ggbsmu19++aU5Qj916lTjqquu8t7AgAEDsub7G3R6mDZVOiMe1I8//thUoYeO7L5ZwtWhXWAwlB394YcfTrZ2s87ofSH0J598sinXh2AtYo9977C47rnnnqBJ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',
    expiration: date,
    purchased: false,
    user_uuid: '1234'
  });
  NewCard.save((err, post) => {
    if(err){
      console.log("Error in post to inventory")
      res.status(500).send({error: err.message})
    }
    res.status(201).send(post);
  })
})

// // posts the original counter in the db.. only needed once
// app.post('/count', (req, res) => {
// 	var NewCount = new Count({count: 0});
// 	NewCount.save((err, post) => {
//     if(err){
//       console.log("Error in post to inventory")
//       res.status(500).send({error: err.message})
//     }
//     res.status(201).send(post);
//   })
// })

app.get('/count', (req, res) => {
	incrementCount((count) => {
		console.log('incremented: ', count);
		res.end();
	})
	// getCount((count) => {
	// 	console.log('count is: ', count[0].count);
	// })
})

app.get('/getnext', (req, res) => {
	getNextCard((card) => {
		console.log('next card is: ', card);
		res.end();
	})
})

app.use(express.static('build'));

app.listen(3000, () => {
	console.log('Listening on port 3000...');
});