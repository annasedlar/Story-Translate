// Angular routes are consider cross-origin. Cross-origin is only supported for:
// http, https, ftp. Our protocol when we load a page is "file:///"
// This requires something with http, https, ftp, etc. at the beginning for the router to function.
// Node js is our answer! With the connect module and teh serveStatic module, we can serve pages up at http://localhost
// This involves:
// 1. npm init -- this will create a package.json file in your folder. Package.json will make sure the node modules install locallay.
// 1b. No prompts are required. YOu can just hit enter, otherwise it will fill the fields out.
// 2. npm install connect - this will add the connect module to a node_modules folder. If node_modules doesn't exist, it will be created.
// 3. npm install serve-static - this will add the serve-static module to a node_modules folder. If node_modules doesn't exist, it will be created.
// 4. node server.js - this will tell node you want to run the JS file server.js
// THIS FILE!!

// Node will then serve up anything it finds like usual via http, at http://localhost:8000
// Solving our problem!

var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(8000, function(){
	console.log('Listening on Port 8000...');
});

