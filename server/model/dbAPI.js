import mongoose from 'mongoose';
mongoose.Promise = require( 'bluebird' );

import uri from '../private/uri';

mongoose.connect(uri.uri);

// Connection Events
// when successfully connected
mongoose.connection.on('connected', function(){
  console.log('Mongoose db connection established with uri:' + uri + ' !');
})

// if there is a connection error
mongoose.connection.on('error', function(err){
  console.error('Error with mongoose db connection: ' + err + ":-(");
})

// on disconnect
mongoose.connection.on('disconnected', function(){
  console.log('Mongoose db has been disconnected.');
})

// if node process ends, close the connection to mongoose
process.on('SIGINT', function(){
  mongoose.connection.close(function(){
    console.log('Mongoose connection has closed by design.');
    process.exit(0);
  })
})

// SCHEMAS WILL FOLLOW

require('./transactions');
require('./inventory');
require('./count');

