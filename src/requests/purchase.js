var axios = require('axios');

const url = '/buy';

module.exports = function (quantity, userId, callback) {
  axios.get(url + '/' + quantity + '/' + userId)
    .then(function(response) {
      // console.log(response);
      callback(response);
    })
    .catch(function(error) {
      console.error(error);
    });
};