var axios = require('axios');

const url = 'http://localhost:3003/inventory';

module.exports = function (callback) {
  axios.post(url)
    .then(function(response) {
      console.log(response);
      // callback(response);
    })
    .catch(function(error) {
      console.error(error);
    });
};
