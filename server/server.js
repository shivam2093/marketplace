const http = require('http');

const app = require('./app');



// where my project should run
const port = process.env.PORT || 3000;

// my server, pass listener request and response
const server = http.createServer(app);

//now we have created server
server.listen(port);
