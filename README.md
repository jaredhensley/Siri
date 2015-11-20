Siri
======

A mini project to practice basic Node.JS fundamentals and server-side programming.

##Objectives
Use Node.JS to build a simple socket server that responds to commands with text.

##Step 1: Check out the Web Client
Navigate to http://devmountain.github.io/Siri-client/. This is a really simple Angular app that needs its back end completed. So far you can send messages, but there are no replies coming back. We're going to build the reply part.

##Step 2: Create server.js
Create a server.js file in your repo. Now next steps:
* Require the 'http' module (Remember, you require a module and capture it in a variable.)
* Create a server that listens on port 8887 ([remember](https://gist.github.com/cahlan/4a80fd0752a9f38052af)?).

##Step 3: the GET call
The Siri-client is looking for a connection on port 8887 and will try to send a GET request to get a message.
* Create an array of messages that Siri might say, for example:

```javascript
var messages = ["Hello there.", "I'm sorry, I cannot take any requests at this time.", "I can tell you how to do that."];
```

* When a GET request comes in, have your server reply back with a random message from that array. Send it back in an object, like so:

```javascript
{message: 'hello'}
```

Remember, you examine the request object in your server callback function and check to see which method was used. Then you can send a response.

And don't forget, to make sure this is valid JSON, let's use the built-in `JSON.stringify` method to convert our object to JSON:

```javascript
res.end(JSON.stringify({message: myMessage});
```

To test yourself, use Postman to create a GET request to your server. Make sure it returns the object containing the message.

##Step 4: Cleaning Up
If your Postman request is working, great! You'll notice that the Siri client isn't yet working. This is because browsers are very careful about data they get from other domains. It's an easy place for an attack. So we need to add in an extra call that the browser is making so it will allow data to come from our server.

* If the request's method is OPTIONS (this is the call the browser makes to check if the site we're getting data from allows cross-origin requests), return the following header/response:

```javascript
res.statusCode = 200;

res.setHeader('Content-Type', 'application/json');

// Allow any website to access this API
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

// Don’t allow scripts or iframes execution from domains we don't trust
res.setHeader('X-XSS-Protection', '1; mode=block');
res.setHeader('X-Frame-Options', 'SAMEORIGIN');
res.setHeader('Content-Security-Policy', "default-src 'self' devmountain.github.io");

res.end();
```

Now your server will work properly with the Siri client.