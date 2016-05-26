const request = require('request');

module.exports = {
  fetchFeed: function(req, res) {
    request('https://api.flickr.com/services/feeds/photos_public.gne?format=json', function(err, response, body) {
      if (err) {
        console.error(err)
      } else {
        res.status(200).send(body);
      }
    });
  }
}