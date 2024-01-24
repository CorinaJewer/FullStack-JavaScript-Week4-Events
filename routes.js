const fs = require('fs');

function indexPage(path, response) {
  fetchFile(path, response)
}

function aboutPage(path, response) {
  fetchFile(path, response)
}

function homePage(path, response) {
  fetchFile(path, response)
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
}