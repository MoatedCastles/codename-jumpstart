var axios = require('axios');

const url = '/inventory';

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
