const http = require('http');
const routes = require('./routes.js');
const myEmitter = require('./logEvents.js');


global.DEBUG = true;


const server = http.createServer((request, response) => {
    if (request.url === '/favicon.ico') {
        // Ignore favicon.ico requests. Responding with a 204 status code (No Content) and ending the response.
        response.writeHead(204, {'Content-Type': 'image/x-icon'});
        response.end();
        return;   
      }

    if(DEBUG)console.log('Request Url:', request.url);
    let path = './views/';

    switch (request.url){
        case '/':
            path += 'index.html';
            //myEmitter.emit('route', path);  //Moved to routes.js
            routes.aboutPage(path, response);
            break;

        case '/home':
            response.statusCode = 301; //permanently moved - redirect page
            response.setHeader('Location', '/');
            response.end();
            break;

        case '/cookie':
            response.setHeader('Set-Cookie', 'fullName = Fred Flintstone');
            response.end('Cookie Set');
            break;

            //set a cookie named fullName with the value Fred Flintstone when the path /cookie is accessed. The specific use case for this cookie depends on the requirements of the web application. It could be used for user identification, customization, or any other functionality that involves storing information on the client side.

        case '/about':
            path += 'about.html';
            //myEmitter.emit('route', path);
            routes.aboutPage(path, response);
            break;

        case '/contact':
            path += 'contact.html';
            //myEmitter.emit('route', path);
            routes.aboutPage(path,response);
            break;

        /*case '/event':
            myEmitter.emit('event', request.url, 'INFO', 'An event route was requested');
            response.writeHead(200, { 'Content-Type': 'text/plain' });
            response.end('An event route was requested');
            break;*/

        default:
            let message = `404 Not Found: ${request.url}`;
            if(DEBUG) console.log('404 not found')
            myEmitter.emit('error', message);
            response.writeHead(404, {'Content-Type':'text/plain'});
            response.end('404 not found.')
            break;
    }  
      
});

server.listen(3000, () => {
  console.log('Server is running...');
});