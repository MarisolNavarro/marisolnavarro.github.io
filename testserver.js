
//import the library
const http = require("http");
let port = 8686;

// create the server

http.createServer(function(req,res){

    res.writeHead(200, {'Content-Type': 'text/plain'});
  
    res.write("stonks ");
    
    res.end('to the moon');

}).listen(port);


