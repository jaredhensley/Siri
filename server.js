var http = require('http');

var server = http.createServer();

var messages = ["Why you no has waffle?", "Mile Hile Club Pass Applied", "Overly Friendly Neighbor Here To Help!"];

var handleRequest = function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method === 'GET') {

    res.statusCode = 200;

    var index = getRandomArbitrary(messages.length);
    var message = messages[index];
    var objectToSend = {
      message: message
    }

    res.end(JSON.stringify(objectToSend));

  } else if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
  }

}

function getRandomArbitrary(n) {
  return Math.floor((Math.random() * n));
}





server
  .on('request', handleRequest)
  .listen(8887);