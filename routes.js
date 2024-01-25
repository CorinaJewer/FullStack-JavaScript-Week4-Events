const fs = require('fs');
const myEmitter = require('./logEvents');

function indexPage(path, response) {
  fetchFile(path, response)
  myEmitter.emit('route', path);
}

function aboutPage(path, response) {
  fetchFile(path, response)
  myEmitter.emit('route', path);
}

function homePage(path, response) {
  fetchFile(path, response)
  myEmitter.emit('route', path);
}

function contactPage(path, response){
  fetchFile(path, response)
  myEmitter.emit('route', path);
}

function createFolder(request, response) {
  const folderName = 'newFolder';
  fs.mkdir(folderName, (error) => {
    if(error) {
      if(DEBUG) console.error(error); 
      myEmitter.emit('event', request.url, 'ERROR', 'A new folder was NOT created');
      response.writeHead(500, { 'Content-Type': 'text/plain' });
      response.end('500 Internal Server Error');
    } else {
      myEmitter.emit('event', request.url, 'SUCCESS', 'A new folder was created');
      response.writeHead(200, { 'Content-Type': 'text/plain' });
      response.end('New folder created');
    }
  });
}

function fetchFile(fileName, response) {
  fs.readFile(fileName, (error, content) => {
    if(error) {
      response.writeHead(500, { 'Content-Type': 'text/plain' });
      response.end('500 Internal Server Error');
    } else {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(content, 'utf-8');
    }
  });
};

module.exports = {
  aboutPage,
  indexPage,
  homePage,
  contactPage,
  createFolder,
}